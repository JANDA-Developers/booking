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
import { GenderEnum } from "../types/enums";
import {
    GuestGender,
    PricingType,
    RoomCapacity,
    RoomCapacityWithEmptyBed,
    RoomGender
} from "../types/graph";
import { removeUndefined } from "../utils/objFuncs";
import { GuestModel, GuestSchema } from "./Guest";
import { HouseModel } from "./House";
import { RoomModel, RoomSchema } from "./Room";
import { RoomPriceModel } from "./RoomPrice";
import { SeasonPriceModel } from "./SeasonPrice";

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

    @instanceMethod
    async createRoomInstance(
        this: InstanceType<RoomTypeSchema>,
        { withSave, name }: { withSave: boolean; name: string }
    ): Promise<InstanceType<RoomSchema>> {
        const room = new RoomModel({
            name,
            roomType: new Types.ObjectId(this._id),
            pricingType: this.pricingType,
            peopleCount: this.peopleCount,
            peopleCountMax: this.peopleCountMax
        });
        if (withSave) {
            await this.update({
                $push: {
                    rooms: new Types.ObjectId(room._id)
                }
            });
            return await room.save();
        }
        return room;
    }

    @instanceMethod
    async removeThis(
        this: InstanceType<RoomTypeSchema>
    ): Promise<{ ok: boolean; error: string | null }> {
        // 1. 예약내역이 있는지 확인  o
        // 2. 예약내역 삭제 o
        // 3. 가격들 전부 삭제 o
        // 4. room 삭제
        const roomTypeObjId = new Types.ObjectId(this._id);
        const guests = await GuestModel.countDocuments({
            roomType: new Types.ObjectId(this._id)
        });
        if (guests) {
            return {
                ok: false,
                error: "해당 방에 예약이 존재합니다."
            };
        }
        const condition = {
            roomType: roomTypeObjId
        };
        await GuestModel.deleteMany(condition);
        // 설정된 가격 삭제
        await RoomPriceModel.deleteMany(condition);
        await SeasonPriceModel.deleteMany(condition);
        await RoomModel.deleteMany(condition);
        await this.remove();
        // 기존에 존재하던 인덱스값들 하나씩 -1 ㄱㄱ
        await RoomTypeModel.updateMany(
            {
                house: new Types.ObjectId(this.house),
                index: {
                    $gt: this.index
                }
            },
            {
                $inc: {
                    index: -1
                }
            }
        );
        await HouseModel.updateOne(
            {
                _id: new Types.ObjectId(this.house)
            },
            {
                $pull: {
                    roomTypes: roomTypeObjId
                }
            }
        );
        // 핵복잡할듯
        return {
            ok: true,
            error: null
        };
    }

    @instanceMethod
    async updateThis(
        this: InstanceType<RoomTypeSchema>,
        args: {
            peopleCount: number;
            peopleCountMax: number;
            defaultPrice: number;
            description: string;
        }
    ) {
        // TODO: 방 업데이트 로직 ㄱㄱ updateRoomType 로직도 같이 바꿔주기
    }

    @instanceMethod
    async createThis(
        this: InstanceType<RoomTypeSchema>,
        { withSave }: { withSave: boolean } = { withSave: false }
    ): Promise<InstanceType<RoomTypeSchema>> {
        // HouseModel 배열에 추가
        await HouseModel.updateOne(
            {
                _id: new Types.ObjectId(this.house)
            },
            {
                $push: {
                    roomTypes: new Types.ObjectId(this._id)
                }
            }
        );

        // 시즌 가격 추가.

        return this;
    }

    /*
     * --------------------------------------------------------------------------------------------------------------------------------------
     *                             이하 함수들은 pricingType === "DOMITORY" 인 방타입에 대한 메서드들임...
     * --------------------------------------------------------------------------------------------------------------------------------------
     */

    @instanceMethod
    async getAllocatableRooms(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        {
            includeTempAllocation,
            gender
        }: {
            includeTempAllocation?: boolean;
            gender?: GenderEnum;
        } = {}
    ): Promise<RoomCapacityWithEmptyBed[]> {
        const roomInstances = await RoomModel.find({
            _id: { $in: this.rooms.map(roomId => new Types.ObjectId(roomId)) }
        });
        const roomCapacities = (await Promise.all(
            roomInstances.map(async roomInstance => {
                return await roomInstance.getCapacity(
                    start,
                    end,
                    includeTempAllocation
                );
            })
        )).filter(capacity => {
            if (capacity.availableCount === 0) {
                return false;
            }
            if (!gender) {
                return true;
            }
            if (capacity.roomGender === "SEPARATELY") {
                return !capacity.guestGender || capacity.guestGender === gender;
            } else if (capacity.roomGender === gender) {
                return true;
            }
            return true;
        });
        return roomCapacities;
    }

    @instanceMethod
    async getRoomCapacitiesWithRoomIdForDomitory(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        includeTempAllocation?: boolean
    ): Promise<RoomCapacityWithEmptyBed[]> {
        return await Promise.all(
            (await RoomModel.find({
                roomType: new Types.ObjectId(this._id)
            })).map(async roomInstance => {
                const capacity = await roomInstance.getCapacity(
                    start,
                    end,
                    includeTempAllocation
                );
                return capacity;
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
        const roomCapacities: RoomCapacity[] = await this.getRoomCapacitiesWithRoomIdForDomitory(
            start,
            end
        );

        console.log({
            roomCapacities
        });

        // 1. Gender 검사
        if (this.roomGender === gender || this.roomGender === "MIXED") {
            roomCapacities.forEach((capacity: RoomCapacity) => {
                availableCount = availableCount + capacity.availableCount;
            });
            if (this.roomGender === "MIXED") {
                availableCount = availableCount - addOtherGenderCount;
            }
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
