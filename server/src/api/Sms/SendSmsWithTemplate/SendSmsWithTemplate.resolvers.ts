import { Types } from "mongoose";
import { SmsInfoModel } from "../../../models/SmsInfo";
import {
    SendSmsWithTemplateMutationArgs,
    SendSmsWithTemplateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { digitsComma } from "../../../utils/etc";
import { privateResolver } from "../../../utils/privateResolvers";
import { sendSMS } from "../../../utils/sendSMS";
import { getFormattedAutoSendMessage } from "../../../utils/SmsDecorator";

const resolvers: Resolvers = {
    Mutation: {
        SendSmsWithTemplate: privateResolver(
            async (
                _,
                {
                    receiver,
                    smsInfoId,
                    smsTemplateId,
                    params
                }: SendSmsWithTemplateMutationArgs
            ): Promise<SendSmsWithTemplateResponse> => {
                try {
                    const smsInfo = await SmsInfoModel.findOne(
                        {
                            _id: new Types.ObjectId(smsInfoId)
                        },
                        {
                            smsTemplates: {
                                $elemMatch: {
                                    _id: new Types.ObjectId(smsTemplateId)
                                }
                            },
                            sender: 1
                        }
                    );
                    if (!smsInfo) {
                        return {
                            ok: false,
                            error: "존재하지 않는 smsInfoId"
                        };
                    }
                    const smsTemplate = smsInfo.smsTemplates[0];
                    if (!smsTemplate) {
                        return {
                            ok: false,
                            error: "존재하지 않는 smsTemplateId"
                        };
                    }
                    const msg = getFormattedAutoSendMessage(
                        smsTemplate.smsFormat,
                        {
                            BookerName: params.bookerName || "",
                            RoomTypeNCount: params.RoomTypeNCount || "",
                            StayDate: params.stayDate || "",
                            StayDateYMD: params.stayDateYMD || "",
                            TotalPrice: digitsComma(params.totalPrice || 0),
                            PayMethod: "", // TODO
                            PaymentStatus: ""
                        }
                    );
                    const sendResult = await sendSMS(
                        receiver,
                        msg,
                        smsInfo.sender.phoneNumber
                    );
                    return {
                        ...sendResult
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
};

export default resolvers;
