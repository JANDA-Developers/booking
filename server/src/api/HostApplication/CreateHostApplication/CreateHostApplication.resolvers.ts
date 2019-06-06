import { Types } from "mongoose";
import { HostApplicationModel } from "../../../models/HostApplication";
import { HouseModel } from "../../../models/House";
import { extractHostApp } from "../../../models/merge/merge";
import {
    CreateHostApplicationMutationArgs,
    CreateHostApplicationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateHostApplication: async (
            _,
            { houseId, ...args }: CreateHostApplicationMutationArgs
        ): Promise<CreateHostApplicationResponse> => {
            try {
                const existingHouse = await HouseModel.findById(houseId);
                if (!existingHouse) {
                    return {
                        ok: false,
                        error: "존재하지 않는 HouseId",
                        hostApp: null
                    };
                }
                const hostApp = await new HostApplicationModel({
                    house: new Types.ObjectId(houseId),
                    user: new Types.ObjectId(existingHouse.user),
                    ...args
                }).save();
                // update house ㄱㄱ
                await existingHouse.update({
                    hostApplication: new Types.ObjectId(hostApp._id)
                });

                return {
                    ok: true,
                    error: null,
                    hostApp: await extractHostApp.bind(extractHostApp, hostApp)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    hostApp: null
                };
            }
        }
    }
};
export default resolvers;
