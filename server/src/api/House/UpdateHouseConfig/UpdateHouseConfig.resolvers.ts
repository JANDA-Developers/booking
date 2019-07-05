import {Types} from "mongoose";
import {
  UpdateHouseConfigMutationArgs,
  UpdateHouseConfigResponse
} from "../../../types/graph";
import {Resolvers} from "../../../types/resolvers";
import {privateResolver} from "../../../utils/privateResolvers";
import {removeUndefined} from "../../../utils/objFuncs";
import {HouseModel} from "../../../models/House";

const resolvers: Resolvers = {
  Mutation: {
    UpdateHouseConfig: privateResolver(
      async (
        _,
        updateParams: UpdateHouseConfigMutationArgs
      ): Promise<UpdateHouseConfigResponse> => {
        try {
          const {houseId, params} = updateParams;
          if (!params) {
            throw Error("UpdateHouseConfig no params");
          }
          const {assigTimeline, pollingPeriod} = params;
          const existingHouse = await HouseModel.findOne({
            _id: new Types.ObjectId(houseId)
          });

          if (existingHouse) {
            const updateParam = removeUndefined({
              pollingPeriod,
              assigTimeline
            });

            await existingHouse.update({
              $set: {
                houseConfig: {...existingHouse.houseConfig, ...updateParam}
              }
            });

            return {
              ok: true,
              error: null,
              houseConfig: null
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
