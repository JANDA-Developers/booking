import { InstanceType, prop, Typegoose } from "typegoose";
import { PriceHistoryType, PriceInfo } from "../types/graph";

export enum PriceHistoryTypeEnum {
    BOOKING = "BOOKING"
}

export abstract class BasePriceHistorySchema extends Typegoose {
    @prop({
        enum: PriceHistoryTypeEnum
    })
    priceHistoryType: PriceHistoryType;

    @prop({ default: [] })
    priceInfos: PriceInfo[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    abstract async make(
        ...args: any
    ): Promise<InstanceType<BasePriceHistorySchema>>;
}
