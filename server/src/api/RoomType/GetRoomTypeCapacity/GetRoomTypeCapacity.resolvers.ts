import {
    GetRoomTypeCapacityQueryArgs,
    GetRoomTypeCapacityResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomTypeCapacity: async (
            __: any,
            {  }: GetRoomTypeCapacityQueryArgs
        ): Promise<GetRoomTypeCapacityResponse> => {
            return {
                ok: false,
                error: "개발중",
                capacityRoomType: []
            };
        }
    }
};
export default resolvers;
