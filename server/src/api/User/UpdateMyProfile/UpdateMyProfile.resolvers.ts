import { InstanceType } from "typegoose";
import { extractUser } from "../../../models/merge/merge";
import { UserSchema } from "../../../models/User";
import {
    UpdateMyProfileMutationArgs,
    UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolver(
            async (
                _,
                { password, ...args }: UpdateMyProfileMutationArgs,
                { req }
            ): Promise<UpdateMyProfileResponse> => {
                // todo: 바꿀만한 정보가 없어서 일단 그냥 둠... 받는 데이터가 많아지면 변경하기
                const user: InstanceType<UserSchema> = req.user;
                const comparePassword = await user.comparePassword(password);
                try {
                    if (comparePassword) {
                        await user.update(args, {
                            new: true
                        });
                        return {
                            ok: true,
                            error: null,
                            user: await extractUser(user)
                        };
                    } else {
                        return {
                            ok: false,
                            error: "패스워드가 틀렸습니다",
                            user: null
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        user: null
                    };
                }
            }
        )
    }
};

export default resolvers;
