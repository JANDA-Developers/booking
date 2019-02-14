import { getMongoManager } from "typeorm";
import User from "../../../models/User";
import {
    EmailSignUpMutationArgs,
    EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (
            _,
            args: EmailSignUpMutationArgs
        ): Promise<EmailSignUpResponse> => {
            const { email, phoneNumber } = args;
            const mmg = getMongoManager();
            try {
                const isExistingEmail =
                    (await mmg.findOne(User, { email })) !== undefined;
                const isExistingPhoneNumber =
                    (await mmg.findOne(User, {
                        phoneNumber
                    })) !== undefined;
                    
                const existingInfo: string[] = [];
                if (isExistingEmail) {
                    existingInfo.push("Email");
                }
                if (isExistingPhoneNumber) {
                    existingInfo.push("PhoneNumner");
                }
                if (isExistingEmail || isExistingPhoneNumber) {
                    return {
                        ok: false,
                        error: `Duplicate Information: ${existingInfo.join(
                            ", "
                        )}`,
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
                const newUser = await mmg.create(User, {
                    ...args
                });
                mmg.save(newUser);
                const token = createJWT(newUser.id);
                return {
                    ok: true,
                    error: null,
                    token
                };
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
