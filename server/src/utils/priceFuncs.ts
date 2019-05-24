import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { GuestSchema } from "../models/Guest";
import { RoomPriceModel, RoomPriceSchema } from "../models/RoomPrice";
import { RoomTypeModel } from "../models/RoomType";
import { SeasonModel, SeasonSchema } from "../models/Season";
import { SeasonPriceModel, SeasonPriceSchema } from "../models/SeasonPrice";
import { getAllSeasons } from "../queries/queriesSeason";
import { DailyPrice } from "../types/dailyPrice";
import { DayOfWeekPrice, Season, SeasonPrice } from "../types/graph";
import { isIncludeDayOfWeek } from "./applyDays";
import { asyncForEach } from "./etc";
import { getDateArr } from "./mDate";
import {
    compareSeason,
    convertSeasonToSeaeonPrice,
    findSeasonAndMutateSeason
} from "./process";
import { ONE_DAY } from "./variables";

export const getPriceWithDateRange = async (
    roomTypeId: Types.ObjectId,
    startDate: Date,
    endDate: Date
): Promise<SeasonPrice[]> => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const existingRoomType = await RoomTypeModel.findById(roomTypeId);
    if (!existingRoomType) {
        return [];
    }
    const seasons = await getAllSeasons(existingRoomType.house.toHexString());

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
                    new Date(arrLastElem.end).getTime() + ONE_DAY ===
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

        cur.setDate(cur.getDate() + 1);
    }
    const result: any = (await Promise.all(
        arr.map(
            async (season): Promise<SeasonPrice | null> => {
                // TODO: 여기부터 ㄱㄱ ㅜ
                const temp = await convertSeasonToSeaeonPrice(
                    season,
                    roomTypeId
                );
                return temp;
            }
        )
    )).filter(seasonPrice => seasonPrice);

    return result;
};

export const getPriceFromSeasonPrices = async (
    guestInstance: InstanceType<GuestSchema>
): Promise<DailyPrice[]> => {
    const dates = getDateArr(guestInstance.start, guestInstance.end);
    const roomType: Types.ObjectId = guestInstance.roomType;
    const result: DailyPrice[] = [];
    await asyncForEach(dates, async date => {
        const season = await getSeason(date);
        const seasonPrice = await SeasonPriceModel.findOne({
            season: new Types.ObjectId(season!._id),
            roomType
        });
        if (!seasonPrice) {
            return;
        }
        // 요일별 가격에 걸려있는지 확인
        const prices = getPriceInApplyDaysArr(date, { ...seasonPrice });
        result.push(prices);
    });

    return result;
};

/**
 * 시즌 가격 구함...
 * @param roomTypeInstance 방타입 객체
 * @param date 날짜
 */
export const getSeasonPriceWithDateAndRoomType = async (
    roomTypeId: Types.ObjectId,
    defaultPrice: number,
    date: Date
): Promise<DailyPrice> => {
    const seasonInstance = await getSeason(date);
    const defaultDailyPrice = {
        date,
        price: defaultPrice,
        suggestedPrice: defaultPrice
    };
    if (!seasonInstance) {
        return defaultDailyPrice;
    }
    const seasonPrice = await getSeasonPrice(
        roomTypeId,
        new Types.ObjectId(seasonInstance._id)
    );
    if (!seasonPrice) {
        return defaultDailyPrice;
    }
    return getPriceInApplyDaysArr(date, {
        dayOfWeekPrices: seasonPrice.dayOfWeekPrices,
        defaultPrice: seasonPrice.defaultPrice,
        realPrice: defaultPrice
    });
};

export const getPriceInApplyDaysArr = (
    date: Date,
    {
        dayOfWeekPrices,
        defaultPrice,
        realPrice
    }: {
        dayOfWeekPrices: DayOfWeekPrice[];
        defaultPrice: number;
        realPrice?: number;
    }
): DailyPrice => {
    const dayOfWeek = 1 << date.getDay();
    let result: DailyPrice = {
        date,
        price: defaultPrice,
        suggestedPrice: defaultPrice
    };
    dayOfWeekPrices.forEach(dayOfWeekPrice => {
        // applyDays로 확인 ㄱㄱ
        const isInclude = isIncludeDayOfWeek(
            dayOfWeek,
            dayOfWeekPrice.applyDays
        );
        const price = dayOfWeekPrice.price;
        if (isInclude) {
            result = {
                date,
                price,
                suggestedPrice: price
            };
        }
    });
    if (realPrice) {
        result.price = realPrice;
    }
    return result;
};

export const getSeason = async (
    date: Date
): Promise<InstanceType<SeasonSchema> | null> => {
    return await SeasonModel.findOne({
        start: {
            $lte: date
        },
        end: {
            $gte: date
        }
    }).sort({ priority: -1 });
};

export const getSeasonPrice = async (
    roomTypeId: Types.ObjectId,
    seasonId: Types.ObjectId
): Promise<InstanceType<SeasonPriceSchema> | null> => {
    const seasonPrice = await SeasonPriceModel.findOne({
        season: new Types.ObjectId(seasonId),
        roomType: new Types.ObjectId(roomTypeId)
    });
    return seasonPrice;
};

// --------------------------------------------------------------------------------
//    이하 SpecificPrice

export const getRoomPriceWithDateRange = async (
    start: Date,
    end: Date,
    roomTypeId: Types.ObjectId
): Promise<Array<InstanceType<RoomPriceSchema>>> =>
    await RoomPriceModel.find({
        roomType: roomTypeId,
        date: {
            $gte: start,
            $lte: end
        }
    }).sort({ date: 1 });
