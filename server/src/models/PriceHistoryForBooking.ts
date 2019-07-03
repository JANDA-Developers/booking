import _ from "lodash";
import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop } from "typegoose";
import { PriceInfo } from "../types/graph";
import { BasePriceHistorySchema } from "./PriceHistory";

export enum PriceHistoryTypeEnum {
    BOOKING = "BOOKING"
}

type collectionsParams = {
    bookingId: string;
    guestId: string;
    roomType: Types.ObjectId;
    room: Types.ObjectId;
};

type PriceHistoryParams = {
    start: Date;
    end: Date;
    totalPrice: number;
};

export class PriceHistoryForBookingSchema extends BasePriceHistorySchema {
    @prop({ required: true })
    bookingId: string;

    @prop({ required: true })
    guestId: string;

    @prop({ required: true })
    roomType: Types.ObjectId;

    @prop({ required: true })
    room: Types.ObjectId;

    @prop({ default: [] })
    priceInfos: PriceInfo[];

    @instanceMethod
    async make(
        ref: collectionsParams,
        params: PriceHistoryParams
    ): Promise<InstanceType<PriceHistoryForBookingSchema>> {
        // TODO: params를 PriceInfo[] 에 맞게 변형시켜야함.
        // start~end => 날짜 차이 ㄱㄱ
        const { start, end, totalPrice } = params;

        // 날짜 차이 구했음... ㅎㅎㅎ
        const dateInterval: number = new Date(
            start.getTime() - end.getTime()
        ).getDate();

        console.log({
            totalPrice,
            dateInterval
        });

        // 날짜마다 들어가야할 가격의 비율을 구해야함.
        // priceOriginal => DB상에 정의된 가격
        // priceApplied => User가 입력한 가격... 즉, 실제 적용된 가격을 말함.

        // TODO: 가격간의 비율 구하기!
        // 시즌 가격만 가지고 해야하는가? => Yes! 그런것 같음 ㅎㅎ

        const test = new PriceHistoryForBookingModel({
            ...ref
        });
        return test;
    }

    @instanceMethod
    async deleteThis(this: InstanceType<PriceHistoryForBookingSchema>) {
        await this.remove();
    }
}

export const PriceHistoryForBookingModel = new PriceHistoryForBookingSchema().getModelForClass(
    PriceHistoryForBookingSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "PriceHistories"
        }
    }
);
