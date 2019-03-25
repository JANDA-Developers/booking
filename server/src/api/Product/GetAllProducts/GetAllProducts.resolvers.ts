import { extractProduct } from "../../../models/merge/Merge";
import { ProductModel } from "../../../models/Product";
import { GetAllProductsResponse, Product } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllProducts: privateResolver(
            async (): Promise<GetAllProductsResponse> => {
                try {
                    const products = await ProductModel.find();
                    return {
                        ok: true,
                        error: null,
                        products: products.map(
                            (product): Product => {
                                return extractProduct.bind(
                                    extractProduct,
                                    product
                                );
                            }
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        products: []
                    };
                }
            }
        )
    }
};

export default resolvers;
