import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { RoomModel } from "../../../models/Room";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    GetallocatedBedListQueryArgs,
    GetallocatedBedListResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetallocatedBedList: privateResolver(
            async (
                _,
                { houseId, start, end }: GetallocatedBedListQueryArgs
            ): Promise<GetallocatedBedListResponse> => {
                try {
                    const existHouse = await HouseModel.findById(houseId);
                    if (!existHouse) {
                        return {
                            ok: false,
                            error: "존재하지 않는 house",
                            allocatedBedList: []
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
                        allocatedBedList: []
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        allocatedBedList: []
                    };
                }
            }
        )
    }
};
export default resolvers;
