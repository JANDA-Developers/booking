import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { extractRoomPrices } from "../../../models/merge/merge";
import { RoomPriceSchema } from "../../../models/RoomPrice";
import { RoomTypeModel } from "../../../models/RoomType";
import { getAllSeasons } from "../../../queries/queriesSeason";
import {
    GetAppliedPriceWithDateRangeQueryArgs,
    GetAppliedPriceWithDateRangeResponse,
    Season,
    SeasonPrice
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { getRoomPriceWithDateRange } from "../../../utils/priceFuncs";
import { privateResolver } from "../../../utils/privateResolvers";
import {
    compareSeason,
    convertSeasonToSeaeonPrice,
    findSeasonAndMutateSeason
} from "../../../utils/process";
import { ONE_DAY } from "../../../utils/variables";

const resolvers: Resolvers = {
    Query: {
        GetAppliedPriceWithDateRange: privateResolver(
            async (
                _,
                {
                    start: startDate,
                    end: endDate,
                    roomTypeId
                }: GetAppliedPriceWithDateRangeQueryArgs
            ): Promise<GetAppliedPriceWithDateRangeResponse> => {
                try {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    const existingRoomType = await RoomTypeModel.findById(
                        roomTypeId
                    );
                    if (!existingRoomType) {
                        return {
                            ok: false,
                            error:
                                "roomTypeId에 해당하는 RoomType을 찾을 수 없습니다",
                            seasonPrices: [],
                            roomPrices: []
                        };
                    }
                    const seasons = await getAllSeasons(
                        existingRoomType.house.toHexString()
                    );

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
                                // console.log(temp);

                                return temp;
                            }
                        )
                    )).filter(seasonPrice => seasonPrice);
                    // console.log({
                    //     result
                    // });

                    const roomPrices: Array<
                        InstanceType<RoomPriceSchema>
                    > = await getRoomPriceWithDateRange(
                        start,
                        end,
                        new Types.ObjectId(roomTypeId)
                    );

                    return {
                        ok: true,
                        error: null,
                        seasonPrices: result,
                        roomPrices: await extractRoomPrices.bind(
                            extractRoomPrices,
                            roomPrices
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonPrices: [],
                        roomPrices: []
                    };
                }
            }
        )
    }
};
export default resolvers;
