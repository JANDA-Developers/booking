import * as _ from "lodash";
import { SmsInfoModel } from "../../../models/SmsInfo";
import {
    DeleteReceiverMutationArgs,
    DeleteReceiverResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolver: Resolvers = {
    Mutation: {
        DeleteReceiver: privateResolver(
            async (
                __,
                { smsInfoId, receiver }: DeleteReceiverMutationArgs
            ): Promise<DeleteReceiverResponse> => {
                try {
                    const smsInfo = await SmsInfoModel.findById(smsInfoId);
                    if (!smsInfo) {
                        return {
                            ok: false,
                            error: "존재하지 않는 smsInfoId"
                        };
                    }
                    _.pull(smsInfo.receivers, receiver);
                    await smsInfo.save();
                    return {
                        ok: true,
                        error: null
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
};
export default resolver;
