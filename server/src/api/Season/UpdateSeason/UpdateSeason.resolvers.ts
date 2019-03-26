import { ObjectId } from "bson";
import { extractSeason } from "../../../models/merge/merge";
import { SeasonModel } from "../../../models/Season";
import {
    UpdateSeasonMutationArgs,
    UpdateSeasonResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateSeason: privateResolver(
            async (
                _,
                {
                    seasonId,
                    houseId,
                    dateRange,
                    ...args
                }: UpdateSeasonMutationArgs
            ): Promise<UpdateSeasonResponse> => {
                try {
                    let updateQuery = args;
                    if (dateRange) {
                        // 중복검사가 필요함 ㅎㅎ
                        // const newDateRange = new DateRange(dateRange, {
                        //     ignoreYear: true
                        // });

                        updateQuery = {
                            ...updateQuery,
                            ...dateRange
                        };
                    }
                    const updatedSeason = await SeasonModel.updateOne(
                        {
                            _id: new ObjectId(seasonId)
                        },
                        updateQuery,
                        {
                            new: true
                        }
                    );
                    return {
                        ok: false,
                        error: "Under Development",
                        season: await extractSeason(updatedSeason)
                    };
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
