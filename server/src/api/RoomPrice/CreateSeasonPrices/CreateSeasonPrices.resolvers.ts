import { Types } from "mongoose";
import { extractSeasonPrices } from "../../../models/merge/merge";
import { SeasonModel } from "../../../models/Season";
import { SeasonPriceModel } from "../../../models/SeasonPrice";
import {
    CreateSeasonPricesMutationArgs,
    CreateSeasonPricesResponse,
    DailyPrice,
    DayOfWeekPrice
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateSeasonPrices: privateResolver(
            async (
                _,
                { seasonId, seasonPrices }: CreateSeasonPricesMutationArgs
            ): Promise<CreateSeasonPricesResponse> => {
                try {
                    const existingSeason = await SeasonModel.findById(seasonId);
                    if (!existingSeason) {
                        return {
                            ok: false,
                            error: "존재하지 않는 시즌 ID",
                            seasonPrices: []
                        };
                    }
                    const seasonObjId = new Types.ObjectId(seasonId);
                    const roomTypes = seasonPrices.map(seasonPriceInput => {
                        return new Types.ObjectId(seasonPriceInput.roomTypeId);
                    });
                    console.log({
                        roomTypes
                    });
                    const temp = seasonPrices.map((seasonPriceInput): {
                        season: Types.ObjectId;
                        roomType: Types.ObjectId;
                        defaultPrice: number;
                        dayOfWeekPrices: DayOfWeekPrice[];
                        dailyPriceList: DailyPrice[];
                    } => {
                        return {
                            season: seasonObjId,
                            roomType: new Types.ObjectId(
                                seasonPriceInput.roomTypeId
                            ),
                            defaultPrice: seasonPriceInput.defaultPrice,
                            dayOfWeekPrices: seasonPriceInput.dayOfWeekPrices,
                            dailyPriceList: seasonPriceInput.dailyPriceList
                        };
                    });
                    const result = await SeasonPriceModel.insertMany(temp);

                    // TODO: 여기 테스트하기!
                    return {
                        ok: true,
                        error: null,
                        seasonPrices: await extractSeasonPrices.bind(
                            extractSeasonPrices,
                            result
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonPrices: []
                    };
                }
            }
        )
    }
};
export default resolvers;
