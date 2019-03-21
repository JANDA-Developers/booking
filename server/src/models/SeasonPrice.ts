import { prop, Ref, Typegoose } from "typegoose";
import { RoomTypeSchema } from "./RoomType";
import { SeasonSchema } from "./Season";

export class SeasonPriceSchema extends Typegoose {
    @prop({ required: true, ref: RoomTypeSchema })
    roomType: Ref<RoomTypeSchema>;

    @prop({ required: true, ref: SeasonSchema })
    season: Ref<SeasonSchema>;

    @prop({ required: true })
    price: number;

    @prop({ required: true })
    applyDays: number;
}

export const SeasonPriceModel = new SeasonPriceSchema().getModelForClass(
    SeasonPriceSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "SeasonPrices"
        }
    }
);
