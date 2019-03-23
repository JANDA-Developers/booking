import { getAllSeasons } from "../../../queries/seasonQueries";
import {
    GetSeasonWithDateRangeQueryArgs,
    GetSeasonWithDateRangeResponse,
    Season
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { dayOfYear } from "../../../utils/mDate";
import privateResolver from "../../../utils/privateResolvers";
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
                        console.log(
                            "----------------------------------------------------------------------------"
                        );

                        if (season) {
                            if (compareSeason(season, arr[arr.length - 1])) {
                                if (
                                    new Date(season.end).getTime() + ONE_DAY ===
                                    cur.getTime()
                                ) {
                                    arr[arr.length - 1].end = new Date(cur);
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
                    console.log(
                        "=========================================================================="
                    );

                    console.log({
                        arr
                    });

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

/**
 * cur에 해당하는 시즌들을 찾는다
 * 찾은 시즌에 start, end 를 cur로 변경
 * @param cur date 커서
 * @param seasons 전체 시즌 배열
 */
export const findSeasonAndMutateSeason = (
    cur: Date,
    seasons: Season[]
): Season | undefined => {
    let result: Season | undefined;
    seasons.forEach(season => {
        const startDate = new Date(season.start);
        const endDate = new Date(season.end);

        const startDayOfYear = dayOfYear(new Date(startDate));
        const endDayOfYear = dayOfYear(new Date(endDate));
        const curDayOfYear = dayOfYear(cur);
        const priority = season.priority;

        const compareStartCur = startDayOfYear <= curDayOfYear;
        const compareEndCur = endDayOfYear >= curDayOfYear;
        const compareStartEnd = startDayOfYear <= endDayOfYear;
        console.log({
            compareStartCur,
            compareEndCur,
            compareStartEnd
        });

        // 해가 바뀌는 범위들?
        if (compareStartEnd) {
            startDate.setFullYear(cur.getFullYear());
            endDate.setFullYear(cur.getFullYear());
        } else {
            if (compareStartCur || compareEndCur) {
                startDate.setFullYear(cur.getFullYear());
                endDate.setFullYear(cur.getFullYear() + 1);
            }
        }
        console.log({
            startDate,
            endDate
        });

        if (
            startDate.getTime() <= cur.getTime() &&
            cur.getTime() <= endDate.getTime()
        ) {
            if (result) {
                if (result.priority < priority) {
                    result = {
                        ...season,
                        start: new Date(cur),
                        end: new Date(cur)
                    };
                }
            } else {
                result = {
                    ...season,
                    start: new Date(cur),
                    end: new Date(cur)
                };
            }
        }
    });
    return result;
};

export const mutateSeasonStartEnd = (
    season: Season,
    end?: Date,
    start?: Date
): Season => {
    if (!(start || end)) {
        return season;
    }
    let appliedStart = start || new Date(season.start);
    let appliedEnd = end || new Date(season.end);
    if (dayOfYear(appliedStart) < dayOfYear(season.start)) {
        appliedStart = new Date(season.start);
    }
    if (dayOfYear(appliedEnd) < dayOfYear(season.end)) {
        appliedEnd = new Date(season.end);
    }
    return {
        ...season,
        start: appliedStart,
        end: appliedEnd
    };
};

export const compareSeason = (season1: Season, season2?: Season): boolean => {
    if (season2) {
        return season1._id.toString() === season2._id.toString();
    }
    return false;
};
