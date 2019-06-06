import { Types } from "mongoose";
import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose";
import {
    AutoSendWhen,
    SendSmsResponse,
    SmsInfo,
    SmsSender,
    SmsTemplate
} from "../types/graph";
import { sendSMS } from "../utils/sendSMS";
import {
    getFormattedAutoSendMessage,
    SmsReplacementValues
} from "../utils/SmsDecorator";

import * as _ from "lodash";

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

    @instanceMethod
    async addReceiver(this: InstanceType<SmsInfoSchema>, receiver: string) {
        // TODO: validation ㄱㄱㄱ
        this.receivers.push(receiver.replace("-", ""));
        await this.save();
        return this.receivers;
    }

    @instanceMethod
    async removeReceiver(this: InstanceType<SmsInfoSchema>, receiver: string) {
        _.pull(this.receivers, receiver);
        await this.save();
        return this.receivers;
    }

    @instanceMethod
    getSmsTemplate(
        this: InstanceType<SmsInfoSchema>,
        sendCase: AutoSendWhen
    ): SmsTemplate | null {
        // TODO:
        const smsTemplate = this.smsTemplates.find(st => {
            if (st.smsSendCase && st.smsSendCase.when === sendCase) {
                return true;
            }
            return false;
        });
        return smsTemplate || null;
    }

    @instanceMethod
    async sendSmsWithTemplate(
        this: InstanceType<SmsInfoSchema>,
        sendCase: AutoSendWhen,
        receivers: string,
        values: SmsReplacementValues
    ): Promise<SendSmsResponse> {
        // TODO: 데헷데헷
        const template = this.getSmsTemplate(sendCase);
        if (!template) {
            return {
                ok: false,
                error: "template이 존재하지 않습니다.",
                result: null
            };
        }
        const msg = getFormattedAutoSendMessage(template.smsFormat, values);
        // send 하긔!
        return await sendSMS(receivers, msg);
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
