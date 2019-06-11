import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/merge";
import {
    UpdateHouseAppInfoFromUserRequestMutationArgs,
    UpdateHouseAppInfoFromUserRequestResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateHouseAppInfoFromUserRequest: privateResolver(
            async (
                _,
                {
                    houseId,
                    params
                }: UpdateHouseAppInfoFromUserRequestMutationArgs
            ): Promise<UpdateHouseAppInfoFromUserRequestResponse> => {
                try {
                    const house = await HouseModel.findById(houseId);
                    if (!house) {
                        return {
                            ok: false,
                            error: "존재하지 않는 HouseId",
                            house: null
                        };
                    }
                    await house.update({
                        $push: {
                            appInfoRequred: {
                                ...params,
                                userRequestedDate: new Date().toISOString()
                            }
                        }
                    });
                    return {
                        ok: true,
                        error: null,
                        house: await extractHouse.bind(extractHouse, house)
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
