import { ObjectId } from "bson";
import { extractSeasonPrice } from "../../../../models/merge/merge";
import { RoomTypeModel } from "../../../../models/RoomType";
import { SeasonModel } from "../../../../models/Season";
import { SeasonPriceModel } from "../../../../models/SeasonPrice";
import {
    CreateSeasonPriceToHostAppMutationArgs,
    CreateSeasonPriceToHostAppResponse
} from "../../../../types/graph";
import { Resolvers } from "../../../../types/resolvers";
import privateResolverForHostApp from "../../../../utils/privateResolverForHostApplication";
import { InstanceType } from "typegoose";
import { HouseSchema } from "../../../../models/House";

const resolvers: Resolvers = {
    Mutation: {
        CreateSeasonPriceToHostApp: privateResolverForHostApp(
            async (
                _,
                {
                    seasonId,
                    roomTypeId,
                    price,
                    applyDays
                }: CreateSeasonPriceToHostAppMutationArgs,
                { req }
            ): Promise<CreateSeasonPriceToHostAppResponse> => {
                try {
                    const house: InstanceType<HouseSchema> = req.house;
                    const existSeason = await SeasonModel.findById(seasonId);
                    if (!existSeason) {
                        return {
                            ok: false,
                            error: "시즌이 존재하지 않습니다.",
                            seasonPrice: null
                        };
                    }
                    const existRoomType = await RoomTypeModel.findById(
                        roomTypeId
                    );
                    if (!existRoomType) {
                        return {
                            ok: false,
                            error: "방타입이 존재하지 않습니다.",
                            seasonPrice: null
                        };
                    }
                    if (new ObjectId(house._id).equals(existSeason.house)){
                        return {
                            ok: false,
                            error: "숙소id와 매칭된 시즌가격이 아닙니다. ",
                            seasonPrice: null
                        }
                    }
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
