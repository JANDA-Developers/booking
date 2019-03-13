import { UpdateProductTypeMutationArgs, UpdateProductTypeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateProductType: privateResolver(async (_, args: UpdateProductTypeMutationArgs): Promise<UpdateProductTypeResponse> => {
            return{
                ok: false,
                error: "Under Develop",
                productType: null
            };
        })
    }
};
export default resolvers;
