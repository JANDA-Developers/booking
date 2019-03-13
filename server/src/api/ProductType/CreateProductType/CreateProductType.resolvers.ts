import { extractProductType } from "../../../models/merge/Merge";
import { ProductTypeModel } from "../../../models/ProductType";
import {
    CreateProductTypeMutationArgs,
    CreateProductTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateProductType: async (
            _,
            args: CreateProductTypeMutationArgs
        ): Promise<CreateProductTypeResponse> => {
            try {
                // create 로직을 만든다...
                const productType = new ProductTypeModel({
                    ...args
                });

                await productType.save();

                return {
                    ok: true,
                    error: null,
                    productType: extractProductType(productType)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    productType: null
                };
            }
        }
    }
};

export default resolvers;
