import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import { SmsSendCase } from "../types/graph";

export class SmsTemplateSchema extends Typegoose {
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
        this: InstanceType<SmsTemplateSchema>,
        params: {
            formatName: string;
            smsFormat: string;
        }
    ): Promise<InstanceType<SmsTemplateSchema>> {
        return await new SmsTemplateModel({});
    }
}

export const SmsTemplateModel = new SmsTemplateSchema().getModelForClass(
    SmsTemplateSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "SmsTemplates"
        }
    }
);
