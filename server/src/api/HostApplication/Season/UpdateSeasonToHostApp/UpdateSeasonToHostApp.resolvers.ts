import { extractSeason } from "../../../../models/merge/merge";
import { SeasonModel } from "../../../../models/Season";
import {
    UpdateSeasonToHostAppMutationArgs,
    UpdateSeasonToHostAppResponse
} from "../../../../types/graph";
import { Resolvers } from "../../../../types/resolvers";
import { InstanceType } from "typegoose";
import { HouseSchema } from "../../../../models/House";
import privateResolverForHostApp from "../../../../utils/privateResolverForHostApplication";

const resolvers: Resolvers = {
    Mutation: {
        UpdateSeasonToHostApp: privateResolverForHostApp(
            async (
                _,
                { seasonId, ...args }: UpdateSeasonToHostAppMutationArgs,
                { req }
            ): Promise<UpdateSeasonToHostAppResponse> => {
                try {
                    const house: InstanceType<HouseSchema> = req.house;
                    const season = await SeasonModel.findById(seasonId);
                    if (!season) {
                        return {
                            ok: false,
                            error: "시즌이 존재하지 않습니다",
                            season: null
                        };
                    }
                    if (house._id !== season._id) {
                        console.log({
                            house: house._id,
                            season: season._id
                        });
                        return {
                            ok: false,
                            error: "선택한 숙소에 해당하는 시즌이 아닙니다.",
                            season: null
                        };
                    }
                    if (
                        new Date(args.start).getTime() >
                        new Date(args.end).getTime()
                    ) {
                        return {
                            ok: false,
                            error: "시작 날짜가 끝 날짜보다 더 뒤에있습니다.",
                            season: null
                        };
                    }
                    await season.update(
                        {
                            ...args
                        },
                        {
                            new: true
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        season: await extractSeason(season)
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
