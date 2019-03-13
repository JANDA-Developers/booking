import { ObjectId } from "bson";
import { Types } from "mongoose";
import { index, pre, prop, Typegoose } from "typegoose";
import { DateRange } from "../types/graph";

@index({ house: 1 })
@index({ priority: -1 })
@pre<SeasonSchema>("save", async function(next) {
    try {
        if (this.priority <= 0 || !this.priority) {
            const test = await SeasonModel.findOne({
                house: new ObjectId(this.house)
            }).sort({ priority: -1 });
            if (test) {
                this.priority = test.priority + 1;
            }
        }
        this.house = new ObjectId(this.house);
    } catch (error) {
        throw error;
    }
    next();
})
export class SeasonSchema extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    dateRange: DateRange;

    @prop({ default: 0, min: 0 })
    priority: number;

    @prop()
    color: string | null;

    @prop()
    description: string | null;

    @prop({ required: true })
    house: Types.ObjectId;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const SeasonModel = new SeasonSchema().getModelForClass(SeasonSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "Seasons"
    }
});
