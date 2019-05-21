import { Types } from "mongoose";
import { extractRoomTypeWithCapacity } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    GetAllRoomTypeCapacityQueryArgs,
    GetAllRoomTypeCapacityResponse,
    RoomTypeWithCapacity
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllRoomTypeCapacity: async (
            _,
            { houseId, filter, ...args }: GetAllRoomTypeCapacityQueryArgs
        ): Promise<GetAllRoomTypeCapacityResponse> => {
            try {
                const { start, end } = {
                    start: new Date(args.start),
                    end: new Date(args.end)
                };
                const roomTypes = await RoomTypeModel.find({
                    house: new Types.ObjectId(houseId)
                });
                const roomTypeWithCapacityList = await Promise.all(
                    roomTypes.map(
                        async (
                            roomTypeInstance
                        ): Promise<RoomTypeWithCapacity> => {
                            return await extractRoomTypeWithCapacity(
                                roomTypeInstance,
                                start,
                                end
                            );
                        }
                    )
                );
                return {
                    ok: false,
                    error: null,
                    roomTypeWithCapacityList
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    roomTypeWithCapacityList: []
                };
            }
        }
    }
};
export default resolvers;
