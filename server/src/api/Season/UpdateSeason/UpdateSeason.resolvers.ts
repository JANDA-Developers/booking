import {Types} from "mongoose";
import {extractSeason} from "../../../models/merge/merge";
import {SeasonModel} from "../../../models/Season";
import {SeasonPriceModel} from "../../../models/SeasonPrice";
import {
  UpdateSeasonMutationArgs,
  UpdateSeasonResponse
} from "../../../types/graph";
import {Resolvers} from "../../../types/resolvers";
import {privateResolver} from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
  Mutation: {
    UpdateSeason: privateResolver(
      async (
        _,
        {seasonId, seasonPrices, ...args}: UpdateSeasonMutationArgs
      ): Promise<UpdateSeasonResponse> => {
        try {
          const season = await SeasonModel.findById(seasonId);
          if (!season) {
            return {
              ok: false,
              error: "시즌이 존재하지 않습니다",
              season: null
            };
          }
          if (new Date(args.start).getTime() > new Date(args.end).getTime()) {
            return {
              ok: false,
              error: "시작 날짜가 끝 날짜보다 더 뒤에있습니다.",
              season: null
            };
          }
          await season.update(
            {
              ...args
            },
            {
              new: true
            }
          );
          // [SeasonPrice!] ㄱㄱㄱ
          seasonPrices.forEach(async seasonPrice => {
            await SeasonPriceModel.findOneAndUpdate(
              {
                season: Types.ObjectId(seasonId),
                roomType: new Types.ObjectId(seasonPrice.roomTypeId)
              },
              {
                $set: {
                  defaultPrice: seasonPrice.defaultPrice,
                  dayOfWeekPrices: seasonPrice.dayOfWeekPrices
                }
              },
              {
                upsert: true
              }
            );
          });
          return {
            ok: true,
            error: null,
            season: await extractSeason(season)
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            season: null
          };
        }
      }
    )
  }
};
export default resolvers;
