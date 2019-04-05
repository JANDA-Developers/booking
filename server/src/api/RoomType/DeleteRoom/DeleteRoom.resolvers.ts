import { ObjectId } from "bson";
import { RoomModel } from "../../../models/Room";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    DeleteRoomMutationArgs,
    DeleteRoomResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteRoom: privateResolver(
            async (
                _,
                { roomId }: DeleteRoomMutationArgs,
                __
            ): Promise<DeleteRoomResponse> => {
                try {
                    const existingRoom = await RoomModel.findById(roomId);
                    if (existingRoom) {
                        const roomTypeId = existingRoom.roomType;
                        await existingRoom.remove();
                        // RoomType.rooms 배열에서 제외하기
                        await RoomTypeModel.update(
                            { _id: new ObjectId(roomTypeId) },
                            {
                                $pull: { rooms: new ObjectId(roomId) }
                            },
                            {
                                new: true
                            }
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
