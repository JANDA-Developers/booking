import { RoomModel } from "../../../models/Room";
import {
    DeleteRoomMutationArgs,
    DeleteRoomResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteRoom: privateResolver(
            async (
                _,
                { roomId }: DeleteRoomMutationArgs
            ): Promise<DeleteRoomResponse> => {
                try {
                    const existingRoom = await RoomModel.findById(roomId);
                    if (!existingRoom) {
                        return {
                            ok: false,
                            error: "존재하지 않는 RoomId"
                        };
                    }
                    return await existingRoom.removeThis();
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
};

export default resolvers;
