import { UserModel } from "../../../models/User";
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
            try {
                const existingUser = await UserModel.findOne({
                    $or: [{ email }, { phoneNumber }]
                });
                if (existingUser) {
                    // 이미 가입된 id가 존재하면 로그인 페이지로 넘긴다.
                    return {
                        ok: false,
                        error: "Already Sign Up User",
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
                // 유저가 존재하지 않을 때
                const newUser = new UserModel({
                    ...args
                });
                await newUser.hashPassword();
                await newUser.save();
                const token = createJWT(newUser._id);
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
