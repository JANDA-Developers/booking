import { prop, Typegoose } from "typegoose";
import { SmsSendCase } from "../types/graph";

export class SmsSchema extends Typegoose {
    @prop({ required: true })
    apiKey: string;

    @prop({ required: true })
    smsFormat: string;

    @prop({ required: true })
    formatName: string;

    @prop()
    smsSendCase?: SmsSendCase;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export const SmsModel = new SmsSchema().getModelForClass(SmsSchema, {
    schemaOptions: {
        timestamps: true,
        collection: "SMS"
    }
});
