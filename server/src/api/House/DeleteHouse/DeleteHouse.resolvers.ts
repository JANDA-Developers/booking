import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { UserModel } from "../../../models/User";
import {
    DeleteHouseMutationArgs,
    DeleteHouseResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteHouse: async (
            _,
            { _id }: DeleteHouseMutationArgs,
            { req }
        ): Promise<DeleteHouseResponse> => {
            const { user } = req;
            try {
                await HouseModel.findOneAndDelete({
                    _id,
                    user: new ObjectId(user._id)
                });
                await UserModel.updateOne(
                    {
                        _id: user._id
                    },
                    { $pull: { houses: new ObjectId(_id) } }
                );
                return {
                    ok: true,
                    error: null
                };
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
