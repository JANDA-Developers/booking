import { Types } from "mongoose";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { SendSmsMutationArgs, SendSmsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        SendSms: async (
            _,
            { msg, receivers, sender, smsInfoId }: SendSmsMutationArgs
        ): Promise<SendSmsResponse> => {
            try {
                console.log({
                    receivers,
                    msg,
                    sender
                });
                const smsInfo = await SmsInfoModel.findById(smsInfoId);
                if (!smsInfo) {
                    return {
                        ok: false,
                        error: "존재하지 않는 SmsInfoId",
                        result: null
                    };
                }
                const result = await sendSMS(
                    {
                        receivers: receivers.join("|"),
                        msg,
                        sender
                    },
                    new Types.ObjectId(smsInfoId),
                    false
                );

                // TODO: 여기서부터 하면됨 ㅎㅎ
                // 결과값을 확인하고 result에 넣을것...
                return result;
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    result: null
                };
            }
        }
    }
};
export default resolvers;
