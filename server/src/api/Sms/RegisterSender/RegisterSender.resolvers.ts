import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { SmsSenderStatusModel } from "../../../models/SmsSenderStatus";
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
                            verified: null
                        };
                    }
                    if (!verification.verified) {
                        return {
                            ok: false,
                            error: "전화번호 미인증",
                            sender: null,
                            verified: verification.verified
                        };
                    }
                    const house = await HouseModel.findById(houseId);
                    if (!house) {
                        return {
                            ok: false,
                            error: "존재하지 않는 HouseId",
                            sender: null,
                            verified: null
                        };
                    }
                    const smsSenderStatus = await SmsSenderStatusModel.findOne({
                        user: new Types.ObjectId(user._id),
                        phoneNumber: sender.phoneNumber
                    });
                    const registered: boolean | null =
                        smsSenderStatus && smsSenderStatus.registered;
                    if (registered === null) {
                        // TODO: SmsSenderStatus 등록 안되어있다면 등록하긔 ㅎㅎ
                        new SmsSenderStatusModel({
                            phoneNumber: sender.phoneNumber,
                            user: new Types.ObjectId(user._id)
                        }).save();
                    }
                    const smsSender: SmsSender = {
                        phoneNumber: sender.phoneNumber,
                        registered: registered || false,
                        verified: true
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
                        verified: verification.verified
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        verified: null,
                        sender: null
                    };
                }
            }
        )
    }
};
export default resolvers;
