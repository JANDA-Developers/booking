import { ObjectId } from "bson";
import { extractRoom } from "../../../models/Merge";
import { RoomModel } from "../../../models/Room";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    CreateRoomMutationArgs,
    CreateRoomResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolver: Resolvers = {
    Mutation: {
        CreateRoom: privateResolver(
            async (
                _,
                args: CreateRoomMutationArgs,
                context
            ): Promise<CreateRoomResponse> => {
                try {
                    const room = new RoomModel({
                        ...args
                    });
                    await room.save();
                    await RoomTypeModel.updateOne(
                        {
                            _id: new ObjectId(args.roomType)
                        },
                        {
                            $push: {
                                rooms: new ObjectId(room._id)
                            }
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        room: await extractRoom(room)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        room: null
                    };
                }
            }
        )
    }
};
export default resolver;
