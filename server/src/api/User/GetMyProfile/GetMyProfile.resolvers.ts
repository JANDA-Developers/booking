import { extractUser } from "../../../models/Merge";
import { GetMyProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolver(
            async (_: any, __: any, { req }): Promise<GetMyProfileResponse> => {
                const { user } = req;
                if (user) {
                    const extractedUser = await extractUser(user);
                    console.log({
                        GetMyProfile: extractedUser
                    });
                    return {
                        ok: true,
                        error: null,
                        user: extractedUser
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
