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
            sendResult
        }: {
            msg: string;
            sender: string;
            receivers: string | string[];
            sendResult: boolean;
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
                sendResult
            });
        } catch (error) {
            throw error;
        }
    }

    @prop()
    smsInfo: Types.ObjectId;

    @prop()
    msg: string;

    @prop()
    sender: string;

    @prop()
    receivers: string[];

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
