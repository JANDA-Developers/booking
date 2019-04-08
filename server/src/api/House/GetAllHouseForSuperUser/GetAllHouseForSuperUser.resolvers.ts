import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import { InstanceType } from "typegoose";
import { UserSchema } from "../../../models/User";
import { GetAllHouseForSuperUserResponse } from "../../../types/graph";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/merge";

const resolvers: Resolvers = {
    Query: {
        GetAllHouseForSuperUser: privateResolver(
            async (
                _,
                __,
                { req }
            ): Promise<GetAllHouseForSuperUserResponse> => {
                try {
                    const user: InstanceType<UserSchema> = req.user;
                    if (user.userRole !== "ADMIN") {
                        return {
                            ok: false,
                            error: "You are not SuperUser",
                            allHouse: []
                        };
                    }
                    const allHouse = await HouseModel.find().sort({
                        updatedAt: -1
                    });
                    return {
                        ok: true,
                        error: null,
                        allHouse: await Promise.all(
                            allHouse.map(async house => {
                                return await extractHouse.bind(
                                    extractHouse,
                                    house
                                );
                            })
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        allHouse: []
                    };
                }
            }
        )
    }
};
export default resolvers;
