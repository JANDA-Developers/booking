import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    DeleteRoomTypeMutationArgs,
    DeleteRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolver: Resolvers = {
    Mutation: {
        DeleteRoomType: privateResolver(
            async (
                _,
                { roomTypeId, houseId }: DeleteRoomTypeMutationArgs
            ): Promise<DeleteRoomTypeResponse> => {
                try {
                    const roomType = await RoomTypeModel.findOne({
                        _id: new ObjectId(roomTypeId),
                        house: new ObjectId(houseId)
                    });
                    if (!roomType) {
                        return {
                            ok: false,
                            error: "RoomType is not exist"
                        };
                    }
                    const index = roomType.index;

                    // 기존에 존재하던 인덱스값들 하나씩 -1 ㄱㄱ
                    await RoomTypeModel.updateMany(
                        {
                            house: new ObjectId(houseId),
                            index: {
                                $gt: index
                            }
                        },
                        {
                            $inc: {
                                index: -1
                            }
                        }
                    );
                    await HouseModel.updateOne(
                        {
                            _id: new ObjectId(houseId)
                        },
                        {
                            $pull: {
                                roomTypes: new ObjectId(roomTypeId)
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
