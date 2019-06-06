import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { UserSchema } from "../../../models/User";
import {
    SmsTemplate,
    UpdateSmsTemplateMutationArgs,
    UpdateSmsTemplateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateSmsTemplate: privateResolver(
            async (
                _,
                {
                    smsTemplateId,
                    houseId,
                    params
                }: UpdateSmsTemplateMutationArgs,
                ctx
            ): Promise<UpdateSmsTemplateResponse> => {
                try {
                    const {
                        user
                    }: { user: InstanceType<UserSchema> } = ctx.req;
                    const smsInfo = await SmsInfoModel.findOne({
                        house: new Types.ObjectId(houseId),
                        user: new Types.ObjectId(user._id)
                    });
                    if (!smsInfo) {
                        return {
                            ok: false,
                            error: "음... 망했다... SmsInfo가 null임 ㅜ",
                            smsTemplate: null
                        };
                    }
                    const idx = smsInfo.smsTemplates.findIndex(template => {
                        return (
                            smsTemplateId.toString() === template._id.toString()
                        );
                    });
                    const smsTemplate: SmsTemplate = {
                        ...smsInfo.smsTemplates[idx]
                    };
                    const updateArgs: SmsTemplate = {
                        ...smsTemplate,
                        ...params,
                        smsSendCase: params.smsSendCase && {
                            ...smsTemplate.smsSendCase,
                            ...params.smsSendCase
                        }
                    };
                    if (idx === -1) {
                        return {
                            ok: false,
                            error: "존재하지 않는 smsTemplateId",
                            smsTemplate: null
                        };
                    }
                    // index가 필요하군...
                    await SmsInfoModel.findOneAndUpdate(
                        {
                            house: new Types.ObjectId(houseId),
                            user: new Types.ObjectId(user._id),
                            "smsTemplates._id": new Types.ObjectId(
                                smsTemplateId
                            )
                        },
                        removeUndefined({
                            $set: {
                                [`smsTemplates.${idx}`]: updateArgs
                            }
                        })
                    );
                    return {
                        ok: true,
                        error: null,
                        smsTemplate: updateArgs
                    };
                    // 흐규흐규흐규흐규 업데이트문 테스트하긔 ㅎㅎ
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        smsTemplate: null
                    };
                }
            }
        )
    }
};
export default resolvers;
