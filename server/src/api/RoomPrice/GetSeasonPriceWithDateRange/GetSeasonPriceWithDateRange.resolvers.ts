import { transformSeasonPrice } from "../../../models/merge/Merge";
import { RoomTypeModel } from "../../../models/RoomType";
import { includeDateRangeWithOutYear } from "../../../queries/seasonQueries";
import {
    DateRangeWithSeasonPrice,
    GetSeasonPriceWithDateRangeQueryArgs,
    GetSeasonPriceWithDateRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import { extractSeasonWithDateRange } from "../../../utils/process";

const resolvers: Resolvers = {
    Query: {
        GetSeasonPriceWithDateRange: privateResolver(
            async (
                _,
                {
                    start: startDate,
                    end: endDate,
                    roomTypeId
                }: GetSeasonPriceWithDateRangeQueryArgs
            ): Promise<GetSeasonPriceWithDateRangeResponse> => {
                try {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    const existingRoomType = await RoomTypeModel.findById(
                        roomTypeId
                    );
                    if (existingRoomType) {
                        const seasons = await includeDateRangeWithOutYear(
                            start,
                            end,
                            existingRoomType.house.toHexString()
                        );

                        // TODO 여기부터 해보자... ㅜㅜ
                        console.log({
                            seasons
                        });
                        const dateRangeWithSeason = extractSeasonWithDateRange(
                            start,
                            end,
                            seasons
                        );
                        console.log({
                            dateRangeWithSeason
                        });
                        // 여기서 받은 타입들로 다시 ㄱㄱ
                        const result: any = (await Promise.all(
                            dateRangeWithSeason.map(
                                async (
                                    seasonWithDateRange
                                ): Promise<DateRangeWithSeasonPrice | null> => {
                                    if (seasonWithDateRange.season) {
                                        // 여기서 ㄱㄱ
                                        const sp = await transformSeasonPrice(
                                            undefined,
                                            {
                                                seasonId: seasonWithDateRange.season._id.toString(),
                                                roomTypeId: roomTypeId.toString()
                                            }
                                        );
                                        if (sp) {
                                            return {
                                                start:
                                                    seasonWithDateRange.start,
                                                end: seasonWithDateRange.end,
                                                seasonPrice: sp
                                            };
                                        } else {
                                            return null;
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                            )
                        )).filter(elem => elem);
                        return {
                            ok: true,
                            error: null,
                            seasonPriceWithDateRange: result
                        };
                    } else {
                        return {
                            ok: false,
                            error:
                                "roomTypeId와 일치하는 방 타입이 존재하지 않습니다.",
                            seasonPriceWithDateRange: []
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonPriceWithDateRange: []
                    };
                }
            }
        )
    }
};
export default resolvers;
