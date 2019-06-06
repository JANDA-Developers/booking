import { extractProduct } from "../../../models/merge/merge";
import { ProductModel } from "../../../models/Product";
import {
    UpdateProductForSuMutationArgs,
    UpdateProductForSUResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForSU } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateProductForSU: privateResolverForSU(
            async (
                _,
                { productId, params }: UpdateProductForSuMutationArgs
            ): Promise<UpdateProductForSUResponse> => {
                try {
                    const product = await ProductModel.findById(productId);
                    if (!product) {
                        return {
                            ok: false,
                            error: "존재하지 않는 productId",
                            product: null
                        };
                    }
                    await product.updateOne({
                        ...params
                    });
                    return {
                        ok: true,
                        error: null,
                        product: await extractProduct.bind(
                            extractProduct,
                            product
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        product: null
                    };
                }
            }
        )
    }
};
export default resolvers;
