import { HouseModel } from "../../../models/House";
import { extractSeason } from "../../../models/merge/merge";
import { SeasonModel } from "../../../models/Season";
import {
    CreateSeasonMutationArgs,
    CreateSeasonResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateSeason: privateResolver(
            async (
                _,
                { houseId, start, end, ...args }: CreateSeasonMutationArgs
            ): Promise<CreateSeasonResponse> => {
                const existingHouse = await HouseModel.findById(houseId);
                const validStartEnd = start <= end;
                const st = validStartEnd ? start : end;
                const ed = validStartEnd ? end : start;

                if (existingHouse) {
                    const season = new SeasonModel({
                        house: houseId,
                        start: st,
                        end: ed,
                        ...args
                    });
                    await season.save();

                    return {
                        ok: true,
                        error: null,
                        season: await extractSeason(season)
                    };
                } else {
                    return {
                        ok: false,
                        error: "Nothing Match with HouseId",
                        season: null
                    };
                }
            }
        )
    }
};
export default resolvers;
