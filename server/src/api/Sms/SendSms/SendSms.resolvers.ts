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
                const result = await sendSMS(receivers.join("|"), msg, sender);
                // TODO: 여기서부터 하면됨 ㅎㅎ
                return {
                    ok: result.ok,
                    error: result.error
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};
export default resolvers;
