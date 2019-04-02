import { Resolvers } from "../../../../types/resolvers";
import privateResolver from "../../../../utils/privateResolvers";
import {
    UpdateSeasonPriceToHostAppMutationArgs,
    UpdateSeasonPriceToHostAppResponse
} from "../../../../types/graph";
import { SeasonPriceModel } from "../../../../models/SeasonPrice";
import { extractSeasonPrice } from "../../../../models/merge/merge";

const resolvers: Resolvers = {
    Mutation: {
        UpdateSeasonPriceToHostApp: privateResolver(
            async (
                _,
                {
                    price,
                    applyDays,
                    seasonPriceId
                }: UpdateSeasonPriceToHostAppMutationArgs,
                { req }
            ): Promise<UpdateSeasonPriceToHostAppResponse> => {
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
                        seasonPrice: await extractSeasonPrice(
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
