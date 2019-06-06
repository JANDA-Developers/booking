import { Types } from "mongoose";
import { extractSmsInfo } from "../../../models/merge/merge";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { GetSmsInfoQueryArgs, GetSmsInfoResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetSmsInfo: privateResolver(
            async (
                _,
                { houseId }: GetSmsInfoQueryArgs
            ): Promise<GetSmsInfoResponse> => {
                const smsInfo = await SmsInfoModel.findOne({
                    house: new Types.ObjectId(houseId)
                });
                if (!smsInfo) {
                    return {
                        ok: false,
                        error: "SmsInfo가 존재하지 않음",
                        smsInfo: null
                    };
                }
                console.log(smsInfo);

                return {
                    ok: true,
                    error: null,
                    smsInfo: await extractSmsInfo.bind(extractSmsInfo, smsInfo)
                };
            }
        )
    }
};
export default resolvers;
