import { ObjectId } from "bson";
import { ProductTypeModel } from "../../../models/ProductType";
import {
    DeleteProductTypeMutationArgs,
    DeleteProductTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteProductType: async (
            _,
            { productTypeId }: DeleteProductTypeMutationArgs
        ): Promise<DeleteProductTypeResponse> => {
            try {
                const existingProductType = await ProductTypeModel.findOne({
                    _id: new ObjectId(productTypeId)
                });
                if (existingProductType) {
                    await existingProductType.remove();
                    return {
                        ok: true,
                        error: null
                    };
                } else {
                    return {
                        ok: false,
                        error: "HouseId, ProductTypeId are not matched"
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};

export default resolvers;
