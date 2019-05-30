import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { VerificationModel } from "../../../models/Verification";
import {
    RegisterSenderMutationArgs,
    RegisterSenderResponse,
    SmsSender
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        RegisterSender: privateResolver(
            async (
                _,
                { houseId, sender }: RegisterSenderMutationArgs,
                ctx
            ): Promise<RegisterSenderResponse> => {
                try {
                    const { user } = ctx.req;
                    // 1. sender.phoneNumber Verification 존재하는지 확인
                    const verification = await VerificationModel.findOne({
                        user: new Types.ObjectId(user._id),
                        payload: sender.phoneNumber
                    });
                    if (!verification) {
                        return {
                            ok: false,
                            error: "전화번호 미인증",
                            sender: null,
                            isVerified: null
                        };
                    }
                    if (!verification.verified) {
                        return {
                            ok: false,
                            error: "전화번호 미인증",
                            sender: null,
                            isVerified: verification.verified
                        };
                    }
                    const house = await HouseModel.findById(houseId);
                    if (!house) {
                        return {
                            ok: false,
                            error: "존재하지 않는 HouseId",
                            sender: null,
                            isVerified: null
                        };
                    }
                    const smsSender: SmsSender = {
                        phoneNumber: sender.phoneNumber,
                        registered: false,
                        isVerified: true
                    };
                    await SmsInfoModel.findOneAndUpdate(
                        {
                            house: new Types.ObjectId(houseId),
                            user: new Types.ObjectId(user._id)
                        },
                        {
                            $set: {
                                sender: smsSender
                            }
                        },
                        {
                            new: true
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        sender: smsSender,
                        isVerified: verification.verified
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        isVerified: null,
                        sender: null
                    };
                }
            }
        )
    }
};
export default resolvers;
