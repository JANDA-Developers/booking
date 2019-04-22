import { getAllSeasons } from "../../../queries/seasonQueries";
import {
    GetSeasonWithDateRangeQueryArgs,
    GetSeasonWithDateRangeResponse,
    Season
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";
import {
    compareSeason,
    findSeasonAndMutateSeason
} from "../../../utils/process";
import { ONE_DAY } from "../../../utils/variables";

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
                    const arr: Season[] = [];
                    while (cur.getTime() <= ed.getTime()) {
                        // seasons 에서 cur에 해당하는 season을 찾는다.
                        const season = findSeasonAndMutateSeason(cur, seasons);
                        const arrLastElem = arr[arr.length - 1];

                        if (season) {
                            if (compareSeason(season, arrLastElem)) {
                                if (
                                    arrLastElem &&
                                    new Date(arrLastElem.end).getTime() +
                                        ONE_DAY ===
                                        cur.getTime()
                                ) {
                                    arr[arr.length - 1].end = new Date(cur);
                                } else {
                                    arr.push(season);
                                }
                            } else {
                                arr.push(season);
                            }
                        }

                        // _id가 같다면 => arr의 마지막 배열의 시즌의 end값을 new Date(cur)로 변경한다.
                        // _id가 다르다면 => arr의 마지막 배열에 season을 삽입한다 (start, end 둘다 cur로 변경)
                        // season이 존재하지 않는다면 그냥 넘어간다.

                        cur.setDate(cur.getDate() + 1);
                    }
                    return {
                        ok: true,
                        error: null,
                        seasons: arr
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
