import { Types } from "mongoose";
import { prop, Typegoose } from "typegoose";

export class RoomPriceSchema extends Typegoose {
    @prop({ required: true })
    roomType: Types.ObjectId;

    @prop({ required: true })
    house: Types.ObjectId;

    @prop({ required: true, index: true })
    date: Date;

    @prop({ required: true })
    price: number;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const RoomPriceModel = new RoomPriceSchema().getModelForClass(
    RoomPriceSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "RoomPrices"
        }
    }
);
