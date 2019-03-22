import { getAllSeasons } from "../../../queries/seasonQueries";
import {
    GetSeasonWithDateRangeQueryArgs,
    GetSeasonWithDateRangeResponse,
    Season
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetSeasonWithDateRange: privateResolver(
            async (
                _,
                { houseId, start, end }: GetSeasonWithDateRangeQueryArgs
            ): Promise<GetSeasonWithDateRangeResponse> => {
                try {
                    // 전체 시즌
                    const seasons = await getAllSeasons(houseId);

                    const cur = new Date(start);
                    const ed = new Date(end);

                    // start, end 를 돌면서...
                    const tmp = [];
                    while (cur.getTime() <= ed.getTime()) {
                        // cur 를 이용하여 seasons에서 하루하루 배열마다 시즌을 다 더해줌...
                        // 그리고 마지막에 이 배열들을 연결시켜서 합쳐버리기...
                        console.log({
                            tmp, seasons
                        });
                        
                        cur.setDate(cur.getDate() + 1);
                    }

                    return {
                        ok: true,
                        error: "개발중... ㅜㅜ",
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

export const isInclude = (cur: Date, seasons: Season[]) => {

    return [];
}