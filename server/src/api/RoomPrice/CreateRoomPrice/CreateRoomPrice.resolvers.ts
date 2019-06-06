import { Types } from "mongoose";
import { extractRoomPrice } from "../../../models/merge/merge";
import { RoomPriceModel } from "../../../models/RoomPrice";
import {
    CreateRoomPriceMutationArgs,
    CreateRoomPriceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateRoomPrice: privateResolver(
            async (
                _,
                { roomTypeId, houseId, ...args }: CreateRoomPriceMutationArgs
            ): Promise<CreateRoomPriceResponse> => {
                try {
                    let existRoomPrice = await RoomPriceModel.findOne({
                        roomType: new Types.ObjectId(roomTypeId),
                        house: new Types.ObjectId(houseId),
                        date: new Date(args.date)
                    });

                    if (existRoomPrice) {
                        existRoomPrice.price = args.price;
                        await existRoomPrice.save();
                    } else {
                        existRoomPrice = await new RoomPriceModel({
                            roomType: new Types.ObjectId(roomTypeId),
                            house: new Types.ObjectId(houseId),
                            ...args
                        }).save();
                    }
                    return {
                        ok: true,
                        error: null,
                        roomPrice: await extractRoomPrice.bind(
                            extractRoomPrice,
                            existRoomPrice
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
