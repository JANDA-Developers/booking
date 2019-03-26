import { arrayProp, prop, Ref, Typegoose } from "typegoose";
import { BookingStatus } from "../types/graph";
import { BookerSchema } from "./Booker";
import { GuestSchema } from "./Guest";
import { HouseSchema } from "./House";
import { RoomTypeSchema } from "./RoomType";

export enum BookingStatusEnum {
    WAIT_DEPOSIT = "WAIT_DEPOSIT",
    COMPLETE = "COMPLETE",
    CANCEL = "CANCEL",
    REFUND_WAIT = "REFUND_WAIT",
    PAY_WHEN_CHK_IN = "PAY_WHEN_CHK_IN"
}
/**
 * Booking 스키마...
 */
export class BookingSchema extends Typegoose {
    @prop({ ref: HouseSchema, required: true })
    house: Ref<HouseSchema>;

    @prop({ ref: BookerSchema, required: true })
    booker: Ref<BookerSchema>;

    @prop({ ref: RoomTypeSchema })
    roomType: Ref<RoomTypeSchema>;

    @arrayProp({ itemsRef: GuestSchema })
    guests: Array<Ref<GuestSchema>>;

    @prop()
    bookingId: string;

    @prop({ default: 0 })
    price: number;

    @prop({ required: true })
    start: Date;

    @prop({ required: true })
    end: Date;

    @prop({
        default(this: BookingSchema) {
            return this.price;
        }
    })
    discountedPrice: number;

    @prop({ enum: BookingStatusEnum, default: BookingStatusEnum.WAIT_DEPOSIT })
    bookingStatus: BookingStatus;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const BookingModel = new BookingSchema().getModelForClass(
    BookingSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "Bookings"
        }
    }
);
