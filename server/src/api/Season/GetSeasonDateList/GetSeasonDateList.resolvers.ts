import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import getSeasonDateList from "../../../queries/getSeasonDateListQuery";
import {
    GetSeasonDateListQueryArgs,
    GetSeasonDateListResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetSeasonToDateList: privateResolver(
            async (
                _,
                { houseId, start, end }: GetSeasonDateListQueryArgs
            ): Promise<GetSeasonDateListResponse> => {
                try {
                    const houseInstance = await HouseModel.findById(houseId);
                    if (!houseInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 HouseId",
                            seasonDateList: []
                        };
                    }
                    const seasonDateList = await getSeasonDateList({
                        houseId: new Types.ObjectId(houseId),
                        start: new Date(start),
                        end: new Date(end)
                    });
                    return {
                        ok: true,
                        error: null,
                        seasonDateList
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        seasonDateList: []
                    };
                }
            }
        )
    }
};
export default resolvers;
