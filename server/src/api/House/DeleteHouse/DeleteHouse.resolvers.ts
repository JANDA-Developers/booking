import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import {
    DeleteHouseMutationArgs,
    DeleteHouseResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteHouse: async (
            _,
            args: DeleteHouseMutationArgs,
            { req }
        ): Promise<DeleteHouseResponse> => {
            const { user } = req;
            try {
                const deleteResult = (await HouseModel.findOneAndDelete({
                    ...args,
                    user: new ObjectId(user._id)
                }));
                console.log({
                    deleteResult
                });
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};

export default resolvers;
