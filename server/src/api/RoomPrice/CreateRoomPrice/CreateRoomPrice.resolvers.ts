import { ObjectId } from "bson";
import { extractRoomPrice } from "../../../models/merge/Merge";
import { RoomPriceModel } from "../../../models/RoomPrice";
import {
    CreateRoomPriceMutationArgs,
    CreateRoomPriceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateRoomPrice: privateResolver(
            async (
                _,
                { roomTypeId, ...args }: CreateRoomPriceMutationArgs
            ): Promise<CreateRoomPriceResponse> => {
                try {
                    const roomPrice = new RoomPriceModel({
                        roomType: new ObjectId(roomTypeId),
                        ...args
                    });
                    // 날짜 중복 검사 해야됨...
                    const existingRoomPrice = await RoomPriceModel.find({
                        roomType: new ObjectId(roomTypeId),
                        date: new Date(args.date)
                    });
                    console.log({
                        existingRoomPrice
                    });
                    
                    if (existingRoomPrice.length === 0) {
                        await roomPrice.save();
                        return {
                            ok: false,
                            error: null,
                            roomPrice: await extractRoomPrice.bind(
                                extractRoomPrice, roomPrice
                            )
                        };
                    } else {
                        return {
                            ok: false,
                            error: "해당 날짜에 이미 RoomPrice가 존재합니다",
                            roomPrice: null
                        };
                    }
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
