import { extractSeasonPrice } from "../../../models/merge/merge";
import { SeasonPriceModel } from "../../../models/SeasonPrice";
import {
    AddDailyPricesMutationArgs,
    DailyPricesResponse,
    DeleteDailyPricesMutationArgs,
    UpdateSeasonPriceMutationArgs,
    UpdateSeasonPriceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateSeasonPrice: privateResolver(
            async (
                _,
                {
                    price,
                    applyDays,
                    seasonPriceId
                }: UpdateSeasonPriceMutationArgs
            ): Promise<UpdateSeasonPriceResponse> => {
                try {
                    const existingSeasonPrice = await SeasonPriceModel.findById(
                        seasonPriceId
                    );
                    if (!existingSeasonPrice) {
                        return {
                            ok: false,
                            error: "존재하지 않는 시즌 가격입니다.",
                            seasonPrice: null
                        };
                    }
                    await existingSeasonPrice.update(
                        {
                            price,
                            applyDays
                        },
                        {
                            new: true
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        seasonPrice: await extractSeasonPrice.bind(
                            extractSeasonPrice,
                            existingSeasonPrice
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonPrice: null
                    };
                }
            }
        ),
        AddDailyPrices: privateResolver(
            async (
                __: any,
                {
                    seasonPriceId,
                    dailyPriceList: dpl
                }: AddDailyPricesMutationArgs
            ): Promise<DailyPricesResponse> => {
                try {
                    const seasonPriceInstance = await SeasonPriceModel.findById(
                        seasonPriceId
                    );
                    if (!seasonPriceInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 SeasonPriceId",
                            dailyPriceList: []
                        };
                    }
                    const dailyPriceList = seasonPriceInstance.addDailyPrices(
                        dpl
                    );
                    await seasonPriceInstance.save();
                    return {
                        ok: true,
                        error: null,
                        dailyPriceList
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        dailyPriceList: []
                    };
                }
            }
        ),
        DeleteDailyPrices: privateResolver(
            async (
                __: any,
                { seasonPriceId, days }: DeleteDailyPricesMutationArgs
            ): Promise<DailyPricesResponse> => {
                try {
                    const seasonPriceInstance = await SeasonPriceModel.findById(
                        seasonPriceId
                    );
                    if (!seasonPriceInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 SeasonPriceId",
                            dailyPriceList: []
                        };
                    }
                    const dailyPriceList = seasonPriceInstance.deleteDailyPrices(
                        days
                    );
                    await seasonPriceInstance.save();
                    return {
                        ok: true,
                        error: null,
                        dailyPriceList
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        dailyPriceList: []
                    };
                }
            }
        )
    }
};
export default resolvers;
