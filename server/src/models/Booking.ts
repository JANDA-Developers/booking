import {Types} from "mongoose";
import {
  arrayProp,
  instanceMethod,
  InstanceType,
  post,
  prop,
  Typegoose
} from "typegoose";
import { BookingStatusEnum } from "../types/enums";
import { BookingStatus, Gender, PricingType } from "../types/graph";
import { hashCode } from "../utils/hashCode";
import { removeUndefined } from "../utils/objFuncs";
import { GuestModel, GuestSchema } from "./Guest";
import { PricingTypeEnum, RoomTypeModel } from "./RoomType";

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
      "" +
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

    @prop()
    name: string; // bookerName

    @prop({ required: true })
    roomType: Types.ObjectId;

    @prop({ enum: PricingTypeEnum })
    pricingType: PricingType;

    @arrayProp({ items: Types.ObjectId, default: [] })
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

    @instanceMethod
    createGuestInstances(
        this: InstanceType<BookingSchema>,
        {
            genderCount
        }: {
            pricingType?: PricingType;
            bookerName?: string;
            genderCount: {
                count: number;
                gender?: Gender; // PricingType === "ROOM" 인 경우에는 undefined임...
            };
        }
    ): Array<InstanceType<GuestSchema>> {
        let i = 0;
        const result: Array<InstanceType<GuestSchema>> = [];
        while (i < genderCount.count) {
            result.push(
                new GuestModel(
                    removeUndefined({
                        booker: new Types.ObjectId(this.booker),
                        house: new Types.ObjectId(this.house),
                        roomType: new Types.ObjectId(this.roomType),
                        booking: new Types.ObjectId(this._id),
                        name: this.name,
                        start: new Date(this.start),
                        end: new Date(this.end),
                        pricingType: this.pricingType,
                        gender: genderCount.gender
                    })
                )
            );
            i++;
        }
        return result;
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

  @instanceMethod
  async createGuestInstances(
    this: InstanceType<BookingSchema>,
    {
      pricingType,
      bookerName,
      genderCount
    }: {
      pricingType?: PricingType;
      bookerName?: string;
      genderCount: {
        count: number;
        gender?: Gender; // PricingType === "ROOM" 인 경우에는 undefined임...
      };
    }
  ): Promise<Array<InstanceType<GuestSchema>>> {
    let i = 0;
    let pt = pricingType;
    if (!pt) {
      const roomType = await RoomTypeModel.findById(this.roomType, {
        pricingType: true
      });
      if (!roomType) {
        throw new Error("치명적 에러... 존재하지 않는 RoomType");
      }
      pt = roomType.pricingType;
    }
    const booker = await BookerModel.findById(this.booker);
    const name = bookerName || (booker && booker.name);
    const result: Array<InstanceType<GuestSchema>> = [];
    while (i < genderCount.count) {
      result.push(
        new GuestModel(
          removeUndefined({
            booker: new Types.ObjectId(this.booker),
            house: new Types.ObjectId(this.house),
            roomType: new Types.ObjectId(this.roomType),
            booking: new Types.ObjectId(this._id),
            name,
            start: new Date(this.start),
            end: new Date(this.end),
            pricingType: pt,
            gender: genderCount.gender
          })
        )
      );
      i++;
    }
    return result;
  }

  /**
   * 해당 booking에 존재하는 guestList를 구함.
   */
  @instanceMethod
  async getGuests(
    this: InstanceType<BookingSchema>
  ): Promise<Array<InstanceType<GuestSchema>>> {
    return await GuestModel.find({
      roomType: new Types.ObjectId(this.roomType),
      booking: new Types.ObjectId(this._id)
    });
  }

  /**
   * 게스트들 배정하는 메서드
   */
  @instanceMethod
  async allocateGuestToRoom(this: InstanceType<BookingSchema>): Promise<void> {
    const roomTypeInstance = await RoomTypeModel.findById(this.roomType);
    if (!roomTypeInstance) {
      throw new Error("치명적 오류. RoomType이 존재하지 않음");
    }
    const guests = await this.getGuests();
    // roomTypeInstance
    console.log({
      guests
    });

    return;
  }
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
