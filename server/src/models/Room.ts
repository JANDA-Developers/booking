import { DocumentQuery, Types } from "mongoose";
import { instanceMethod, InstanceType, pre, prop, Typegoose } from "typegoose";
import { Gender, RoomGender } from "../types/graph";
import { GuestModel, GuestSchema } from "./Guest";
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
    findGuestQuery(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date
    ): DocumentQuery<
        Array<InstanceType<GuestSchema>>,
        InstanceType<GuestSchema>,
        {}
    > {
        // start, end로 해당 Room에 배정된 Guest들을 가져온다
        return GuestModel.find({
            allocatedRoom: new Types.ObjectId(this._id),
            start: {
                $lte: end
            },
            end: {
                $gte: start
            }
        });
    }

    @instanceMethod
    async isAllocatable(this: InstanceType<RoomSchema>) {
        // PricingType === "ROOM" 인 경우
        // 게스트들 먼저 다 구하기...
        return false;
    }

    @instanceMethod
    async getAllocateGuest(
        this: InstanceType<RoomSchema>,
        start: Date,
        end: Date
    ): Promise<{ female: number; male: number; total: number }> {
        // PricingType === "DOMITORY" 인 경우
        // 해당 기간 동안에 배정할 수 있는 인원을 구해준다.
        const roomType = await RoomTypeModel.findById(this.roomType);
        if (!roomType) {
            return {
                female: 0,
                male: 0,
                total: 0
            };
        }
        // 현재 상태를 알아야 함.
        // 현재 배정되어 있는 방을 보여준다.

        if (roomType.pricingType !== "DOMITORY") {
            return {
                female: 0,
                male: 0,
                total: 0
            };
        }

        const guests = await this.findGuestQuery(start, end).sort({
            booking: -1
        });

        const roomGender: RoomGender = roomType.roomGender;
        const peopleCount: number = roomType.peopleCount;
        // const peopleLimit: number = roomType.peopleCountMax;
        let maleCurrentCount = 0;
        let femaleCurrentCount = 0;
        let otherCurrentCount = 0;
        guests.forEach((guest: InstanceType<GuestSchema>) => {
            if (guest.gender === "FEMALE") {
                femaleCurrentCount++;
            }
            if (guest.gender === "MALE") {
                maleCurrentCount++;
            }
            if (!guest.gender) {
                otherCurrentCount++;
            }
        });
        const totalCurrentCount =
            maleCurrentCount + femaleCurrentCount + otherCurrentCount;
        console.log(totalCurrentCount);

        const result = {
            male: 0,
            female: 0,
            total: 0
        };
        // 1. roomGender === FEMALE or MALE 인 경우
        if (
            roomGender === "FEMALE" ||
            roomGender === "MALE" ||
            roomGender === "MIXED"
        ) {
            result.male = peopleCount - maleCurrentCount;
            result.female = peopleCount - femaleCurrentCount;
        } else if (roomGender === "SEPARATELY") {
            // TODO 남여 혼숙 x 인 경우...
            // 현재 배정되어있는 성별을 확인해 봐야함.
            // guest.Gender 확인 ㄱㄱ
            // 한 종류의 성별만 존재하는지 검사 ㄱㄱ
            if (guests.length === 0) {
                return {
                    male: peopleCount,
                    female: peopleCount,
                    total: peopleCount
                };
            }
            const gender: Gender = guests[0].gender;
            result.male = peopleCount;
            guests.forEach(guest => {
                // 현재 예약되어있는 게스트들 목록.
                if (guest.gender !== gender) {
                    throw new Error("혼숙");
                }
                result.total++;
                if (gender === "FEMALE") {
                    result.male = 0;
                }
                if (gender === "MALE") {
                    result.female = 0;
                }
            });
        }
        return result;
    }
}

export const RoomModel = new RoomSchema().getModelForClass(RoomSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Rooms"
    }
});
