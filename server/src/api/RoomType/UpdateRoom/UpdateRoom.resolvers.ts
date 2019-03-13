import { ObjectId } from "bson";
import { RoomModel } from "../../../models/Room";
import {
    UpdateRoomMutationArgs,
    UpdateRoomResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRoom: privateResolver(
            async (
                _,
                { roomId, ...args }: UpdateRoomMutationArgs
            ): Promise<UpdateRoomResponse> => {
                try {
                    const existingRoom = await RoomModel.findById(roomId);
                    if (existingRoom) {
                        await RoomModel.updateOne(
                            {
                                _id: new ObjectId(roomId)
                            },
                            args,
                            { new: true }
                        );
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "Room does not exist"
                        };
                    }
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
