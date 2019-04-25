import { Types } from "mongoose";
import { extractRoomPrices } from "../../../models/merge/merge";
import { RoomPriceModel } from "../../../models/RoomPrice";
import {
    GetAllRoomPriceQueryArgs,
    GetAllRoomPriceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllRoomPrice: privateResolver(
            async (
                _,
                { houseId, start, end }: GetAllRoomPriceQueryArgs
            ): Promise<GetAllRoomPriceResponse> => {
                try {
                    const allRoomPrices = await RoomPriceModel.find({
                        house: new Types.ObjectId(houseId),
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
                            allRoomPrices
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
