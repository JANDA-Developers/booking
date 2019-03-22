import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { extractProduct } from "../../../models/merge/Merge";
import { ProductTypeModel } from "../../../models/ProductType";
import {
    BuyProductMutationArgs,
    BuyProductResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        BuyProduct: privateResolver(
            async (
                _,
                { houseId, productTypeId }: BuyProductMutationArgs
            ): Promise<BuyProductResponse> => {
                try {
                    const existingProductType = await ProductTypeModel.findById(
                        productTypeId
                    );
                    if (!existingProductType) {
                        return {
                            ok: false,
                            error: "ProductTypeId is not Matched",
                            product: null
                        };
                    }
                    const existingHouse = await HouseModel.findById(houseId);
                    if (!existingHouse) {
                        return {
                            ok: false,
                            error: "존재하지 않는 숙소입니다.",
                            product: null
                        };
                    }
                    console.log({
                        existingProductType
                    });

                    const product = await existingProductType.makeProduct(
                        houseId
                    );
                    product.productType = new ObjectId(productTypeId);

                    console.log({
                        product
                    });

                    await product.save();
                    const updatedHouse = await HouseModel.findOneAndUpdate(
                        {
                            _id: new ObjectId(houseId)
                        },
                        {
                            product: new ObjectId(product._id)
                        },
                        {
                            new: true
                        }
                    );
                    if (updatedHouse) {
                        return {
                            ok: true,
                            error: null,
                            product: await extractProduct.bind(
                                extractProduct,
                                product
                            )
                        };
                    } else {
                        return {
                            ok: false,
                            error: "HouseId or productId is not matched",
                            product: null
                        };
                    }
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
