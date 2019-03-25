import { betweenDateWithoutYear } from "../../../queries/seasonQueries";
import {
    GetSeasonWithDateQueryArgs,
    GetSeasonWithDateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetSeasonWithDate: privateResolver(
            async (
                _,
                { date, houseId }: GetSeasonWithDateQueryArgs
            ): Promise<GetSeasonWithDateResponse> => {
                try {
                    const aggregateSeason = await betweenDateWithoutYear(
                        date,
                        houseId
                    );
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
