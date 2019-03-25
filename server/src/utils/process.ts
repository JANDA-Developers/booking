import { ObjectId } from "bson";
import { extractSeasonPrice } from "../models/merge/Merge";
import { SeasonPriceModel } from "../models/SeasonPrice";
import { Season, SeasonPrice } from "../types/graph";
import { dayOfYear } from "./mDate";

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

        // 해가 바뀌는지 연도를 확인하여 변경!
        if (compareStartEnd) {
            startDate.setFullYear(cur.getFullYear());
            endDate.setFullYear(cur.getFullYear());
        } else {
            if (compareStartCur) {
                startDate.setFullYear(cur.getFullYear());
                endDate.setFullYear(cur.getFullYear() + 1);
            }
            if (compareEndCur) {
                startDate.setFullYear(cur.getFullYear() - 1);
                endDate.setFullYear(cur.getFullYear());
            }
        }

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

export const compareSeason = (season1: Season, season2?: Season): boolean => {
    if (season2) {
        return season1._id.toString() === season2._id.toString();
    }
    return false;
};

export const convertSeasonToSeaeonPrice = async (
    season: Season,
    roomTypeId: string | ObjectId
): Promise<SeasonPrice | null> => {
    const seasonPrice = await SeasonPriceModel.findOne({
        roomType: new ObjectId(roomTypeId),
        season: new ObjectId(season._id)
    });
    if (seasonPrice) {
        const extractedSeasonPrice = await extractSeasonPrice(seasonPrice);
        return {
            ...extractedSeasonPrice,
            season
        };
    } else {
        return null;
    }
};
