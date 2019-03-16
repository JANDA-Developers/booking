import { ObjectId } from "bson";
import { SeasonModel } from "../../../models/Season";
import { between } from "../../../queries/queries";
import {
    GetMatchedSeasonWithDateRangeQueryArgs,
    GetMatchedSeasonWithDateRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetMatchedSeasonWithDateRange: privateResolver(
            async (
                _,
                { houseId, start, end }: GetMatchedSeasonWithDateRangeQueryArgs
            ): Promise<GetMatchedSeasonWithDateRangeResponse> => {
                try {
                    const season = await SeasonModel.find({
                        house: new ObjectId(houseId),
                        ...between("season", start)
                    });
                    if (season) {
                        // todo
                        console.log({
                            season
                        });
                        
                    } else {
                        // todo
                    }
                    return {
                        ok: false,
                        error: "UnderDevelop",
                        dateRangeWithSeason: []
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        dateRangeWithSeason: []
                    };
                }
            }
        )
    }
};
export default resolvers;
