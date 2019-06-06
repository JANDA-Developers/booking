import { Context } from "graphql-yoga/dist/types";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { UserSchema } from "../../../models/User";
import {
    CreateSmsTemplateMutationArgs,
    CreateSmsTemplateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateSmsTemplate: privateResolver(
            async (
                _,
                { houseId, params }: CreateSmsTemplateMutationArgs,
                ctx: Context
            ): Promise<CreateSmsTemplateResponse> => {
                try {
                    const {
                        user
                    }: { user: InstanceType<UserSchema> } = ctx.req;
                    const houseInstance = await HouseModel.findOne({
                        _id: new Types.ObjectId(houseId),
                        user: new Types.ObjectId(user._id)
                    });
                    if (!houseInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 houseid",
                            smsTemplate: null
                        };
                    }
                    // TODO: 여기서 하면 될듯
                    const smsInfo = await SmsInfoModel.findOne({
                        house: new Types.ObjectId(houseId),
                        user: new Types.ObjectId(user._id)
                    });
                    if (!smsInfo) {
                        return {
                            ok: false,
                            error: "SmsInfo를 먼저 설정해주세요",
                            smsTemplate: null
                        };
                    }
                    const temp = {
                        ...params,
                        _id: new Types.ObjectId()
                    };
                    await smsInfo.update({
                        $push: {
                            smsTemplates: temp
                        }
                    });

                    return {
                        ok: true,
                        error: null,
                        smsTemplate: { ...temp, _id: temp._id.toHexString() }
                    };
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
