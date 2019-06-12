import { Types } from "mongoose";
import { HouseConfigModel } from "../../../models/HouseConfig";
import { extractHouseConfig } from "../../../models/merge/merge";
import {
    UpdateHouseConfigMutationArgs,
    UpdateHouseConfigResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateHouseConfig: privateResolver(
            async (
                _,
                params: UpdateHouseConfigMutationArgs
            ): Promise<UpdateHouseConfigResponse> => {
                try {
                    const { houseId, pollingPeriod } = params;
                    const existingHouseConfig = await HouseConfigModel.findOne({
                        house: new Types.ObjectId(houseId)
                    });

                    if (existingHouseConfig) {
                        await existingHouseConfig.update({
                            $set: {
                                pollingPeriod
                            }
                        });

                        return {
                            ok: true,
                            error: null,
                            houseConfig: await extractHouseConfig.bind(
                                extractHouseConfig,
                                existingHouseConfig
                            )
                        };
                    } else {
                        return {
                            ok: false,
                            error: "존재하지 않는 하우스 아이디",
                            houseConfig: null
                        };
                    }
                } catch (err) {
                    return {
                        ok: false,
                        error: err.message,
                        houseConfig: null
                    };
                }
            }
        )
    }
};

export default resolvers;
