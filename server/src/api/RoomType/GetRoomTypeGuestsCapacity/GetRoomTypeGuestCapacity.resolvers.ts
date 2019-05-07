import {
    GetRoomTypeGuestCapacityQueryArgs,
    GetRoomTypeGuestCapacityResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomTypeGuestCapacity: async (
            _,
            args: GetRoomTypeGuestCapacityQueryArgs
        ): Promise<GetRoomTypeGuestCapacityResponse> => {
            // TODO
            return {
                ok: false,
                error: null,
                roomTypeCapacity: null
            };
        }
    }
};
export default resolvers;
