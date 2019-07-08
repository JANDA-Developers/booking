import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import getDailyRoomTypePriceQuery from "../../../queries/getRoomTypeDatePricesQuery";
import {
    GetRoomTypeDatePricesQueryArgs,
    GetRoomTypeDatePricesResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForPublicAccess } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomTypeDatePrices: privateResolverForPublicAccess(
            async (
                _: any,
                { start, end, roomTypeId }: GetRoomTypeDatePricesQueryArgs,
                ctx: any
            ): Promise<GetRoomTypeDatePricesResponse> => {
                try {
                    const { house } = ctx.req;
                    const houseId = house._id;
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
                                (roomTypeId &&
                                    new Types.ObjectId(roomTypeId)) ||
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
        )
    }
};
export default resolvers;
