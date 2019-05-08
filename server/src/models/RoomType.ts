import * as _ from "lodash";
import { Types } from "mongoose";
import {
    arrayProp,
    index,
    instanceMethod,
    InstanceType,
    pre,
    prop,
    Typegoose
} from "typegoose";
import {
    GuestGender,
    PricingType,
    RoomCapacity,
    RoomGender
} from "../types/graph";
import { removeUndefined } from "../utils/objFuncs";
import { GuestModel, GuestSchema } from "./Guest";
import { RoomModel } from "./Room";

export enum PricingTypeEnum {
    ROOM = "ROOM",
    DOMITORY = "DOMITORY"
}

export enum RoomGenderEnum {
    FEMALE = "FEMALE",
    MALE = "MALE",
    MIXED = "MIXED",
    SEPARATELY = "SEPARATELY"
}

@index({ house: 1 })
@index({ index: -1 })
@pre<RoomTypeSchema>("save", async function(next) {
    try {
        if (this.index <= 0 || !this.index) {
            const test = await RoomTypeModel.findOne({
                house: new Types.ObjectId(this.house)
            }).sort({ index: -1 });
            if (test) {
                this.index = test.index + 1;
            }
        }
        if (this.peopleCount > this.peopleCountMax) {
            this.peopleCountMax = this.peopleCount;
        }
        this.house = new Types.ObjectId(this.house);
    } catch (error) {
        throw error;
    }
    next();
})
export class RoomTypeSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    house: Types.ObjectId;

    @prop({
        required: true,
        default: PricingTypeEnum.ROOM,
        enum: PricingTypeEnum
    })
    pricingType: PricingType;

    @prop({
        required(this: InstanceType<RoomTypeSchema>) {
            return this.pricingType === "DOMITORY";
        },
        enum: RoomGenderEnum,
        default: RoomGenderEnum.MIXED
    })
    roomGender: RoomGender;

    @prop()
    img: string;

    @prop({
        required: [
            function(this: RoomTypeSchema) {
                return 0 < this.peopleCount;
            },
            "Too Few peopleCount..."
        ],
        default: 1
    })
    peopleCount: number;

    @prop({
        required: [
            function(this: RoomTypeSchema): boolean {
                return this.peopleCount <= this.peopleCountMax;
            },
            "PeopleCountMax is Always Higher than PeopleCount."
        ],
        default(this: RoomTypeSchema) {
            return this.peopleCount;
        }
    })
    peopleCountMax: number;

    @prop({
        min: 0,
        default: 0
    })
    index: number;

    @prop()
    description: string;

    @prop({ default: 0 })
    defaultPrice: number;

    @prop()
    tags: string;

    @arrayProp({ items: Types.ObjectId, default: [] })
    rooms: Types.ObjectId[];

    @prop()
    get roomCount(): number {
        return -1;
    }

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    // Legarcy 연동을 위한 엔티티...
    @prop()
    roomTemplateSrl?: number;

    /*
     * --------------------------------------------------------------------------------------------------------------------------------------
     *                             이하 함수들은 pricingType === "DOMITORY" 인 방타입에 대한 메서드들임...
     * --------------------------------------------------------------------------------------------------------------------------------------
     */

    @instanceMethod
    async getRoomCapacitiesWithRoomIdForDomitory(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        includeTempAllocation?: boolean
    ): Promise<RoomCapacity[]> {
        return Promise.all(
            (await RoomModel.find({
                roomType: new Types.ObjectId(this._id)
            })).map(async roomInstance => {
                return await roomInstance.getCapacity(
                    start,
                    end,
                    includeTempAllocation
                );
            })
        );
    }

    /**
     * 각각의 Room에 가용인원을 배열로 얻음.
     * @param start 시작
     * @param end 끝
     * @param includeTempAllocation
     */
    @instanceMethod
    async getRoomCapacitiesForDomitory(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        includeTempAllocation?: boolean
    ): Promise<RoomCapacity[]> {
        return Promise.all(
            (await RoomModel.find({
                roomType: new Types.ObjectId(this._id)
            })).map(async roomInstance => {
                return await roomInstance.getCapacity(
                    start,
                    end,
                    includeTempAllocation
                );
            })
        );
    }

    /**
     * 선택한 성별의 배정 가능 인원 알아내는 함수.
     * 게스트 페이지의 방 선택 섹션에서 사용
     * @param start 시작 날짜
     * @param end 끝 날짜
     * @param gender 인원 출력할 성별
     * @param otherGenderCount 다른 성별 인원 보정값. => 음... 설명하기 힘드네
     */
    @instanceMethod
    async getCapacityForDomitory(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        gender: GuestGender,
        // 임의로 다른 성별로 인원을 채움. this.roomGender === "SEPARATELY" 인 경우만 사용
        addOtherGenderCount: number = 0
    ): Promise<RoomCapacity> {
        let availableCount = 0;
        // roomCapacities 구하기
        const roomCapacities: RoomCapacity[] = await this.getRoomCapacitiesForDomitory(
            start,
            end
        );
        console.log({
            "getDomitoryCapacity.RoomCapacities": roomCapacities
        });

        // 1. Gender 검사
        if (this.roomGender === gender || this.roomGender === "MIXED") {
            roomCapacities.forEach((capacity: RoomCapacity) => {
                availableCount = availableCount + capacity.availableCount;
            });
        } else if (this.roomGender === "SEPARATELY") {
            const otherGenderRoomCapacities = roomCapacities.filter(
                capacity => capacity.guestGender !== gender
            );
            // 다른 성별로 채울 수 있는 인원 수
            let paddableGuestCount = 0;
            // 빈방 수
            let anyGenderRoomCount = 0;
            otherGenderRoomCapacities.forEach(capacity => {
                if (capacity.guestGender) {
                    paddableGuestCount += capacity.availableCount;
                } else {
                    anyGenderRoomCount++;
                }
            });
            const availableRoomCount =
                anyGenderRoomCount -
                Math.ceil(
                    (addOtherGenderCount - paddableGuestCount) /
                        this.peopleCount
                );
            availableCount =
                availableCount + availableRoomCount * this.peopleCount;
            // 방 성별이 배정된 게스트에 따라서 바뀜.
            roomCapacities.forEach((capacity: RoomCapacity) => {
                if (gender === capacity.guestGender) {
                    // 이 안에서 이제 무엇을 할까...?
                    availableCount = availableCount + capacity.availableCount;
                }
            });
        } else {
            // 배정 불가
            return {
                availableCount: 0,
                roomGender: this.roomGender,
                guestGender: gender,
                roomId: ""
            };
        }
        return {
            availableCount,
            roomGender: this.roomGender,
            guestGender: gender,
            roomId: ""
        };
    }

    @instanceMethod
    async getGuests(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        flag?: "ROOMLESS" | "ALLOCATED"
    ): Promise<Array<InstanceType<GuestSchema>>> {
        try {
            const isTempAllocation: boolean | undefined =
                flag && flag === "ROOMLESS";
            const query = {
                roomType: new Types.ObjectId(this._id),
                start: {
                    $lte: new Date(end)
                },
                end: {
                    $gte: new Date(start)
                },
                isTempAllocation
            };
            console.log({
                query,
                removeObject: removeUndefined(query)
            });
            if (isTempAllocation === undefined) {
                delete query.isTempAllocation;
            }
            return await GuestModel.find(query);
        } catch (error) {
            return [];
        }
    }

    @instanceMethod
    async autoAllocation(
        this: InstanceType<RoomTypeSchema>,
        guests: Types.ObjectId[]
    ) {
        // TODO: 2019-05-06 추후에 구현하는걸로..
    }
}

export const RoomTypeModel = new RoomTypeSchema().getModelForClass(
    RoomTypeSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "RoomTypes"
        }
    }
);
