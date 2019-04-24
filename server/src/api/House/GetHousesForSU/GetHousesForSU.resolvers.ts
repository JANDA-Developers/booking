import { InstanceType } from "typegoose";
import { HouseModel, HouseSchema } from "../../../models/House";
import { extractHouses } from "../../../models/merge/merge";
import {
    GetHousesForSuQueryArgs,
    GetHousesForSUResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForSU } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetHousesForSU: privateResolverForSU(
            async (
                _,
                args: GetHousesForSuQueryArgs
            ): Promise<GetHousesForSUResponse> => {
                try {
                    const count = args.count || 0;
                    const page = args.page || 1;
                    const rawHouses: Array<
                        InstanceType<HouseSchema>
                    > = await HouseModel.find()
                        .sort({
                            updatedAt: -1
                        })
                        .skip((page - 1) * count)
                        .limit(count);
                    const totalPage = Math.ceil(
                        (await HouseModel.countDocuments()) / count
                    );
                    const pageInfo = {
                        currentPage: page,
                        rowCount: count,
                        totalPage
                    };

                    return {
                        ok: true,
                        error: null,
                        houses: await extractHouses.bind(
                            extractHouses,
                            rawHouses
                        ),
                        pageInfo
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        houses: [],
                        pageInfo: null
                    };
                }
            }
        )
    }
};
export default resolvers;
