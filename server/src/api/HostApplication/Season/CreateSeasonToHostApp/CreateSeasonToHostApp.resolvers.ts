import { InstanceType } from "typegoose";
import { HouseSchema } from "../../../../models/House";
import { extractSeason } from "../../../../models/merge/merge";
import { SeasonModel } from "../../../../models/Season";
import {
    CreateSeasonToHostAppMutationArgs,
    CreateSeasonToHostAppResponse
} from "../../../../types/graph";
import { Resolvers } from "../../../../types/resolvers";
import privateResolverForHostApp from "../../../../utils/privateResolverForHostApplication";

const resolvers: Resolvers = {
    Mutation: {
        CreateSeasonToHostApp: privateResolverForHostApp(
            async (
                _,
                { start, end, ...args }: CreateSeasonToHostAppMutationArgs,
                { req }
            ): Promise<CreateSeasonToHostAppResponse> => {
                const existingHouse: InstanceType<HouseSchema> = req.house;
                const validStartEnd = start <= end;
                const st = validStartEnd ? start : end;
                const ed = validStartEnd ? end : start;

                if (existingHouse) {
                    const season = new SeasonModel({
                        house: existingHouse._id,
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
