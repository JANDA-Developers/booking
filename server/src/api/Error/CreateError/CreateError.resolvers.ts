import {
    CreateErrorMutationArgs,
    CreateErrorResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForSU } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateError: privateResolverForSU(
            async (
                _,
                { errorCodeInput, params }: CreateErrorMutationArgs
            ): Promise<CreateErrorResponse> => {
                try {
                    console.log({
                        errorCodeInput,
                        params
                    });

                    return {
                        ok: false,
                        error: null,
                        errorInfo: null
                    };
                } catch (error) {
                    console.log(error);

                    return {
                        ok: false,
                        error: error.message,
                        errorInfo: null
                    };
                }
            }
        )
    }
};
export default resolvers;
