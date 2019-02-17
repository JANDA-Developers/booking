import { GetMyProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolver(
            async (_: any, __: any, { req }): Promise<GetMyProfileResponse> => {
                const { user } = req;
                // console.log({
                //     GetMyProfile_user: {
                //         ...user
                //     }
                // });
                
                if (user) {
                    return {
                        ok: true,
                        error: null,
                        user: {
                            ...user._doc,
                            password: null
                        }
                    };
                } else {
                    return {
                        ok: false,
                        error: "User Not Found",
                        user: null
                    };
                }
            }
        )
    }
};

export default resolvers;
