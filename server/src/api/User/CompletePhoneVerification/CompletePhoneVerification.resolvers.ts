import { getMongoManager } from "typeorm";
import User from "../../../models/User";
import Verification from "../../../models/Verification";
import {
    CompletePhoneVerificationMutationArgs,
    CompletePhoneVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (
            _,
            args: CompletePhoneVerificationMutationArgs
        ): Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            const mmg = getMongoManager();
            try {
                const verification = await Verification.findOne({
                    target: "PHONE",
                    payload: phoneNumber,
                    key
                });
                if (verification) {
                    verification.verified = true;
                    verification.save();
                } else {
                    return {
                        ok: false,
                        error: "Invalid Verification Key",
                        token: null
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

            try {
                // const user = await User.findOne({ phoneNumber });
                const user = await mmg.findOne(User, {phoneNumber});
                if (user) {
                    user.verifiedPhone = true;
                    await mmg.save(user);
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        token
                    };
                } else {
                    return {
                        ok: false,
                        error: "User is not Exist!",
                        token: null
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};
export default resolvers;
