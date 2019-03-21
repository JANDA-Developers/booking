import { DateRangeWithSeason, Season } from "../types/graph";
import { transformYMDToMD } from "./transformData";

const getIncludeSeasonWithDate = (
    date: Date,
    seasons: Season[]
): Season | undefined => {
    // 우선 해당 날짜에 들어가는 season을 가져온다...
    const v = transformYMDToMD(date);
    let result: Season | undefined;
    seasons.forEach(season => {
        const priority = season.priority;
        const start = transformYMDToMD(season.start);
        const end = transformYMDToMD(season.end);
        if (
            ((start <= end && start <= v && end >= v) ||
                (start >= end && (start <= v || end >= v))) &&
            ((result && result.priority < priority) || true)
        ) {
            result = season;
        }
    });
    return result;
};

// FIXME: 제발.. ㅜㅜㅜ
export const extractSeasonWithDateRange = (
    curDate: Date,
    endDate: Date,
    seasons: Season[]
): DateRangeWithSeason[] => {
    console.log({
        seasons
    });

    const addDate = (date: Date, cnt: number = 1) => {
        date.setDate(date.getDate() + cnt);
    };
    const result: DateRangeWithSeason[] = [];
    while (curDate.getTime() <= endDate.getTime()) {
        // curDate를 포함하는 시즌을 구함
        const curSeason = getIncludeSeasonWithDate(curDate, seasons);
        // curDate를 포함하는 시즌이 존재한다면
        if (curSeason) {
            // 가장 최근에 추가했던 season을 가져옴
            const tempSeason = result[result.length - 1];

            const curStartMD = transformYMDToMD(curSeason.start);
            const curEndMD = transformYMDToMD(curSeason.end);
            const curDateMD = transformYMDToMD(curDate);

            // 가장 최근에 추가한 season 이 없거나 tempSeason = curSeason 인 경우
            if (!tempSeason || tempSeason.season._id !== curSeason._id) {
                if (curStartMD <= curEndMD) {
                    if (curStartMD > curDateMD && curStartMD < curEndMD) {
                        curDate.setMonth(curSeason.start.getMonth());
                        curDate.setDate(curSeason.start.getDate());
                        console.log({
                            curSeason,
                            tempSeason
                        });
                    }
                } else {
                    
                }

                result.push({
                    start: new Date(curDate),
                    end: new Date(curDate),
                    season: curSeason
                });
            } else if (!tempSeason) {
            } else {
                // result의 마지막 배열에 들어있는 시즌 === 해당 날짜에 해당하는 시즌인 경우
                // start, end 를 바꿔줘야 함...
                if (tempSeason) {
                    // 여기서 안됨 ㅜㅜ
                    //
                    tempSeason.end = new Date(
                        curEndMD < curDateMD ? curSeason.end : curDate
                    );
                }
            }
        }
        addDate(curDate);
    }
    return result;
};
