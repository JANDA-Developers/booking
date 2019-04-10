import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import {
    GetAllSeasonQueryArgs,
    GetAllSeasonResponse
} from "../../../types/graph";
import { SeasonModel } from "../../../models/Season";
import { ObjectId } from "bson";
import { extractSeasons } from "../../../models/merge/merge";

const resolvers: Resolvers = {
    Query: {
        GetAllSeason: privateResolver(
            async (
                _,
                { houseId }: GetAllSeasonQueryArgs
            ): Promise<GetAllSeasonResponse> => {
                try {
                    const seasons = await SeasonModel.find({
                        house: new ObjectId(houseId)
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
