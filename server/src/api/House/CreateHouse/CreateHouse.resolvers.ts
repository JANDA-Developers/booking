// import { getMongoManager } from "typeorm";
// import House from "../../../entities/House";
import {
    CreateHouseMutationArgs,
    CreateHouseResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        CreateHouse: privateResolver(
            async (
                _,
                args: CreateHouseMutationArgs,
                { req }
            ): Promise<CreateHouseResponse> => {
                // const mmg = getMongoManager();
                const { user } = req;

                if (!user) {
                    return {
                        ok: false,
                        error: "Auth first",
                        house: null
                    };
                }
                try {
                    // const newHouse = await mmg.save(
                    //     mmg.create(House, {
                    //         ...args,
                    //         user
                    //     })
                    // );
                    return {
                        ok: true,
                        error: null,
                        house: null
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
