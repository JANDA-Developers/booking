import { Types } from "mongoose";
import { SeasonModel } from "../../../models/Season";
import {
    CreateSeasonPricesMutationArgs,
    CreateSeasonPricesResponse
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
                    const roomTypes = seasonPrices.map(seasonPriceInput => {
                        return new Types.ObjectId(seasonPriceInput.roomTypeId);
                    });
                    console.log({
                        roomTypes
                    });

                    return {
                        ok: false,
                        error: "개발 중",
                        seasonPrices: []
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
