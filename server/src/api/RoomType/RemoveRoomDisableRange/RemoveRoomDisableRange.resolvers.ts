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
                { roomId, hashCode }: RemoveRoomDisableRangeMutationArgs,
                __
            ): Promise<RemoveRoomDisableRangeResponse> => {
                try {
                    await RoomModel.updateOne(
                        {
                            _id: new ObjectId(roomId)
                        },
                        {
                            $pull: {
                                disableRanges: {
                                    hashCode
                                }
                            }
                        },
                        {
                            new: true
                        }
                    );
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
        )
    }
};
export default resolvers;
