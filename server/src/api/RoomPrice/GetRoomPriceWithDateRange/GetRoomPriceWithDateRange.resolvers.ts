import { ObjectId } from "bson";
import { extractRoomPrices } from "../../../models/merge/merge";
import { RoomPriceModel } from "../../../models/RoomPrice";
import {
    GetRoomPriceWithDateRangeQueryArgs,
    GetRoomPriceWithDateRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomPriceWithDateRange: privateResolver(
            async (
                _,
                { roomTypeId, start, end }: GetRoomPriceWithDateRangeQueryArgs
            ): Promise<GetRoomPriceWithDateRangeResponse> => {
                try {
                    const roomPrices = await RoomPriceModel.find({
                        roomType: new ObjectId(roomTypeId),
                        date: {
                            $gte: new Date(start),
                            $lte: new Date(end)
                        }
                    });
                    return {
                        ok: true,
                        error: null,
                        roomPrices: await extractRoomPrices.bind(
                            extractRoomPrices,
                            roomPrices
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        roomPrices: []
                    };
                }
            }
        )
    }
};
export default resolvers;
