import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/merge";
import { SmsInfoModel } from "../../../models/SmsInfo";
import { UserSchema } from "../../../models/User";
import {
    CreateHouseMutationArgs,
    CreateHouseResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateHouse: privateResolver(
            async (
                _,
                args: CreateHouseMutationArgs,
                { req }
            ): Promise<CreateHouseResponse> => {
                try {
                    const user: InstanceType<UserSchema> = req.user;
                    // TODO: phoneNumber Verification 확인하기
                    if (!user.isPhoneVerified) {
                        return {
                            ok: false,
                            error: "전화번호 미인증",
                            house: null
                        };
                    }

                    const house = new HouseModel({
                        ...args,
                        user: user._id
                    });

                    // TODO: SmsInfo 추가하기 ㄱㄱ
                    const smsInfo = new SmsInfoModel({
                        sender: {
                            phoneNumber: user.phoneNumber,
                            registered: false,
                            verified: user.isPhoneVerified
                        },
                        house: new Types.ObjectId(house._id),
                        user: new Types.ObjectId(user._id),
                        receivers: [user.phoneNumber]
                    });
                    house.smsInfo = new Types.ObjectId(smsInfo._id);
                    await smsInfo.save();
                    await house.save();
                    await user.update({
                        $push: {
                            houses: house._id
                        }
                    });
                    return {
                        ok: true,
                        error: null,
                        house: await extractHouse.bind(extractHouse, house)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        house: null
                    };
                }
            }
        )
    }
};

export default resolvers;
