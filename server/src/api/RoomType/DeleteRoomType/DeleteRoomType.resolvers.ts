import { Types } from "mongoose";
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
                        _id: new Types.ObjectId(roomTypeId),
                        house: new Types.ObjectId(houseId)
                    });
                    if (!roomType) {
                        return {
                            ok: false,
                            error: "RoomType is not exist"
                        };
                    }
                    return await roomType.removeThis();
                    // const index = roomType.index;

                    // // 기존에 존재하던 인덱스값들 하나씩 -1 ㄱㄱ
                    // await RoomTypeModel.updateMany(
                    //     {
                    //         house: new Types.ObjectId(houseId),
                    //         index: {
                    //             $gt: index
                    //         }
                    //     },
                    //     {
                    //         $inc: {
                    //             index: -1
                    //         }
                    //     }
                    // );
                    // await HouseModel.updateOne(
                    //     {
                    //         _id: new Types.ObjectId(houseId)
                    //     },
                    //     {
                    //         $pull: {
                    //             roomTypes: new Types.ObjectId(roomTypeId)
                    //         }
                    //     }
                    // );
                    // // SeasonPrice, RoomPrice 삭제
                    // await RoomPriceModel.deleteMany({
                    //     house: new Types.ObjectId(houseId),
                    //     roomType: new Types.ObjectId(roomTypeId)
                    // });
                    // await SeasonPriceModel.deleteMany({
                    //     house: new Types.ObjectId(houseId),
                    //     roomType: new Types.ObjectId(roomTypeId)
                    // });
                    // // 트랜잭션이 필요하다... ㅜ
                    // return {
                    //     ok: true,
                    //     error: null
                    // };
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
