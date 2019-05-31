import { Types } from "mongoose";
import { SmsInfoModel } from "../../../models/SmsInfo";
import {
    DeleteSmsTemplateMutationArgs,
    DeleteSmsTemplateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteSmsTemplate: privateResolver(
            async (
                _,
                { smsInfoId, smsTemplateId }: DeleteSmsTemplateMutationArgs
            ): Promise<DeleteSmsTemplateResponse> => {
                const smsInfoInstance = await SmsInfoModel.findById(smsInfoId);
                if (!smsInfoInstance) {
                    return {
                        ok: false,
                        error: "존재하지 않는 smsInfoID"
                    };
                }
                await SmsInfoModel.findByIdAndUpdate(smsInfoId, {
                    $pull: {
                        smsTemplates: { _id: new Types.ObjectId(smsTemplateId) }
                    }
                });
                return {
                    ok: true,
                    error: null
                };
            }
        )
    }
};
export default resolvers;
