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
import { PricingTypeEnum } from "../types/enums";
import {
    AvailablePeopleCount,
    Gender,
    GuestGender,
    PricingType,
    RoomCapacity,
    RoomGender,
    RoomTypeCapacity,
    UpdateRoomTypeParams
} from "../types/graph";
import { ResReturnType } from "../types/types";
import { removeUndefined } from "../utils/objFuncs";
import { GuestModel, GuestSchema } from "./Guest";
import { HouseModel } from "./House";
import { RoomModel, RoomSchema } from "./Room";
import { RoomPriceModel } from "./RoomPrice";
import { SeasonPriceModel } from "./SeasonPrice";

export enum RoomGenderEnum {
    FEMALE = "FEMALE",
    MALE = "MALE",
    ANY = "ANY",
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
        default: RoomGenderEnum.ANY
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
        {
            withSave,
            name,
            roomGender
        }: { withSave: boolean; name: string; roomGender: RoomGender }
    ): Promise<InstanceType<RoomSchema>> {
        const room = new RoomModel({
            name,
            roomGender,
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
        params: UpdateRoomTypeParams
    ): Promise<ResReturnType> {
        // TODO: 방 업데이트 로직 ㄱㄱ updateRoomType 로직도 같이 바꿔주기
        const guestCount = await GuestModel.countDocuments({
            roomType: new Types.ObjectId(this._id)
        });
        const updateData = removeUndefined(params);
        if (guestCount !== 0) {
            params.peopleCount = null;
            params.peopleCountMax = null;
            return {
                ok: false,
                error:
                    "해당 방타입에 배정된 게스트가 존재합니다. 모두 제거한 후 업데이트 해주세요."
            };
        } else if (
            guestCount === 0 &&
            (params.peopleCount !== null || params.peopleCountMax !== null)
        ) {
            await RoomModel.updateMany(
                {
                    roomType: new Types.ObjectId(this._id)
                },
                {
                    updateData
                }
            );
        }
        await this.update(updateData);
        return {
            ok: true,
            error: null
        };
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

    /**
     * 선택한 성별의 배정 가능 인원 알아내는 함수.
     * 게스트 페이지의 방 선택 섹션에서 사용
     * @param start 시작 날짜
     * @param end 끝 날짜
     * @param gender 인원 출력할 성별
     * @param otherGenderCount 다른 성별 인원 보정값. => 음... 설명하기 힘드네
     */
    @instanceMethod
    async getCapacity(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        includeSettled?: boolean,
        exceptBookerIds?: Types.ObjectId[]
        // 임의로 다른 성별로 인원을 채움. this.roomGender === "SEPARATELY" 인 경우만 사용
    ): Promise<RoomTypeCapacity> {
        const roomInstances = await RoomModel.find({
            _id: {
                $in: this.rooms
            }
        });
        const roomCapacityList = (await Promise.all(
            roomInstances.map(async roomInstance => {
                return roomInstance.getCapacity(
                    {
                        start,
                        end
                    },
                    includeSettled,
                    exceptBookerIds
                );
            })
        )).sort((c1, c2) => {
            const c1Gender = convertGenderArrToGuestGender(c1.availableGenders);
            const c2Gender = convertGenderArrToGuestGender(c2.availableGenders);
            return c1Gender === c2Gender ? 1 : 0;
        });
        const availablePeopleCount = getEmptyCount(
            roomCapacityList,
            this.pricingType
        );
        return {
            availablePeopleCount,
            pricingType: this.pricingType,
            roomCapacityList,
            roomTypeId: this._id
        };
    }

    @instanceMethod
    async getGuests(
        this: InstanceType<RoomTypeSchema>,
        start: Date,
        end: Date,
        isUnsettled?: boolean
    ): Promise<Array<InstanceType<GuestSchema>>> {
        try {
            const query = {
                roomType: new Types.ObjectId(this._id),
                start: {
                    $lte: new Date(end)
                },
                end: {
                    $gte: new Date(start)
                },
                isUnsettled
            };
            if (isUnsettled === undefined) {
                delete query.isUnsettled;
            }
            return await GuestModel.find(query);
        } catch (error) {
            return [];
        }
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

export const convertGenderArrToGuestGender = (
    genders: Gender[]
): GuestGender => {
    if (genders.length === 1) {
        return genders[0];
    } else {
        return "ANY";
    }
};

export const extractFunc = (
    roomCapacityList: RoomCapacity[],
    gstGender: GuestGender
) => {
    return roomCapacityList
        .filter(capacity => {
            return (
                convertGenderArrToGuestGender(capacity.availableGenders) ===
                gstGender
            );
        })
        .sort((a, b) => a.availableCount - b.availableCount);
};

/**
 * 성별 인원 보정...emptyBeds 어떻게 할까?
 * 이거 굳이 배열을 gender 별로 분류해서 각각 대입해야 했을까?
 * 그냥 forEach 안에서 if문으로 Gender 구분해서 적용하면 되는거 아니었을까?
 * @param roomTypeCapacity
 * @param gender
 * @param paddingCount 채울 인원 수
 * @param roomGender 방 성별
 */
export const addPadding = (
    roomTypeCapacity: RoomTypeCapacity,
    gender: Gender,
    paddingCount: number,
    roomGender: RoomGender
): RoomTypeCapacity => {
    if (paddingCount <= 0) {
        return roomTypeCapacity;
    }
    // 1. roomCapacity 얻음.
    const curGenderRoomCapacity = extractGenderRoomCapacity(
        roomTypeCapacity,
        gender
    );
    const otherGenderRoomCapacity = extractGenderRoomCapacity(
        roomTypeCapacity,
        gender === "FEMALE" ? "MALE" : "FEMALE"
    );
    // 현재 성별로 가져온 Capacity
    curGenderRoomCapacity.map(capacity => {
        const avaialbleCount = capacity.availableCount;
        const diff = paddingCount - avaialbleCount;
        if (diff >= 0) {
            capacity.availableCount = 0;
            paddingCount = diff;
        } else {
            capacity.availableCount = -diff;
            paddingCount = 0;
        }
        capacity.emptyBeds = capacity.emptyBeds.slice(
            0,
            capacity.availableCount
        );
        return capacity;
    });

    if (roomGender === "MALE" || roomGender === "FEMALE") {
        return roomTypeCapacity;
    }

    // 2. roomGender === "SEPARATELY"인 경우
    //  => paddingCount가 남았을때 처리
    const anyGenderRoomCapacity = extractGenderRoomCapacity(
        roomTypeCapacity,
        "ANY"
    ).map(capacity => {
        // TODO: Something...........................
        const avaialbleCount = capacity.availableCount;
        if (paddingCount > 0 && capacity.availableCount > 0) {
            capacity.availableGenders = [gender];
        }
        const diff = paddingCount - avaialbleCount;
        if (diff >= 0) {
            capacity.availableCount = 0;
            paddingCount = diff;
        } else {
            capacity.availableCount = -diff;
            paddingCount = 0;
        }
        capacity.emptyBeds = capacity.emptyBeds.slice(
            0,
            capacity.availableCount
        );
        return capacity;
    });
    const temp = [
        ...curGenderRoomCapacity,
        ...otherGenderRoomCapacity,
        ...anyGenderRoomCapacity
    ];

    return {
        ...roomTypeCapacity,
        roomCapacityList: temp,
        availablePeopleCount: getEmptyCount(temp, roomTypeCapacity.pricingType)
    };
};

/**
 * roomTypeCapacity로 부터 gender에 해당하는 roomCapacity를 뽑아냄
 * availableCount로 오름차순 정렬하여 출력
 * @param roomTypeCapacity 방타입 Capacity
 * @param gender 뽑아낼 성별
 */
export const extractGenderRoomCapacity = (
    roomTypeCapacity: RoomTypeCapacity,
    gender: GuestGender
) =>
    roomTypeCapacity.roomCapacityList
        .filter(capacity => {
            return (
                convertGenderArrToGuestGender(capacity.availableGenders) ===
                gender
            );
        })
        .sort((c1, c2) => {
            return c1.availableCount - c2.availableCount;
        });

export const getEmptyCount = (
    roomCapacityList: RoomCapacity[],
    pricingType: PricingType
): AvailablePeopleCount => {
    const temp = roomCapacityList.map(capacity => {
        const count = capacity.availableCount;
        const availables: AvailablePeopleCount = {
            countAny: 0,
            countFemale: 0,
            countMale: 0
        };
        if (pricingType === "DOMITORY") {
            capacity.availableGenders.forEach(gender => {
                if (gender === "FEMALE") {
                    availables.countFemale += count;
                } else if (gender === "MALE") {
                    availables.countMale += count;
                }
            });
        } else if (pricingType === "ROOM") {
            availables.countAny = count;
        }
        return availables;
    });
    if (temp.length !== 0) {
        return temp.reduce((a, b) => {
            return {
                countAny: a.countAny + b.countAny,
                countFemale: a.countFemale + b.countFemale,
                countMale: a.countMale + b.countMale
            };
        });
    }
    return {
        countAny: 0,
        countFemale: 0,
        countMale: 0
    };
};
