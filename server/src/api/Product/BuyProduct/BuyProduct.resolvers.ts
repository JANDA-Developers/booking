import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/Merge";
import { ProductModel } from "../../../models/Product";
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
                { houseId, productId }: BuyProductMutationArgs
            ): Promise<BuyProductResponse> => {
                try {
                    const existingProduct = await ProductModel.findById(
                        productId
                    );
                    if (!existingProduct) {
                        return {
                            ok: false,
                            error: "Product is not exist",
                            house: null
                        };
                    }
                    const updatedHouse = await HouseModel.findOneAndUpdate(
                        {
                            _id: new ObjectId(houseId)
                        },
                        {
                            product: new ObjectId(productId)
                        },
                        {
                            new: true
                        }
                    );
                    if (updatedHouse) {
                        console.log({
                            ...updatedHouse
                        });

                        return {
                            ok: true,
                            error: null,
                            house: await extractHouse.bind(
                                extractHouse,
                                updatedHouse
                            )
                        };
                    } else {
                        return {
                            ok: false,
                            error: "HouseId or productId is not matched",
                            house: null
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        house: null
                    };
                }
            }
        )
    }
};
export default resolvers;
