import { Types } from "mongoose";
import { InstanceType, prop, staticMethod, Typegoose } from "typegoose";

export class SmsHistorySchema extends Typegoose {
    @staticMethod
    static createHistory(
        smsInfoId: Types.ObjectId,
        {
            msg,
            sender,
            receivers,
            sendResult,
            autoSend,
            msgType
        }: {
            msg: string;
            sender: string;
            receivers: string | string[];
            sendResult: boolean;
            autoSend: boolean;
            msgType: string;
        }
    ): InstanceType<SmsHistorySchema> {
        try {
            return new SmsHistoryModel({
                smsInfo: smsInfoId,
                msg,
                sender,
                receivers:
                    typeof receivers === "string"
                        ? receivers.split("|")
                        : receivers,
                sendResult,
                autoSend
            });
        } catch (error) {
            throw error;
        }
    }

    @prop()
    smsInfo: Types.ObjectId;

    @prop()
    msg: string;

    @prop({ default: false })
    autoSend: boolean;

    @prop()
    sender: string;

    @prop()
    receivers: string[];

    @prop({ enum: ["SMS", "LMS", "MMS"], default: "SMS" })
    msgType: string;

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
