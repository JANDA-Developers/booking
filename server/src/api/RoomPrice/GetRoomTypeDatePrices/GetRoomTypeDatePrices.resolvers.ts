import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import getDailyRoomTypePriceQuery from "../../../queries/getRoomTypeDatePricesQuery";
import {
    GetRoomTypeDatePricesQueryArgs,
    GetRoomTypeDatePricesResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomTypeDatePrices: async (
            _: any,
            { houseId, start, end, roomTypeId }: GetRoomTypeDatePricesQueryArgs
        ): Promise<GetRoomTypeDatePricesResponse> => {
            try {
                const houseInstance = HouseModel.findById(houseId);
                if (!houseInstance) {
                    return {
                        ok: false,
                        error: "존재하지 않는 HouseId",
                        roomTypeDatePrices: []
                    };
                }
                return {
                    ok: false,
                    error: null,
                    roomTypeDatePrices: await getDailyRoomTypePriceQuery({
                        houseId: new Types.ObjectId(houseId),
                        start: new Date(start),
                        end: new Date(end),
                        roomTypeId:
                            (roomTypeId && new Types.ObjectId(roomTypeId)) ||
                            undefined
                    })
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    roomTypeDatePrices: []
                };
            }
        }
    }
};
export default resolvers;
