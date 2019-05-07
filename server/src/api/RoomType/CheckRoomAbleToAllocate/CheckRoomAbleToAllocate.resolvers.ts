import {
    CheckRoomAbleToAllocateQueryArgs,
    CheckRoomAbleToAllocateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        CheckRoomAbleToAllocate: privateResolver(
            async (
                _,
                args: CheckRoomAbleToAllocateQueryArgs
            ): Promise<CheckRoomAbleToAllocateResponse> => {
                try {
                    return {
                        ok: false,
                        error: "개발중",
                        roomStatusList: []
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        roomStatusList: []
                    };
                }
            }
        )
    }
};
export default resolvers;
