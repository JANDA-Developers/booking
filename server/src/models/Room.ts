import * as _ from "lodash";
import { Types } from "mongoose";
import { instanceMethod, InstanceType, pre, prop, Typegoose } from "typegoose";
import {
    BookingStatusEnum,
    GuestTypeEnum,
    PricingTypeEnum
} from "../types/enums";
import {
    BookingStatus,
    Gender,
    PricingType,
    RoomCapacity,
    RoomGender
} from "../types/graph";
import { GuestModel, GuestSchema } from "./Guest";
import { RoomGenderEnum, RoomTypeModel, RoomTypeSchema } from "./RoomType";

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

    @prop({ enum: PricingTypeEnum, default: PricingTypeEnum.DOMITORY })
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

    @prop({ default: BookingStatusEnum.COMPLETE, enum: BookingStatusEnum })
    bookingStatus: BookingStatus;

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
    async getBlockedBeds(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date
    ): Promise<number[]> {
        const blocked = await GuestModel.find({
            allocatedRoom: new Types.ObjectId(this._id),
            guestType: GuestTypeEnum.BLOCK,
            start: {
                $lte: end
            },
            end: {
                $gte: start
            }
        });
        return blocked.map(guest => guest.bedIndex);
    }

    @instanceMethod
    async getCapacity(
        this: InstanceType<RoomSchema>,
        dateRange: { start: Date; end: Date },
        includeSettled?: boolean,
        exceptbookingIds?: Types.ObjectId[]
    ): Promise<RoomCapacity> {
        const allocatedGuests = (await this.getAllocatedGuests(
            dateRange,
            exceptbookingIds
        )).sort((g1, g2) => g1.bedIndex - g2.bedIndex);
        const countGuestInBed: number[] = Array(this.peopleCount).fill(0);
        allocatedGuests.forEach(g => {
            countGuestInBed[g.bedIndex]++;
        });
        const block = await this.getBlockedBeds(dateRange.start, dateRange.end);
        const availableGenders = this.allocatableGenderPrivate(allocatedGuests);
        const emptyBeds = this.getEmptyBeds(allocatedGuests);
        _.pullAll(emptyBeds, block);
        const availableCount = emptyBeds.length;
        // (this.pricingType === "DOMITORY" ? this.peopleCount : 1) -
        // emptyBeds.length;
        // countGuestInBed.filter(c => c !== 0).length -
        // block.length;
        return {
            availableCount,
            emptyBeds,
            roomId: this._id,
            roomGender: this.roomGender,
            availableGenders,
            peopleCount: this.peopleCount
        };
    }

    /**
     * 배정되어있는 게스트 구하기.
     * @param start
     * @param end
     * @param exceptbookingId 입력되면 해당 booking의 예약으로 들어있는 Guest는 제외하고 계산함.
     */
    @instanceMethod
    async getAllocatedGuests(
        this: InstanceType<RoomSchema>,
        dateRange: { start: Date; end: Date },
        exceptbookingIds: Types.ObjectId[] = []
    ): Promise<Array<InstanceType<GuestSchema>>> {
        // 1. 게스트 컬렉션에서 배정된 게스트 목록 가져오기
        const query: any = {
            allocatedRoom: new Types.ObjectId(this._id),
            start: {
                $lte: new Date(dateRange.end)
            },
            end: {
                $gt: new Date(dateRange.start)
            },
            bookingStatus: BookingStatusEnum.COMPLETE,
            guestType: GuestTypeEnum.GUEST
        };
        if (exceptbookingIds.length !== 0) {
            query.booking = {
                $nin: exceptbookingIds
            };
        }
        return await GuestModel.find(query);
    }

    @instanceMethod
    async getAllocatableGenders(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date,
        ignorebookings: Types.ObjectId[]
    ): Promise<Gender[]> {
        // TODO
        return this.allocatableGenderPrivate(
            await this.getAllocatedGuests({ start, end }, ignorebookings)
        );
    }

    /**
     * 배정 가능 여부 확인하기.
     * @param guests 게스트 목록
     * @param dateRange
     * @param validateRoomGuestCount
     * @param exceptbookings
     */
    @instanceMethod
    async isAbleToAllocate(
        this: InstanceType<RoomSchema>,
        guests: Array<{
            guestInstance: InstanceType<GuestSchema>;
            bedIndex: number;
        }>,
        dateRange: { start: Date; end: Date },
        validateRoomGuestCount: boolean = false,
        exceptbookings: Types.ObjectId[] = []
    ): Promise<boolean> {
        const allocatedGuests = await this.getAllocatedGuests(
            dateRange,
            exceptbookings
        );
        if (allocatedGuests.length === 0) {
            return true;
        }
        return guests
            .map(guestNBedIndex => {
                const { guestInstance, bedIndex } = guestNBedIndex;

                // Validation: 성별
                const validateGender =
                    (guestInstance.gender || false) &&
                    this.allocatableGenderPrivate(allocatedGuests).includes(
                        guestInstance.gender
                    );

                // Validation: emptyBed
                const validateBed = this.validateBedIndex(
                    allocatedGuests,
                    bedIndex
                );

                // 방 인원수 Validation
                const validateGuestCount =
                    validateRoomGuestCount ||
                    this.validateGuestCount(allocatedGuests);
                return validateGender && validateBed && validateGuestCount;
            })
            .reduce((p, n) => p && n);
    }

    /*
     * -------------------------------------------------------------------------------------------------------------------------------------
     * 이하 private 함수임..
     * -------------------------------------------------------------------------------------------------------------------------------------
     */

    @instanceMethod
    private validateGuestCount(
        this: InstanceType<RoomSchema>,
        allocatedGuests: Array<InstanceType<GuestSchema>>
    ): boolean {
        return this.peopleCount >= allocatedGuests.length;
    }

    @instanceMethod
    private validateBedIndex(
        this: InstanceType<RoomSchema>,
        allocatedGuests: Array<InstanceType<GuestSchema>>,
        bedIndex: number
    ) {
        return (
            allocatedGuests.filter(
                guest =>
                    guest.bedIndex === bedIndex &&
                    guest.allocatedRoom === new Types.ObjectId(this._id)
            ).length === 0
        );
    }

    @instanceMethod
    private allocatableGenderPrivate(
        this: InstanceType<RoomSchema>,
        allocatedGuests: Array<InstanceType<GuestSchema>>
    ): Gender[] {
        const result: Gender[] = ["FEMALE", "MALE"];
        if (this.roomGender !== "SEPARATELY") {
            if (this.roomGender !== "ANY") {
                return [this.roomGender];
            }
        } else {
            // 게스트에 따라서 배정가능 젠더 변경됨.
            if (allocatedGuests.length === 0) {
                return result;
            }
            const genders = _.uniq(allocatedGuests.map(guest => guest.gender));
            if (genders.includes("FEMALE") && genders.includes("MALE")) {
                return [];
            }
            return genders.map(
                (gender): Gender => {
                    if (gender === null) {
                        throw new Error("있을 수 없는 에러.");
                    }
                    return gender;
                }
            );
        }
        return result;
    }
    @instanceMethod
    private getEmptyBeds(
        this: InstanceType<RoomSchema>,
        allocatedGuests: Array<InstanceType<GuestSchema>>
    ): number[] {
        const beds = Array(
            this.pricingType === "DOMITORY" ? this.peopleCount : 1
        )
            .fill(0)
            .map((val, i) => i);
        const usingBed = _.uniq(allocatedGuests.map(guest => guest.bedIndex));
        _.pullAll(beds, usingBed);
        return beds;
    }
}

export const RoomModel = new RoomSchema().getModelForClass(RoomSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Rooms"
    }
});
