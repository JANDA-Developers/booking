import { ObjectId } from "bson";
import { RoomPriceModel } from "../../../models/RoomPrice";
import { SeasonModel } from "../../../models/Season";
import { SeasonPriceModel } from "../../../models/SeasonPrice";
import {
    DeleteSeasonMutationArgs,
    DeleteSeasonResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteSeason: privateResolver(
            async (
                _,
                { houseId, seasonId }: DeleteSeasonMutationArgs
            ): Promise<DeleteSeasonResponse> => {
                try {
                    const existingSeason = await SeasonModel.findOne({
                        _id: new ObjectId(seasonId),
                        house: new ObjectId(houseId)
                    });
                    if (existingSeason) {
                        await RoomPriceModel.deleteMany({
                            season: new ObjectId(seasonId)
                        });
                        await SeasonPriceModel.deleteMany({
                            season: new ObjectId(seasonId)
                        });
                        const priority = existingSeason.priority;
                        await SeasonModel.updateMany(
                            {
                                priority: {
                                    $gt: priority
                                }
                            },
                            {
                                $inc: {
                                    priority: -1
                                }
                            }
                        );
                        // priority 문제 해결해야한다...
                        await existingSeason.remove();
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "시즌이 존재하지 않습니다."
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
                return {
                    ok: false,
                    error: "Under Development"
                };
            }
        )
    }
};
export default resolvers;
