import { RoomModel } from "../../../models/Room";
import {
    GetRoomGuestsCapacityQueryArgs,
    GetRoomGuestsCapacityResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomGuestsCapacity: async (
            _,
            { roomId, start, end }: GetRoomGuestsCapacityQueryArgs
        ): Promise<GetRoomGuestsCapacityResponse> => {
            try {
                const existingRoom = await RoomModel.findById(roomId);
                if (!existingRoom) {
                    return {
                        ok: false,
                        error: "존재하지 않는 RoomId",
                        capacity: null
                    };
                }
                return {
                    ok: true,
                    error: null,
                    capacity: await existingRoom.getCapacity(start, end)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    capacity: null
                };
            }
        }
    }
};
export default resolvers;
