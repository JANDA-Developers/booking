import {
    GetAllocatedRoomListQueryArgs,
    GetAllocatedRoomListResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllocatedRoomList: privateResolver(
            async (
                _,
                { houseId, start, end }: GetAllocatedRoomListQueryArgs
            ): Promise<GetAllocatedRoomListResponse> => {
                try {
                    const;
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        allocatedRoomList: []
                    };
                }
            }
        )
    }
};
export default resolvers;
