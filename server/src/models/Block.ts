import { Types } from "mongoose";
import { prop, Typegoose } from "typegoose";
import { BookingStatusEnum, GuestTypeEnum } from "../types/enums";
import { BookingStatus, GuestType } from "../types/graph";

export class BlockSchema extends Typegoose {
    @prop({ required: true })
    house: Types.ObjectId;

    @prop({ required: true })
    allocatedRoom: Types.ObjectId;

    @prop({ default: 0 })
    bedIndex: number; // PricingType === "ROOM" 인 경우 0으로 함...

    @prop()
    start: Date;

    @prop()
    end: Date;

    @prop({
        enum: BookingStatusEnum,
        default: BookingStatusEnum.COMPLETE
    })
    bookingStatus: BookingStatus;

    @prop({ enum: GuestTypeEnum, default: GuestTypeEnum.BLOCK })
    guestType: GuestType;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const BlockModel = new BlockSchema().getModelForClass(BlockSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Guests"
    }
});
