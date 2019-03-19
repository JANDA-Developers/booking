import { betweenDateWithoutYear } from "../../../queries/seasonQueries";
import {
    GetMatchedSeasonWithDateQueryArgs,
    GetMatchedSeasonWithDateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetMatchedSeasonWithDate: privateResolver(
            async (
                _,
                { date, houseId }: GetMatchedSeasonWithDateQueryArgs
            ): Promise<GetMatchedSeasonWithDateResponse> => {
                try {
                    const aggregateSeason = await betweenDateWithoutYear(date, houseId)
                    if (aggregateSeason) {
                        return {
                            ok: true,
                            error: null,
                            season: aggregateSeason
                        };
                    } else {
                        return {
                            ok: false,
                            error: "Season is not Exist",
                            season: null
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        season: null
                    };
                }
            }
        )
    }
};
export default resolvers;
