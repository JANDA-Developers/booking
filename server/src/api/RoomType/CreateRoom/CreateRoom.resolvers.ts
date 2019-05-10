import { extractRoom } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    CreateRoomMutationArgs,
    CreateRoomResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolver: Resolvers = {
    Mutation: {
        CreateRoom: privateResolver(
            async (
                _,
                args: CreateRoomMutationArgs
            ): Promise<CreateRoomResponse> => {
                try {
                    const roomType = await RoomTypeModel.findById(
                        args.roomType
                    );
                    if (!roomType) {
                        return {
                            ok: false,
                            error: "존재하지 않는 RoomTypeId",
                            room: null
                        };
                    }
                    const room = await roomType.createRoomInstance({
                        withSave: true,
                        name: args.name
                    });
                    return {
                        ok: true,
                        error: null,
                        room: await extractRoom.bind(extractRoom, room)
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
