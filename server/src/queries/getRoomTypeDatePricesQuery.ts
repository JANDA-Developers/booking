import _ from "lodash";
import { Types } from "mongoose";
import { transformRoomType } from "../models/merge/merge";
import { SeasonModel } from "../models/Season";
import { RoomTypeDatePrice } from "../types/graph";
import {
    getPricePipeline,
    GetSeasonPipelineParams
} from "./aggregationPipeline/seasonAggregation";

const getDailyRoomTypePriceQuery = async ({
    houseId,
    start,
    end,
    roomTypeId
}: GetSeasonPipelineParams & { roomTypeId?: Types.ObjectId }): Promise<
    RoomTypeDatePrice[]
> => {
    const roomTypeDatePrices: Array<{
        _id: string; // roomTypeId
        datePrices: Array<{
            date: Date;
            price: number;
        }>;
    }> = await SeasonModel.aggregate(
        getPricePipeline({
            houseId: new Types.ObjectId(houseId),
            start: new Date(start),
            end: new Date(end),
            roomTypeId:
                (roomTypeId && new Types.ObjectId(roomTypeId)) || undefined
        })
    );
    console.log(roomTypeDatePrices);

    return await Promise.all(
        await roomTypeDatePrices.map(
            async (roomTypeDatePrice): Promise<RoomTypeDatePrice> => {
                return {
                    roomType: await transformRoomType.bind(
                        transformRoomType,
                        roomTypeDatePrice._id
                    ),
                    datePrices: roomTypeDatePrice.datePrices
                };
            }
        )
    );
};

export default getDailyRoomTypePriceQuery;
