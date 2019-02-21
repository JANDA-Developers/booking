import { ObjectId } from "bson";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    DeleteRoomTypeMutationArgs,
    DeleteRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolver: Resolvers = {
    Mutation: {
        DeleteRoomType: async (
            _,
            args: DeleteRoomTypeMutationArgs,
            { req }
        ): Promise<DeleteRoomTypeResponse> => {
            const { user } = req;
            try {
                await RoomTypeModel.findOneAndDelete({
                    _id: args.roomTypeId,
                    user: new ObjectId(user._id)
                });
                return {
                    ok: true,
                    error: null
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};
export default resolver;
