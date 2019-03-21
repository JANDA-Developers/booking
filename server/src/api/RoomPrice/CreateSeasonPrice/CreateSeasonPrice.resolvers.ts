import { ObjectId } from "bson";
import { extractSeasonPrice } from "../../../models/merge/Merge";
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
                    price,
                    applyDays
                }: CreateSeasonPriceMutationArgs
            ): Promise<CreateSeasonPriceResponse> => {
                try {
                    const existSeason = await SeasonModel.findById(seasonId);
                    const existRoomType = await RoomTypeModel.findById(
                        roomTypeId
                    );
                    if (existSeason && existRoomType) {
                        // TODO: 음...
                        const seasonPrice = new SeasonPriceModel({
                            roomType: new ObjectId(roomTypeId),
                            season: new ObjectId(seasonId),
                            price,
                            applyDays
                        });
                        await seasonPrice.save();
                        return {
                            ok: true,
                            error: null,
                            seasonPrice: await extractSeasonPrice.bind(extractSeasonPrice, seasonPrice)
                        };
                    } else {
                        return {
                            ok: false,
                            error: "시즌 또는 방 타입이 존재하지 않습니다.",
                            seasonPrice: null
                        };
                    }
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
