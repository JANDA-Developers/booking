import * as _ from "lodash";
import { Types } from "mongoose";
import { instanceMethod, InstanceType, pre, prop, Typegoose } from "typegoose";
import {
    Gender,
    PricingType,
    RoomCapacityWithEmptyBed,
    RoomGender
} from "../types/graph";
import { asyncForEach } from "../utils/etc";
import { removeUndefined } from "../utils/objFuncs";
import { GuestModel, GuestSchema } from "./Guest";
import {
    PricingTypeEnum,
    RoomGenderEnum,
    RoomTypeModel,
    RoomTypeSchema
} from "./RoomType";

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

    @prop({ default: PricingTypeEnum.DOMITORY, enum: PricingTypeEnum })
    pricingType: PricingType;

    @prop({ enum: RoomGenderEnum })
    roomGender: RoomGender;

    @prop({ default: 0 })
    peopleCount: number;

    @prop({
        default(this: InstanceType<RoomSchema>) {
            return this.peopleCount;
        }
    })
    peopleCountMax: number;

    @prop({ min: 0, default: 0 })
    index: number;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @prop()
    roomSrl?: number;

    @instanceMethod
    async removeThis(
        this: InstanceType<RoomSchema>
    ): Promise<{ ok: boolean; error: string | null }> {
        // 예약이 존재한다면 못지우게 해야함...
        const roomObjId = new Types.ObjectId(this._id);
        const guestCountAfterToday = await GuestModel.countDocuments({
            allocatedRoom: roomObjId
        });
        if (guestCountAfterToday) {
            return {
                ok: false,
                error: "해당 방에 예약이 존재합니다."
            };
        }
        // roomType에서 id pull 해야함..
        const roomTypeObjId = new Types.ObjectId(this.roomType);
        await RoomTypeModel.update(
            {
                _id: roomTypeObjId
            },
            {
                $pull: {
                    rooms: roomObjId
                }
            }
        );
        await GuestModel.deleteMany({ allocatedRoom: roomObjId });
        return {
            ok: true,
            error: null
        };
    }

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
            isUnsettled?: boolean;
        } = {
            allocatedRoom: new Types.ObjectId(this._id),
            start: {
                $lte: new Date(end)
            },
            end: {
                $gte: new Date(start)
            },
            isUnsettled: tempAllocation
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
     * 이거 어떻게 할까
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
    ): Promise<RoomCapacityWithEmptyBed> {
        // 1. RoomType 체크 & peopleLimitCount 얻기
        const roomType = await RoomTypeModel.findById(this.roomType);
        if (!roomType) {
            throw new Error("존재하지 않는 RoomType");
        }
        const peopleCount = roomType.peopleCount;

        // 2. 현재 배정되어있는 guest 목록을 가져온다.
        const query = this.getQueryForGuests(start, end, tempAllocation);
        const guests = await GuestModel.find(query, {
            gender: true,
            bedIndex: true
        });
        const availableCount = peopleCount - guests.length;
        const emptyBeds: number[] = Array(roomType.peopleCount)
            .fill(0)
            .map((___, i) => i);

        // 배정된 게스트가 없는 경우 allocatedGender = null 리턴.
        if (guests.length === 0) {
            return {
                roomGender: roomType.roomGender,
                guestGender: null,
                availableCount,
                roomId: this._id,
                emptyBeds
            };
        }
        const allocated: number = guests
            .map(
                (guest): number => {
                    _.pull(emptyBeds, guest.bedIndex);
                    console.log({
                        index: guest.bedIndex
                    });

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
            roomId: this._id,
            emptyBeds // TODO
        };
    }

    @instanceMethod
    async getEmptyBeds(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date
    ): Promise<number[]> {
        // 1. 배정된 인덱스 게스트 목록을 구함.
        const guests = await GuestModel.find(
            {
                allocatedRoom: new Types.ObjectId(this._id),
                start: {
                    $lte: new Date(end)
                },
                end: {
                    $gte: new Date(start)
                }
            },
            {
                bedIndex: true
            }
        );
        const usingBed = guests.map(guest => guest.bedIndex);
        const emptyArr = Array(this.peopleCount)
            .fill(0)
            .map((___, i) => i);
        return emptyArr.filter(
            bedIndex => !usingBed.some(elem => elem === bedIndex)
        );
    }

    @instanceMethod
    async allocateGuests(
        this: InstanceType<RoomSchema>,
        guests: Array<InstanceType<GuestSchema>>
    ): Promise<Array<InstanceType<GuestSchema>>> {
        const allocatedGuests: Array<InstanceType<GuestSchema>> = [];

        await asyncForEach(guests, async guestInstance => {
            const allocatedGuest = await this.allocateGuest(guestInstance);
            console.log({
                // 이건 왜나옴?
                allocatedGuestsForEach: allocatedGuest
            });

            if (allocatedGuest) {
                allocatedGuests.push(allocatedGuest);
                // await allocatedGuest.save();
            }
        });
        // Bed Index 를 찾아서 넣어줘야 한다...
        // start~end 까지 비는 bedIndex를 찾아야함...
        return allocatedGuests;
    }

    @instanceMethod
    async getGender(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date,
        isUnsettled?: boolean
    ): Promise<Gender | null> {
        if (this.roomGender !== "SEPARATELY") {
            return this.roomGender === "MIXED" ? null : this.roomGender;
        }
        const guests = await GuestModel.find(
            removeUndefined({
                isUnsettled,
                allocatedRoom: new Types.ObjectId(this._id),
                start: {
                    $lte: end
                },
                end: {
                    $gte: start
                }
            }),
            {
                bedIndex: true,
                gender: true,
                isUnsettled: true
            }
        ).sort({ isUnsettled: -1 }); // isUnsettled === false 인 것을 앞쪽으로 정렬해야함...
        let gender: Gender | null = null;
        guests.forEach(guest => {
            gender = guest.gender;
        });
        return gender;
    }

    @instanceMethod
    async getAvailableGenderAndBed(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date
    ): Promise<{
        availableGenders: Gender[];
        availableCount: number;
        availableBeds: number[];
        roomGender: RoomGender;
        roomId: Types.ObjectId;
    }> {
        let availableGenders: Gender[] = [];
        let availableCount: number = this.peopleCount;
        if (this.roomGender === "MIXED" || this.pricingType === "ROOM") {
            availableGenders = ["FEMALE", "MALE"];
        } else if (this.roomGender !== "SEPARATELY") {
            availableGenders = [this.roomGender];
        }
        if (this.pricingType === "ROOM") {
            availableCount = 1;
        }
        // 이하 roomGender === "SEPARATELY"
        const guests = await GuestModel.find(
            {
                allocatedRoom: new Types.ObjectId(this._id),
                start: {
                    $lte: end
                },
                end: {
                    $gte: start
                }
            },
            {
                gender: true,
                bedIndex: true
            }
        );
        availableCount = availableCount - guests.length;
        if (this.roomGender === "SEPARATELY") {
            const isMale = guests.every(g => {
                return g.gender === "FEMALE";
            });
            const isFemale = guests.every(g => {
                return g.gender === "MALE";
            });
            if (isMale) {
                availableGenders.push("MALE");
            }
            if (isFemale) {
                availableGenders.push("FEMALE");
            }
        }
        const availableBeds = Array(
            this.pricingType === "DOMITORY" ? this.peopleCount : 1
        )
            .fill(0)
            .map((val, i) => i)
            .filter(bedIndex => {
                return !guests.some(guest => guest.bedIndex === bedIndex);
            });
        return {
            availableGenders,
            availableCount,
            availableBeds,
            roomGender: this.roomGender,
            roomId: new Types.ObjectId(this._id)
        };
    }

    @instanceMethod
    async allocateGuest(
        this: InstanceType<RoomSchema>,
        guestInstance: InstanceType<GuestSchema>,
        opt: {
            ignoreTempAllocation?: boolean;
            bedIndex?: number;
        } = {}
    ): Promise<InstanceType<GuestSchema> | null> {
        const start = new Date(guestInstance.start);
        const end = new Date(guestInstance.end);
        // 현재 배정되어있는 게스트들을 구함.
        const allocatedGuests = await GuestModel.find(
            removeUndefined({
                allocatedRoom: new Types.ObjectId(this._id),
                start: {
                    $lte: end
                },
                end: {
                    $gte: start
                },
                isUnsettled: opt.ignoreTempAllocation
            }),
            {
                allocatedRoom: true,
                bedIndex: true,
                isUnsettled: true,
                gender: true
            }
        );
        console.log({
            allocatedGuests
        });

        const usingBed = allocatedGuests.map(instance => {
            return instance.bedIndex;
        });
        const peopleCount = this.peopleCount;
        if (peopleCount <= usingBed.length) {
            // 배정 가능 인원 수 <= 사용하고있는 배드 수
            return null;
        }
        const gender = await this.getGender(start, end);
        if (gender !== guestInstance.gender && gender !== null) {
            return null;
        }

        if (opt.bedIndex !== undefined) {
            // 배드 인덱스를 지정해서 배정할때.
            const canIuseBed = !usingBed.some(
                bedIndex => bedIndex === opt.bedIndex
            );
            if (!canIuseBed) {
                return null;
            }
        }
        const availableBed = Array(peopleCount)
            .fill(0)
            .map((__, i) => i)
            .filter(bedIndex => !usingBed.includes(bedIndex));

        guestInstance.bedIndex = availableBed[opt.bedIndex || 0];
        guestInstance.allocatedRoom = this._id;
        return guestInstance;
    }
}

export const RoomModel = new RoomSchema().getModelForClass(RoomSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Rooms"
    }
});
