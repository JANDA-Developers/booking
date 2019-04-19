import { prop, Ref, Typegoose } from "typegoose";
import { HouseSchema } from "./House";
import { RoomTypeSchema } from "./RoomType";

export class RoomPriceSchema extends Typegoose {
    @prop({ required: true, ref: RoomTypeSchema })
    roomType: Ref<RoomTypeSchema>;

    @prop({ required: true, ref: HouseSchema })
    house: Ref<HouseSchema>;

    @prop({ required: true })
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
