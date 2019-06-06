import {
    IsAbleToAllocateQueryArgs,
    IsAbleToAllocateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        IsAbleToAllocate: privateResolver(
            async (
                _,
                { guestId, roomId }: IsAbleToAllocateQueryArgs
            ): Promise<IsAbleToAllocateResponse> => {
                try {
                    return {
                        ok: true,
                        error: "개발 중",
                        guest: null
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        guest: null
                    };
                }
            }
        )
    }
};

export default resolvers;
