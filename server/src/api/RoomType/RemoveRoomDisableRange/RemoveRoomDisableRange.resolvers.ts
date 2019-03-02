import { ObjectId } from "bson";
import { RoomModel } from "../../../models/Room";
import {
    RemoveRoomDisableRangeMutationArgs,
    RemoveRoomDisableRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        RemoveRoomDisableRange: privateResolver(
            async (
                _,
                {
                    roomId,
                    startDate,
                    endDate
                }: RemoveRoomDisableRangeMutationArgs,
                ctx
            ): Promise<RemoveRoomDisableRangeResponse> => {
                try {
                    // disableRange;

                    await RoomModel.remove({
                        _id: new ObjectId(roomId),
                        disableRanges: { $eq: { startDate, endDate } }
                    });
                    return {
                        ok: false,
                        error: "Underdevelop"
                    };
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
