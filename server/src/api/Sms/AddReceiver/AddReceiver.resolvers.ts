import { InstanceType } from "typegoose";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { UserSchema } from "../../../models/User";
import { Target, VerificationModel } from "../../../models/Verification";
import {
    AddReceiverMutationArgs,
    AddReceiverResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        AddReceiver: privateResolver(
            async (
                _,
                { smsInfoId, receiver }: AddReceiverMutationArgs,
                ctx
            ): Promise<AddReceiverResponse> => {
                try {
                    const {
                        user
                    }: { user: InstanceType<UserSchema> } = ctx.req;
                    const smsInfo = await SmsInfoModel.findById(smsInfoId);
                    if (!smsInfo) {
                        return {
                            ok: false,
                            error: "존재하지 않는 SmsInfoId",
                            receiver: []
                        };
                    }
                    const verification = await VerificationModel.findOne({
                        payload: (receiver as string).replace("-", ""),
                        target: Target.PHONE
                    });
                    // 인증 자체가 존재하지 않거나
                    // 인증은 존재함 but verified === false
                    if (!(verification && verification.verified)) {
                        return {
                            ok: false,
                            error: "인증 안되어있음...",
                            receiver: []
                        };
                    }
                    if (!verification.user.equals(user._id)) {
                        return {
                            ok: false,
                            error: "인증할 수 없는 번호입니다.",
                            receiver: []
                        };
                    }
                    await smsInfo.addReceiver(receiver);
                    return {
                        ok: true,
                        error: null,
                        receiver: smsInfo.receivers
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        receiver: []
                    };
                }
            }
        )
    }
};
export default resolvers;
