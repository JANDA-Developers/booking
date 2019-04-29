import { Types } from "mongoose";
import { extractRoomPrice } from "../../../models/merge/merge";
import { RoomPriceModel } from "../../../models/RoomPrice";
import {
    DeleteRoomPriceMutationArgs,
    DeleteRoomPriceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteRoomPrice: privateResolver(
            async (
                _,
                { date, roomTypeId }: DeleteRoomPriceMutationArgs
            ): Promise<DeleteRoomPriceResponse> => {
                try {
                    const existingRoomPrice = await RoomPriceModel.findOne({
                        date: new Date(date),
                        roomType: new Types.ObjectId(roomTypeId)
                    });
                    if (!existingRoomPrice) {
                        return {
                            ok: false,
                            error: "존재하지 않는 RoomPrice",
                            roomPrice: null
                        };
                    }
                    await existingRoomPrice.remove();
                    return {
                        ok: true,
                        error: null,
                        roomPrice: await extractRoomPrice.bind(
                            extractRoomPrice,
                            existingRoomPrice
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        roomPrice: null
                    };
                }
            }
        )
    }
};
export default resolvers;
