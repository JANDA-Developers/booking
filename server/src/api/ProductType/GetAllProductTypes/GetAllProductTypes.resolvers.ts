import { ProductTypeModel } from "../../../models/ProductType";
import { GetAllProductTypesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllProductTypes: privateResolver(
            async (): Promise<GetAllProductTypesResponse> => {
                try {
                    const productTypes = await ProductTypeModel.find();
                    return {
                        ok: true,
                        error: null,
                        productTypes: productTypes.map((productType: any) => {
                            return {
                                ...productType._doc,
                                _id: productType._doc._id
                            };
                        })
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        productTypes: []
                    };
                }
            }
        )
    }
};

export default resolvers;
