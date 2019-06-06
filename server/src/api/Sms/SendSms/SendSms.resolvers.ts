import { SendSmsMutationArgs, SendSmsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        SendSms: async (
            _,
            { msg, receivers, sender }: SendSmsMutationArgs
        ): Promise<SendSmsResponse> => {
            try {
                const result = await sendSMS(
                    receivers.join("|"),
                    msg,
                    sender,
                    "Y"
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
