import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { RoomModel } from "../../../models/Room";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    GetallocatedRoomListQueryArgs,
    GetallocatedRoomListResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetallocatedRoomList: privateResolver(
            async (
                _,
                { houseId, start, end }: GetallocatedRoomListQueryArgs
            ): Promise<GetallocatedRoomListResponse> => {
                try {
                    const existHouse = await HouseModel.findById(houseId);
                    if (!existHouse) {
                        return {
                            ok: false,
                            error: "존재하지 않는 house",
                            allocatedRoomList: []
                        };
                    }
                    const roomTypes = await RoomTypeModel.find({
                        house: new Types.ObjectId(houseId)
                    });
                    const rooms = await RoomModel.find({
                        roomType: roomTypes.map(roomType => {
                            return new Types.ObjectId(roomType._id);
                        })
                    });

                    // const allocation: Allocation[] = rooms.map((room): Allocation => {
                    //     return {
                    //         bed:
                    //     }
                    // });
                    console.log({
                        rooms
                    });
                    return {
                        ok: false,
                        error: "개발중",
                        allocatedRoomList: []
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        allocatedRoomList: []
                    };
                }
            }
        )
    }
};
export default resolvers;
