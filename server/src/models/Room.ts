import * as _ from "lodash";
import { Types } from "mongoose";
import { instanceMethod, InstanceType, pre, prop, Typegoose } from "typegoose";
import { RoomCapacity } from "../types/graph";
import { removeUndefined } from "../utils/objFuncs";
import { GuestModel } from "./Guest";
import { RoomTypeModel, RoomTypeSchema } from "./RoomType";

@pre<RoomSchema>("save", async function(next) {
    try {
        if (this.index <= 0 || !this.index) {
            const test = await RoomModel.findOne({
                roomType: new Types.ObjectId(this.roomType)
            }).sort({ index: -1 });
            if (test) {
                this.index = test.index + 1;
            }
        }
        this.roomType = new Types.ObjectId(this.roomType);
    } catch (error) {
        throw error;
    }
    next();
})
export class RoomSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true, ref: RoomTypeSchema })
    roomType: Types.ObjectId;

    @prop({ min: 0, default: 0 })
    index: number;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @prop()
    roomSrl?: number;

    @instanceMethod
    getQueryForGuests(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date,
        tempAllocation?: boolean
    ) {
        // start, end로 해당 Room에 배정된 Guest들을 가져온다
        const query: {
            allocatedRoom: any;
            start: any;
            end: any;
            isTempAllocation?: boolean;
        } = {
            allocatedRoom: new Types.ObjectId(this._id),
            start: {
                $lte: new Date(end)
            },
            end: {
                $gte: new Date(start)
            },
            isTempAllocation: tempAllocation
        };
        return removeUndefined(query);
    }

    @instanceMethod
    async isAllocatable(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date,
        tempAllocation?: boolean
    ) {
        // PricingType === "ROOM" 인 경우
        // 게스트들 먼저 다 구하기...
        const roomType = await RoomTypeModel.findById(this.roomType);
        if (!roomType) {
            return false;
        }
        const pricingType = roomType.pricingType;
        if (pricingType !== "ROOM") {
            return false;
        }
        // start, end 까지 이 방에 배정된 게스트가 있는가?
        const guestCount = await GuestModel.countDocuments(
            this.getQueryForGuests(start, end, tempAllocation)
        );
        if (guestCount === 0) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param start 시작 날짜
     * @param end 끝 날짜
     * @param tempAllocation 임시배정 조회여부. undefined 이면 무시하고 전부 조회함.
     */
    @instanceMethod
    async getCapacity(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date,
        tempAllocation?: boolean
    ): Promise<RoomCapacity> {
        // 1. RoomType 체크 & peopleLimitCount 얻기
        const roomType = await RoomTypeModel.findById(this.roomType);
        if (!roomType) {
            throw new Error("존재하지 않는 RoomType");
        }
        const peopleCount = roomType.peopleCount;

        // 2. 현재 배정되어있는 guest 목록을 가져온다.
        const query = this.getQueryForGuests(start, end, tempAllocation);
        const guests = await GuestModel.find(query, { gender: 1 });
        const availableCount = peopleCount - guests.length;

        // 배정된 게스트가 없는 경우 allocatedGender = null 리턴.
        if (guests.length === 0) {
            return {
                roomGender: roomType.roomGender,
                guestGender: null,
                availableCount,
                roomId: this._id
            };
        }
        const allocated: number = guests
            .map(
                (guest): number => {
                    const val = guest.gender === "MALE" ? 2 : 3;
                    return val;
                }
            )
            .reduce((previousVal, currentVal) => {
                return previousVal * currentVal;
            });
        const guestGender =
            allocated % 6 === 0
                ? "MIXED"
                : allocated % 3 === 0
                ? "FEMALE"
                : "MALE";
        return {
            roomGender: roomType.roomGender,
            guestGender,
            availableCount,
            roomId: this._id
        };
    }
}

export const RoomModel = new RoomSchema().getModelForClass(RoomSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Rooms"
    }
});
