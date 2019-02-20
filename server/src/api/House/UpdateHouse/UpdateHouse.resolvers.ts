import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/Merge";
import {
    UpdateHouseMutationArgs,
    UpdateHouseResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        UpdateHouse: privateResolver(
            async (
                _,
                args: UpdateHouseMutationArgs,
                { req }
            ): Promise<UpdateHouseResponse> => {
                const { user } = req;
                try {
                    // 1. userId와 houseId로 존재하는 객체인지 조회한다.
                    const existingHouse = await HouseModel.findOne({
                        _id: args.houseId,
                        user: new ObjectId(user._id)
                    });
                    if (existingHouse) {
                        await existingHouse.update({
                            ...args
                        });

                        const house = await extractHouse(existingHouse);
                        return {
                            ok: true,
                            error: null,
                            house
                        };
                    } else {
                        return {
                            ok: false,
                            error: "House is Not Exist!",
                            house: null
                        };
                    }
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
