import { ObjectId } from "bson";
import { RoomModel } from "../../../models/Room";
import {
    AddRoomDisableRangeMutationArgs,
    AddRoomDisableRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        AddRoomDisableRange: privateResolver(
            async (
                _,
                { disableRange, roomId }: AddRoomDisableRangeMutationArgs,
                ctx
            ): Promise<AddRoomDisableRangeResponse> => {
                try {
                    await RoomModel.update(
                        {
                            _id: new ObjectId(roomId)
                        },
                        {
                            $push: { disableRanges: disableRange }
                        }
                    );
                    return {
                        ok: true,
                        error: null
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
