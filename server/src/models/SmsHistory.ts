import { Types } from "mongoose";
import { prop, Typegoose } from "typegoose";

export class SmsHistorySchema extends Typegoose {
    @prop({})
    content: string;

    @prop()
    user: Types.ObjectId;

    @prop()
    house: Types.ObjectId;

    @prop({})
    createdAt: Date;

    @prop({})
    updatedAt: Date;
}

export const SmsHistoryModel = new SmsHistorySchema().getModelForClass(
    SmsHistorySchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "SmsHistories"
        }
    }
);
