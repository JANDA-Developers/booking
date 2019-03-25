import { prop, Ref, Typegoose } from "typegoose";
import { Gender, GuestType } from "../types/graph";
import { BookerSchema } from "./Booker";
import { BookingSchema } from "./Booking";
import { RoomSchema } from "./Room";
import { RoomTypeSchema } from "./RoomType";

enum GuestTypeEnum {
    BLOCK_ROOM = "BLOCK_ROOM",
    DOMITORY = "DOMITORY",
    ROOM = "ROOM"
}

enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class GuestSchema extends Typegoose {
    @prop({ ref: BookerSchema, required: true })
    booker: Ref<BookerSchema>;

    @prop({ ref: BookingSchema, required: true })
    booking: Ref<BookingSchema>;

    @prop({ ref: RoomTypeSchema, required: true })
    roomType: Ref<RoomTypeSchema>;

    @prop({ ref: RoomSchema })
    room?: Ref<RoomSchema>;

    @prop()
    name: string;

    @prop({ required: true })
    start: Date;

    @prop({ required: true })
    end: Date;

    @prop({ enum: GuestTypeEnum, default: GuestTypeEnum.DOMITORY })
    guestType: GuestType;

    @prop({ enum: GenderEnum, default: GenderEnum.MALE })
    gender: Gender;

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
