import { Types } from "mongoose";
import { RoomModel } from "../../../models/Room";
import { getRoomCapacityQuery } from "../../../queries/getRoomCapacityQuery";
import {
    GetRoomCapacityQueryArgs,
    GetRoomCapacityResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomCapacity: async (
            __,
            { roomId, checkIn, checkOut }: GetRoomCapacityQueryArgs
        ): Promise<GetRoomCapacityResponse> => {
            const roomInst = await RoomModel.findById(roomId);
            if (!roomInst) {
                return {
                    ok: false,
                    error: "존재하지 않는 RoomId",
                    capacity: []
                };
            }
            const capacity = await getRoomCapacityQuery({
                roomId: new Types.ObjectId(roomId),
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut)
            });
            return {
                ok: true,
                error: null,
                capacity
            };
        }
    }
};
export default resolvers;
