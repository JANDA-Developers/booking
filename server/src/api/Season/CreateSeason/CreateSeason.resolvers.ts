import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { extractSeason } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import { SeasonModel } from "../../../models/Season";
import {
    SeasonPriceModel,
    SeasonPriceSchema
} from "../../../models/SeasonPrice";
import {
    CreateSeasonMutationArgs,
    CreateSeasonResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateSeason: privateResolver(
            async (
                _,
                { houseId, start, end, ...args }: CreateSeasonMutationArgs
            ): Promise<CreateSeasonResponse> => {
                try {
                    const existingHouse = await HouseModel.findById(houseId);
                    const validStartEnd = start <= end;
                    const st = validStartEnd ? start : end;
                    const ed = validStartEnd ? end : start;

                    if (!existingHouse) {
                        return {
                            ok: false,
                            error: "Nothing Match with HouseId",
                            season: null
                        };
                    }
                    const season = await new SeasonModel({
                        house: houseId,
                        start: st,
                        end: ed,
                        ...args
                    }).save();
                    // seasonPrice 생성
                    const roomTypes = await RoomTypeModel.find({
                        house: new Types.ObjectId(houseId)
                    });
                    const seasonPriceInstances: Array<
                        InstanceType<SeasonPriceSchema>
                    > = roomTypes.map(
                        (roomType): InstanceType<SeasonPriceSchema> => {
                            return new SeasonPriceModel({
                                season: new Types.ObjectId(season._id),
                                roomType: new Types.ObjectId(roomType._id),
                                defaultPrice: roomType.defaultPrice
                            });
                        }
                    );
                    const result = await SeasonPriceModel.insertMany(
                        seasonPriceInstances
                    );
                    console.log({
                        result
                    });

                    return {
                        ok: true,
                        error: null,
                        season: await extractSeason(season)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        season: null
                    };
                }
            }
        )
    }
};
export default resolvers;
