import { Types } from "mongoose";
import { prop, Ref, Typegoose } from "typegoose";
import { Gender, PricingType } from "../types/graph";
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
    gender: Gender;

    @prop({ default: true })
    isTempAllocated: boolean;

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
}

export const GuestModel = new GuestSchema().getModelForClass(GuestSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Guests"
    }
});
