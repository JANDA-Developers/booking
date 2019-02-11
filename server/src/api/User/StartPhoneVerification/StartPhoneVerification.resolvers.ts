import Verification from "../../../models/Verification";
import {
    StartPhoneVerificationMutationArgs,
    StartPhoneVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: async (
            _,
            args: StartPhoneVerificationMutationArgs
        ): Promise<StartPhoneVerificationResponse> => {
            const { phoneNumber } = args;
            try {
                const existingVerification = await Verification.findOne({
                    payload: phoneNumber
                });
                if (existingVerification) {
                    existingVerification.remove();
                }
                const verification = Verification.create({
                    target: "PHONE",
                    payload: phoneNumber
                });

                console.log(verification);

                await verification.save();
                // send key to that phonenumber.
                sendVerificationSMS(phoneNumber, verification.key);
                return {
                    ok: true,
                    error: null
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
