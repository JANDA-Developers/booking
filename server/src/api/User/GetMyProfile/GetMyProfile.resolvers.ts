import { GetMyProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolver(
            async (_: any, __: any, { req }): Promise<GetMyProfileResponse> => {
                console.log(req);

                const { user } = req;
                if (user) {
                    return {
                        ok: true,
                        error: null,
                        user
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
