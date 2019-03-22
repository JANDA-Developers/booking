import { getAllSeasons } from "../../../queries/seasonQueries";
import {
    GetSeasonWithDateRangeQueryArgs,
    GetSeasonWithDateRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import { extractSeasonWithDateRange } from "../../../utils/process";

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

                    const newSeasons = seasons.map(season => {
                        
                        return season;
                    });
                    console.log({
                        newSeasons
                    });

                    const curDate = new Date(start);
                    const endDate = new Date(end);
                    console.log({
                        seasons
                    });
                    const result = extractSeasonWithDateRange(
                        curDate,
                        endDate,
                        seasons
                    );
                    console.log({
                        result
                    });
                    return {
                        ok: true,
                        error: null,
                        dateRangeWithSeason: result
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

// const getIncludeSeasonWithDate = (
//     date: Date,
//     seasons: Season[]
// ): Season | undefined => {
//     // 우선 해당 날짜에 들어가는 season을 가져온다...
//     const v = transformYMDToMD(date);
//     let result: Season | undefined;
//     seasons.forEach(season => {
//         const priority = season.priority;
//         const start = transformYMDToMD(season.start);
//         const end = transformYMDToMD(season.end);
//         if (
//             ((start <= end && start <= v && end >= v) ||
//                 (start >= end && (start <= v || end >= v))) &&
//             ((result && result.priority < priority) || true)
//         ) {
//             result = season;
//         }
//     });
//     return result;
// };

// const extractSeasonWithDate = (
//     curDate: Date,
//     endDate: Date,
//     seasons: Season[]
// ): DateRangeWithSeason[] => {
//     const addDate = (date: Date, cnt: number = 1) => {
//         date.setDate(date.getDate() + cnt);
//     };
//     const result: DateRangeWithSeason[] = [];
//     while (curDate.getTime() <= endDate.getTime()) {
//         const curSeason = getIncludeSeasonWithDate(curDate, seasons);
//         if (curSeason) {
//             // 해당 날짜에 해당하는 시즌이 존재할 때
//             const tempSeason = result[result.length - 1];
//             // 그 존재하는 시즌과 result의 마지막 배열에 들어있는 시즌 비교
//             if (!tempSeason || tempSeason.season._id !== curSeason._id) {
//                 result.push({
//                     start: new Date(curDate),
//                     end: new Date(curDate),
//                     season: curSeason
//                 });
//             } else {
//                 // result의 마지막 배열에 들어있는 시즌 === 해당 날짜에 해당하는 시즌인 경우
//                 // start, end 를 바꿔줘야 함...
//                 const foundDateRangeWithSeason = result.find(
//                     (value): boolean => {
//                         return value.season._id === tempSeason.season._id;
//                     }
//                 );
//                 if (foundDateRangeWithSeason) {
//                     console.log({
//                         curDate,
//                         resultLastEnd: foundDateRangeWithSeason.end
//                     });

//                     foundDateRangeWithSeason.end = new Date(curDate);
//                 }
//             }
//         }
//         addDate(curDate);
//     }
//     return result;
// };
