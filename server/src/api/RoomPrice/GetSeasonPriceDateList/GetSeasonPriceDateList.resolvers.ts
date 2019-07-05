import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { getSesaonPricePipeLine } from "../../../queries/aggregationPipeline/seasonAggregation";
import {
    GetSeasonPriceDateListQueryArgs,
    GetSeasonPriceDateListResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetSeasonPriceDateList: privateResolver(
            async (
                _,
                {
                    houseId,
                    start,
                    end,
                    roomTypeId
                }: GetSeasonPriceDateListQueryArgs
            ): Promise<GetSeasonPriceDateListResponse> => {
                try {
                    const houseInstance = await HouseModel.findById(houseId);
                    if (!houseInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 HouseId",
                            seasonPriceDateList: []
                        };
                    }
                    const seasonPriceDateList = await getSesaonPricePipeLine({
                        houseId: new Types.ObjectId(houseId),
                        start,
                        end,
                        roomTypeId:
                            (roomTypeId && new Types.ObjectId(roomTypeId)) ||
                            undefined
                    });
                    console.log(seasonPriceDateList);

                    return {
                        ok: false,
                        error: "개발중",
                        seasonPriceDateList: []
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonPriceDateList: []
                    };
                }
            }
        )
    }
};
export default resolvers;
