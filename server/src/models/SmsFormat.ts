import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import { SmsSendCase } from "../types/graph";

export class SmsFormatSchema extends Typegoose {
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

    @instanceMethod
    async createSmsFormat(
        this: InstanceType<SmsFormatSchema>,
        params: {
            formatName: string;
            smsFormat: string;
        }
    ): Promise<InstanceType<SmsFormatSchema>> {
        return await new SmsFormatModel({});
    }
}

export const SmsFormatModel = new SmsFormatSchema().getModelForClass(
    SmsFormatSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "SmsFormats"
        }
    }
);
