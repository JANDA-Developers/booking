import { extractSeason } from "../../../models/merge/merge";
import { SeasonModel } from "../../../models/Season";
import {
    UpdateSeasonMutationArgs,
    UpdateSeasonResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateSeason: privateResolver(
            async (
                _,
                { seasonId, ...args }: UpdateSeasonMutationArgs
            ): Promise<UpdateSeasonResponse> => {
                try {
                    const season = await SeasonModel.findById(seasonId);
                    if (!season) {
                        return {
                            ok: false,
                            error: "시즌이 존재하지 않습니다",
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
