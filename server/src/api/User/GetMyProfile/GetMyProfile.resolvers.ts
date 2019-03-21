import { extractUser } from "../../../models/merge/Merge";
import { GetMyProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolver(
            async (_: any, __: any, { req }): Promise<GetMyProfileResponse> => {
                const { user } = req;
                if (user) {
                    return {
                        ok: true,
                        error: null,
                        user: await extractUser.bind(extractUser, user)
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
