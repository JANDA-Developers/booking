import { Types } from "mongoose";
import { extractSmsHistories } from "../../../models/merge/merge";
import { SmsHistoryModel } from "../../../models/SmsHistory";
import { SmsInfoModel } from "../../../models/SmsInfo";
import {
    GetSmsHistoryQueryArgs,
    GetSmsHistoryResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetSmsHistory: privateResolver(
            async (
                _,
                { smsInfoId, count, page }: GetSmsHistoryQueryArgs
            ): Promise<GetSmsHistoryResponse> => {
                try {
                    const smsInfoInstance = await SmsInfoModel.findById(
                        smsInfoId
                    );
                    if (!smsInfoInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 smsInfoId",
                            pageInfo: {
                                currentPage: 0,
                                rowCount: 0,
                                totalPage: 0
                            },
                            smsHistories: []
                        };
                    }
                    const p = page || 1;
                    const c = count || 1;

                    const smsHistories = await SmsHistoryModel.find({
                        smsInfo: new Types.ObjectId(smsInfoId)
                    })
                        .sort({ createdAt: -1 })
                        .skip((p - 1) * c)
                        .limit(c);

                    const totalPage = Math.ceil(
                        (await SmsHistoryModel.countDocuments({
                            smsInfo: new Types.ObjectId(smsInfoId)
                        })) / c
                    );
                    return {
                        ok: true,
                        error: null,
                        pageInfo: {
                            currentPage: p,
                            rowCount: c,
                            totalPage
                        },
                        smsHistories: await extractSmsHistories.bind(
                            extractSmsHistories,
                            smsHistories
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        smsHistories: [],
                        pageInfo: {
                            currentPage: 0,
                            rowCount: 0,
                            totalPage: 0
                        }
                    };
                }
            }
        )
    }
};
export default resolvers;
