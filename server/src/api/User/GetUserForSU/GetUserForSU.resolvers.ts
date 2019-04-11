import { extractUser } from "../../../models/merge/merge";
import { UserModel } from "../../../models/User";
import {
    GetUserForSuQueryArgs,
    GetUserForSUResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForSU } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetUserForSU: privateResolverForSU(
            async (
                _,
                { userId }: GetUserForSuQueryArgs,
                ctx
            ): Promise<GetUserForSUResponse> => {
                try {
                    const existingUser = await UserModel.findById(userId);
                    if (!existingUser) {
                        return {
                            ok: false,
                            error: "User is not Exist!",
                            user: null
                        };
                    }
                    return {
                        ok: true,
                        error: null,
                        user: await extractUser.bind(extractUser, existingUser)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: null,
                        user: null
                    };
                }
            }
        )
    }
};
export default resolvers;
