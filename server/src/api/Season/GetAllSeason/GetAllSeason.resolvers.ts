import { Types } from "mongoose";
import { extractSeasons } from "../../../models/merge/merge";
import { SeasonModel } from "../../../models/Season";
import {
    GetAllSeasonQueryArgs,
    GetAllSeasonResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllSeason: privateResolver(
            async (
                _,
                { houseId }: GetAllSeasonQueryArgs
            ): Promise<GetAllSeasonResponse> => {
                try {
                    const seasons = await SeasonModel.find({
                        house: new Types.ObjectId(houseId)
                    });
                    return {
                        ok: true,
                        error: null,
                        seasons: await extractSeasons(seasons)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasons: []
                    };
                }
            }
        )
    }
};
export default resolvers;
