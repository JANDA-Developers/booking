import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
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
            { houseId, layoutType, url, ...params }: CreateProductMutationArgs
        ): Promise<CreateProductResponse> => {
            try {
                const house = await HouseModel.findById(houseId);
                if (!house) {
                    return {
                        ok: false,
                        error: "존재하지 않는 HouseId",
                        product: null
                    };
                }
                // create 로직을 만든다...
                const product = new ProductModel({
                    house: new Types.ObjectId(houseId),
                    ...params
                });
                await product.save();
                await house.update({
                    $set: {
                        appInfo: {
                            layoutType,
                            url
                        }
                    }
                });

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
