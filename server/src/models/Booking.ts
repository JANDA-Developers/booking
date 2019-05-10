import {Types} from "mongoose";
import {arrayProp, InstanceType, post, prop, Typegoose} from "typegoose";
import {BookingStatusEnum} from "../types/enums";
import {BookingStatus} from "../types/graph";
import {hashCode} from "../utils/hashCode";

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
  @prop({required: true})
  house: Types.ObjectId;

  @prop({required: true})
  booker: Types.ObjectId;

  @prop({required: true})
  roomType: Types.ObjectId;

  @arrayProp({items: Types.ObjectId, default: []})
  guests: Types.ObjectId[];

  @prop()
  bookingId: string;

  @prop({default: 0})
  price: number;

  @prop({required: true})
  start: Date;

  @prop({required: true})
  end: Date;

  @prop({
    default(this: BookingSchema) {
      return this.price;
    }
  })
  discountedPrice: number;

  @prop({
    enum: BookingStatusEnum,
    default: BookingStatusEnum.COMPLETE
  })
  bookingStatus: BookingStatus;

  @prop({
    default(this: InstanceType<BookingSchema>) {
      return this.guests.length;
    }
  })
  guestCount: number;

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
