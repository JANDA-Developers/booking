import { extractSeasonPrice } from "../../../models/merge/merge";
import { SeasonPriceModel } from "../../../models/SeasonPrice";
import {
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
        )
    }
};
export default resolvers;
