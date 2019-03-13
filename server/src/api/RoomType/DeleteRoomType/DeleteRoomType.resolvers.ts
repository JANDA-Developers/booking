import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    DeleteRoomTypeMutationArgs,
    DeleteRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolver: Resolvers = {
    Mutation: {
        DeleteRoomType: privateResolver(
            async (
                _,
                args: DeleteRoomTypeMutationArgs
            ): Promise<DeleteRoomTypeResponse> => {
                try {
                    await RoomTypeModel.findOneAndDelete({
                        _id: args.roomTypeId,
                        house: new ObjectId(args.houseId)
                    });
                    await HouseModel.updateOne(
                        {
                            _id: new ObjectId(args.houseId)
                        },
                        {
                            $pull: {
                                roomTypes: new ObjectId(args.roomTypeId)
                            }
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
export default resolver;
