import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import { SmsInfo, SmsSender, SmsTemplate } from "../types/graph";

export class SmsInfoSchema extends Typegoose {
    @prop({ required: true })
    user: Types.ObjectId;

    @prop({ required: true, unique: true })
    house: Types.ObjectId;

    @prop({ required: true })
    sender: SmsSender;

    @prop({ default: [] })
    receivers: string[];

    @prop({ default: [] })
    smsTemplates: SmsTemplate[];

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;

    @instanceMethod
    async updateSmsTemplate(
        this: InstanceType<SmsInfoSchema>,
        { sender, receivers }: SmsInfo
    ): Promise<InstanceType<SmsInfoSchema>> {
        await SmsInfoModel.findOneAndUpdate(
            {
                house: this.house,
                user: this.user
            },
            {
                $set: {
                    sender,
                    receivers
                }
            },
            {
                new: true,
                upsert: true
            }
        );
        const smsTemplate = new SmsInfoModel({});
        console.log(smsTemplate);

        return await new SmsInfoModel({});
    }

    @instanceMethod
    async pushSmsTemplate(
        this: InstanceType<SmsInfoSchema>,
        smsTemplate: SmsTemplate
    ) {
        this.smsTemplates.push(smsTemplate);
        this.update({
            $push: {
                smsTemplates: smsTemplate
            }
        });
    }
}

export const SmsInfoModel = new SmsInfoSchema().getModelForClass(
    SmsInfoSchema,
    {
        schemaOptions: {
            timestamps: true,
            collection: "SmsInfos"
        }
    }
);
