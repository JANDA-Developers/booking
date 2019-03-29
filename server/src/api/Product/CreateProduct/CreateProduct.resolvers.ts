import { extractProduct } from "../../../models/merge/merge";
import { ProductModel } from "../../../models/Product";
import {
    CreateProductMutationArgs,
    CreateProductResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateProduct: async (
            _,
            args: CreateProductMutationArgs
        ): Promise<CreateProductResponse> => {
            try {
                // create 로직을 만든다...
                const product = new ProductModel({
                    ...args
                });

                await product.save();

                return {
                    ok: true,
                    error: null,
                    product: extractProduct.bind(extractProduct, product)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    product: null
                };
            }
        }
    }
};

export default resolvers;
