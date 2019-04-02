import { Resolvers } from "../../../types/resolvers";
import {
    CreateIntergrationMutationArgs,
    CreateIntergrationResponse
} from "../../../types/graph";
import { HouseModel } from "../../../models/House";
import createHostApplicationJWT from "../../../utils/createHostApplicationJWT";

const resolvers: Resolvers = {
    Mutation: {
        CreateIntergration: async (
            _,
            { houseId }: CreateIntergrationMutationArgs
        ): Promise<CreateIntergrationResponse> => {
            try {
                const house = await HouseModel.findById(houseId);
                if (!house) {
                    return {
                        ok: false,
                        error: "숙소가 존재하지 않습니다.",
                        token: null
                    };
                }
                const token = await createHostApplicationJWT(house._id);

                return {
                    ok: false,
                    error: null,
                    token
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};
export default resolvers;
