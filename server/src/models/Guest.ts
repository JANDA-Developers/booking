import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop, Ref, Typegoose } from "typegoose";
import { Gender, PricingType } from "../types/graph";
import { removeUndefined } from "../utils/objFuncs";
import { RoomSchema } from "./Room";
import { PricingTypeEnum } from "./RoomType";

enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class GuestSchema extends Typegoose {
    @prop({ required: true })
    house: Types.ObjectId;

    @prop({ required: true })
    booking: Types.ObjectId;

    @prop({ required: true })
    roomType: Types.ObjectId;

    @prop({ ref: RoomSchema })
    allocatedRoom?: Ref<RoomSchema>;

    @prop({ default: 0 })
    bedIndex: number; // PricingType === "ROOM" 인 경우 0으로 함...

    @prop()
    name: string;

    @prop({ enum: PricingTypeEnum, default: PricingTypeEnum.DOMITORY })
    pricingType: PricingType;

    @prop({
        enum: GenderEnum,
        default: GenderEnum.MALE,
        required(this: GuestSchema) {
            return this.pricingType === "DOMITORY";
        }
    })
    gender: Gender | null;

    @prop({ default: true })
    isTempAllocation: boolean;

    @prop()
    start: Date;

    @prop()
    end: Date;

    @prop({ required: true, default: false })
    blockRoom: boolean;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    async allocateRoom(
        this: InstanceType<GuestSchema>,
        roomId: Types.ObjectId
    ): Promise<boolean> {
        //  TODO
        return false;
    }
}

export const GuestModel = new GuestSchema().getModelForClass(GuestSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Guests"
    }
});

export const createGuestInstances = (
    bookerId: Types.ObjectId | string,
    houseId: Types.ObjectId | string,
    roomTypeId: Types.ObjectId | string,
    bookingId: Types.ObjectId | string,
    pricingType: PricingType,
    bookerName: string,
    start: Date,
    end: Date,
    count: number = 0,
    gender?: Gender // PricingType === "ROOM" 인 경우에는 undefined임...
): Array<InstanceType<GuestSchema>> => {
    let i = 0;
    const result: Array<InstanceType<GuestSchema>> = [];
    while (i < count) {
        result.push(
            new GuestModel(
                removeUndefined({
                    booker: new Types.ObjectId(bookerId),
                    house: new Types.ObjectId(houseId),
                    roomType: new Types.ObjectId(roomTypeId),
                    booking: new Types.ObjectId(bookingId),
                    name: bookerName,
                    start,
                    end,
                    pricingType,
                    gender
                })
            )
        );
        i++;
    }
    return result;
};
