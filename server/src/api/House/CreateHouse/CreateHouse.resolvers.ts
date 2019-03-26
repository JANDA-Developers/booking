import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/merge";
import { UserSchema } from "../../../models/User";
import {
    CreateHouseMutationArgs,
    CreateHouseResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateHouse: privateResolver(
            async (
                _,
                args: CreateHouseMutationArgs,
                { req }
            ): Promise<CreateHouseResponse> => {
                try {
                    const user: InstanceType<UserSchema> = req.user;
                    const house = new HouseModel({
                        ...args,
                        user: user._id
                    });
                    
                    await house.save();
                    await user.update({
                        $push: {
                            houses: house._id
                        }
                    });
                    return {
                        ok: true,
                        error: null,
                        house: await extractHouse(house)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        house: null
                    };
                }
            }
        )
    }
};

export default resolvers;
