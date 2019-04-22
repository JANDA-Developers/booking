import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { extractSeasonPrices } from "../../../models/merge/merge";
import {
    SeasonPriceModel,
    SeasonPriceSchema
} from "../../../models/SeasonPrice";
import {
    GetSeasonPriceQueryArgs,
    GetSeasonPriceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";
const resolvers: Resolvers = {
    Query: {
        GetSeasonPrice: privateResolver(
            async (
                _,
                { houseId }: GetSeasonPriceQueryArgs
            ): Promise<GetSeasonPriceResponse> => {
                try {
                    const house = await HouseModel.findById(houseId);
                    if (!house) {
                        return {
                            ok: false,
                            error: "존재하지 않는 House",
                            seasonPrices: []
                        };
                    }
                    const roomTypeIds = house.roomTypes.map(
                        roomTypeId => new ObjectId(roomTypeId)
                    );
                    const seasonPrices: Array<
                        InstanceType<SeasonPriceSchema>
                    > = await SeasonPriceModel.find({
                        roomType: { $in: roomTypeIds }
                    }).sort({ season: -1 });
                    return {
                        ok: true,
                        error: null,
                        seasonPrices: await extractSeasonPrices.bind(
                            extractSeasonPrices,
                            seasonPrices
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonPrices: []
                    };
                }
            }
        )
    }
};
export default resolvers;
