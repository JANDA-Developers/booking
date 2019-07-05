import { Types } from "mongoose";
import { SeasonPriceModel } from "../models/SeasonPrice";
import { SeasonPriceDate } from "../types/graph";
import {
    GetSeasonPipelineParams,
    getSesaonPricePipeLine
} from "./aggregationPipeline/seasonAggregation";

const getSeasonPriceDateList = async ({
    houseId,
    start,
    end,
    roomTypeId
}: GetSeasonPipelineParams & { roomTypeId?: Types.ObjectId }): Promise<
    SeasonPriceDate[]
> => {
    try {
        const seasonPriceList = await SeasonPriceModel.aggregate(
            getSesaonPricePipeLine({
                houseId,
                start,
                end,
                roomTypeId
            })
        );
        
        return seasonPriceList;
    } catch (error) {
        return [];
    }
};

export default getSeasonPriceDateList;
