import { Target, VerificationModel } from "../../../models/Verification";
import {
    CompletePhoneVerificationMutationArgs,
    CompletePhoneVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: privateResolver(
            async (
                _,
                args: CompletePhoneVerificationMutationArgs,
                { req }
            ): Promise<CompletePhoneVerificationResponse> => {
                const { key } = args;
                const user = req.user;
                try {
                    const verification = await VerificationModel.findOne({
                        target: Target.PHONE,
                        payload: user.phoneNumber,
                        key
                    });
                    if (verification && verification.user) {
                        verification.verified = true;
                        await verification.save();
                    } else {
                        return {
                            ok: false,
                            error: "Invalid Verification"
                        };
                    }

                    if (user) {
                        user.isPhoneVerified = true;
                        await user.save();
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "No User Match"
                        };
                    }
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
