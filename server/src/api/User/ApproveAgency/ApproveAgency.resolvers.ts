import { UserModel } from "../../../models/User";
import {
    ApproveAgencyMutationArgs,
    ApproveAgencyResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForSU } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        ApproveAgency: privateResolverForSU(
            async (
                _,
                { userId }: ApproveAgencyMutationArgs
            ): Promise<ApproveAgencyResponse> => {
                try {
                    const user = await UserModel.findById(userId);
                    if (!user) {
                        return {
                            ok: false,
                            error: "존재하지 않는 UserId",
                            agencyId: null
                        };
                    }
                    const agencyId = await user.makeAgencyId();
                    return {
                        ok: true,
                        error: null,
                        agencyId
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        agencyId: null
                    };
                }
            }
        )
    }
};
export default resolvers;
