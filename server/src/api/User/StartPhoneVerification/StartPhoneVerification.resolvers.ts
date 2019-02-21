import { Target, VerificationModel } from "../../../models/Verification";
import { StartPhoneVerificationResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: privateResolver(
            async (
                _: any,
                __: any,
                { req }
            ): Promise<StartPhoneVerificationResponse> => {
                const { user } = req;
                const { phoneNumber } = user;

                try {
                    const existingVerification = await VerificationModel.findOne({
                        target: Target.PHONE,
                        payload: phoneNumber
                    });
                    console.log({
                        userId: user._id,
                        vfId: !existingVerification || existingVerification.user
                    });
                    
                    if (existingVerification && existingVerification.user === user._id) {
                        await existingVerification.remove();
                    }

                    const verification = new VerificationModel({
                        target: Target.PHONE,
                        payload: phoneNumber
                    });
                    await verification.save();
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
        )
    }
};

export default resolvers;
