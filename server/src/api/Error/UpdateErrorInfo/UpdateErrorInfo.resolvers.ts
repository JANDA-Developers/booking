import { ErrorModel } from "../../../models/Error";
import {
    UpdateErrorInfoMutationArgs,
    UpdateErrorInfoResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForSU } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateErrorInfo: privateResolverForSU(
            async (
                _,
                { errorCode, params }: UpdateErrorInfoMutationArgs
            ): Promise<UpdateErrorInfoResponse> => {
                try {
                    const errorInfoInstance = await ErrorModel.findOne({
                        errorCode
                    });
                    if (!errorInfoInstance) {
                        return {
                            ok: false,
                            error: "존재하지 ErrorID",
                            updatedErrorInfo: null
                        };
                    }
                    let result = null;
                    await errorInfoInstance.update(
                        {
                            $set: {
                                ...params
                            }
                        },
                        {
                            new: true
                        },
                        (err, raw) => {
                            if (raw) {
                                result = raw;
                            }
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        updatedErrorInfo: result
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        updatedErrorInfo: null
                    };
                }
            }
        )
    }
};
export default resolvers;
