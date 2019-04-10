import { Resolvers } from "../../../types/resolvers";
import {
    GetAllHouseToHostAppQueryArgs,
    GetAllHouseToHostAppResponse
} from "../../../types/graph";
import { UserModel } from "../../../models/User";
import { transformHouses } from "../../../models/merge/merge";

const resolvers: Resolvers = {
    Query: {
        /**
         * 호스트 숙소를 가져오는 쿼리임...
         */
        GetAllHouseToHostApp: async (
            _,
            { email, password }: GetAllHouseToHostAppQueryArgs
        ): Promise<GetAllHouseToHostAppResponse> => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return {
                        ok: false,
                        error: "No user found that email.",
                        houses: []
                    };
                }
                const checkPassword = await user.comparePassword(password);

                if (!checkPassword) {
                    return {
                        ok: false,
                        error: "유저가 존재하지 않습니다.",
                        houses: []
                    };
                }
                const houses = await transformHouses(user.houses);

                return {
                    ok: true,
                    error: null,
                    houses
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    houses: []
                };
            }
        }
    }
};
export default resolvers;
