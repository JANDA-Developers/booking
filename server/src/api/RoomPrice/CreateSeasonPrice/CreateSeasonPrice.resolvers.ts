import { ObjectId } from "bson";
import { extractSeasonPrice } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import { SeasonModel } from "../../../models/Season";
import { SeasonPriceModel } from "../../../models/SeasonPrice";
import {
    CreateSeasonPriceMutationArgs,
    CreateSeasonPriceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateSeasonPrice: privateResolver(
            async (
                _,
                {
                    seasonId,
                    roomTypeId,
                    defaultPrice,
                    dayOfWeekPrices
                }: CreateSeasonPriceMutationArgs
            ): Promise<CreateSeasonPriceResponse> => {
                try {
                    const existSeason = await SeasonModel.findById(seasonId);
                    const existRoomType = await RoomTypeModel.findById(
                        roomTypeId
                    );
                    if (!(existSeason && existRoomType)) {
                        return {
                            ok: false,
                            error: "시즌 또는 방 타입이 존재하지 않습니다.",
                            seasonPrice: null
                        };
                    }
                    const existSeasonPrice = await SeasonPriceModel.findOne({
                        roomType: new ObjectId(roomTypeId),
                        season: new ObjectId(seasonId)
                    });
                    if (existSeasonPrice) {
                        return {
                            ok: false,
                            error: "이미 가격이 존재합니다",
                            seasonPrice: null
                        };
                    }
                    const seasonPrice = new SeasonPriceModel({
                        roomType: new ObjectId(roomTypeId),
                        season: new ObjectId(seasonId),
                        defaultPrice,
                        dayOfWeekPrices
                    });
                    await seasonPrice.save();
                    return {
                        ok: true,
                        error: null,
                        seasonPrice: await extractSeasonPrice.bind(
                            extractSeasonPrice,
                            seasonPrice
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonPrice: null
                    };
                }
            }
        )
    }
};
export default resolvers;
