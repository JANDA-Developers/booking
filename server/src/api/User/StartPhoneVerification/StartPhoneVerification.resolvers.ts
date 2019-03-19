import { Target, VerificationModel } from "../../../models/Verification";
import {
    StartPhoneVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: privateResolver(
            async (
                _: any, 
                __, 
                { req }
            ): Promise<StartPhoneVerificationResponse> => {
                const { user } = req;
                const { phoneNumber } = user;

                try {
                    const existingVerification = await VerificationModel.findOne(
                        {
                            target: Target.PHONE,
                            payload: phoneNumber
                        }
                    );
                    console.log({
                        user,
                        existingVerification
                    });
                    if (
                        existingVerification &&
                        existingVerification.user.equals(user._id)
                    ) {
                        await existingVerification.remove();
                    }

                    const verification = new VerificationModel({
                        target: Target.PHONE,
                        payload: phoneNumber,
                        user: user._id
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
