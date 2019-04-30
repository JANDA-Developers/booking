import { Types } from "mongoose";
import { arrayProp, post, prop, Typegoose } from "typegoose";
import { BookingStatus } from "../types/graph";
import { hashCode } from "../utils/hashCode";

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
@post<BookingSchema>("save", async booking => {
    if (!booking.bookingId) {
        const bookingId =
            booking.createdAt
                .toISOString()
                .split("T")[0]
                .replace("-", "") +
            Math.abs(hashCode(booking._id))
                .toString(16)
                .toUpperCase();
        await booking.update({
            bookingId
        });
    }
})
export class BookingSchema extends Typegoose {
    @prop({ required: true })
    house: Types.ObjectId;

    @prop({ required: true })
    booker: Types.ObjectId;

    @prop({ required: true })
    roomType: Types.ObjectId;

    @arrayProp({ items: Types.ObjectId })
    guests: Types.ObjectId[];

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

    @prop({
        enum: BookingStatusEnum,
        default: BookingStatusEnum.WAIT_DEPOSIT
    })
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
