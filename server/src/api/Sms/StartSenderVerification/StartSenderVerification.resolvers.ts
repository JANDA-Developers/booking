import { Target, VerificationModel } from "../../../models/Verification";
import {
    StartSenderVerificationMutationArgs,
    StartSenderVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        StartSenderVerification: privateResolver(
            async (
                _: any,
                { phoneNumber }: StartSenderVerificationMutationArgs,
                { req }
            ): Promise<StartSenderVerificationResponse> => {
                const { user } = req;

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
