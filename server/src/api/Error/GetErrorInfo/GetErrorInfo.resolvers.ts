import {
    GetErrorInfoQueryArgs,
    GetErrorInfoResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetErrorInfo: privateResolver(
            async (
                _,
                params: GetErrorInfoQueryArgs
            ): Promise<GetErrorInfoResponse> => {
                try {
                    return {
                        ok: true,
                        error: "개발중",
                        errorInfo: null
                    };
                } catch (error) {
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
