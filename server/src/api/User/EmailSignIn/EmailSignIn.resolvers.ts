import { User } from "../../../models/User";
import {
    EmailSignInQueryArgs,
    EmailSignInResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Query: {
        EmailSignIn: async (
            _,
            args: EmailSignInQueryArgs
        ): Promise<EmailSignInResponse> => {
            const { email, password } = args;
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return {
                        ok: false,
                        error: "No user found that email.",
                        token: null
                    };
                }
                const checkPassword = await user.comparePassword(password);

                if (checkPassword) {
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        token
                    };
                } else {
                    return {
                        ok: false,
                        error: "Wrong Password",
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
