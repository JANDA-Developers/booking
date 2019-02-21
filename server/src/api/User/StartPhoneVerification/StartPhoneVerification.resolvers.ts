import { ObjectId } from "bson";
import { Target, VerificationModel } from "../../../models/Verification";
import { StartPhoneVerificationResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: privateResolver(
            async (
                _: any,
                __: any,
                { req }
            ): Promise<StartPhoneVerificationResponse> => {
                const { user } = req;
                const { phoneNumber } = user;

                try {
                    const existingVerification = await VerificationModel.findOne({
                        target: Target.PHONE,
                        payload: phoneNumber
                    });
                    console.log({
                        userId: user._id,
                        vfId: existingVerification,
                    });
                    if(existingVerification){
                        console.log({
                            id1: existingVerification.user,
                            id2: user._id,
                            validate: existingVerification.user.equals(user._id)
                        });
                    }
                    if (existingVerification && existingVerification.user.equals(user._id)) {
                        await existingVerification.remove();
                    }

                    const verification = new VerificationModel({
                        target: Target.PHONE,
                        payload: phoneNumber,
                        user: new ObjectId(user._id)
                    });
                    await verification.save();
                    sendVerificationSMS(phoneNumber, verification.key);
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

export default resolvers;
