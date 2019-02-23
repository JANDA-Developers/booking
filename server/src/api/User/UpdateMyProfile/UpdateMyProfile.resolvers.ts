import { InstanceType } from "typegoose";
import { UserSchema } from "../../../models/User";
import {
    UpdateMyProfileMutationArgs,
    UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolver(
            async (
                _,
                args: UpdateMyProfileMutationArgs,
                { req }
            ): Promise<UpdateMyProfileResponse> => {
                // todo: 바꿀만한 정보가 없어서 일단 그냥 둠... 받는 데이터가 많아지면 변경하기
                const user: InstanceType<UserSchema> = req.user;
                user.update({
                    name: args.name,
                    phoneNumber: args.phoneNumber
                });
                return {
                    ok: false,
                    error: null,
                    user: null
                };
            }
        )
    }
};

export default resolvers;
