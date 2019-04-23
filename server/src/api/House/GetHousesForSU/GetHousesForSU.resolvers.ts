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
                { page, count }: GetHousesForSuQueryArgs
            ): Promise<GetHousesForSUResponse> => {
                try {
                    const rawHouses: Array<
                        InstanceType<HouseSchema>
                    > = await HouseModel.find()
                        .sort({
                            updatedAt: -1
                        })
                        .limit(count || 0)
                        .skip((page || 1) * (count || 1));
                    return {
                        ok: true,
                        error: null,
                        houses: await extractHouses.bind(
                            extractHouses,
                            rawHouses
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        houses: []
                    };
                }
            }
        )
    }
};
export default resolvers;
