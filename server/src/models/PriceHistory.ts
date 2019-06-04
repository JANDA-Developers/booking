import * as _ from "lodash";
import { Types } from "mongoose";
import {
    instanceMethod,
    InstanceType,
    prop,
    staticMethod,
    Typegoose
} from "typegoose";
import { BookingSchema } from "./bookingss";
import { GuestSchema } from "./Guest";

export class PriceHistorySchema extends Typegoose {
    @staticMethod
    static createPriceHistory(
        date: Date,
        guestInstance: InstanceType<GuestSchema>,
        bookingInstance: InstanceType<BookingSchema>,
        price: number,
        suggestedPrice: number
    ): InstanceType<PriceHistorySchema> {
        if (
            !bookingInstance.guests.includes(
                new Types.ObjectId(guestInstance._id)
            )
        ) {
            // TODO
        }
        return new PriceHistoryModel({
            start: bookingInstance.start,
            end: bookingInstance.end,
            date,
            guest: new Types.ObjectId(guestInstance._id),
            booking: new Types.ObjectId(bookingInstance._id),
            price,
            suggestedPrice
        });
    }

    @staticMethod
    static createPriceHistories(params: {
        start: Date;
        end: Date;
        bookingInstance: InstanceType<BookingSchema>;
        guestInstance: InstanceType<GuestSchema>;
        price: number;
        suggestedPrice: number;
    }): Array<InstanceType<PriceHistorySchema>> {
        // TODO
        return [];
    }

    @prop()
    date: Date;

    @prop()
    guest: Types.ObjectId;

    @prop()
    booking: Types.ObjectId;

    @prop()
    price: number;

    @prop()
    suggestedPrice: number;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    async deleteThis(this: InstanceType<PriceHistorySchema>) {
        await this.remove();
    }
}

export const PriceHistoryModel = new PriceHistorySchema().getModelForClass(
    PriceHistorySchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "PriceHistories"
        }
    }
);
