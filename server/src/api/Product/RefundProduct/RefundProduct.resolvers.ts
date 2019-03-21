import { ObjectId } from "bson";
import { HouseModel } from "../../../models/House";
import { extractHouse } from "../../../models/merge/Merge";
import {
    RefundProductMutationArgs,
    RefundProductResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        RefundProduct: privateResolver(
            async (
                _,
                { houseId, productId }: RefundProductMutationArgs
            ): Promise<RefundProductResponse> => {
                try {
                    const existingHouse = await HouseModel.findOne({
                        _id: new ObjectId(houseId),
                        product: new ObjectId(productId)
                    });
                    if (existingHouse) {
                        existingHouse.product = null;
                        await existingHouse.save();
                        return {
                            ok: false,
                            error: null,
                            house: await extractHouse.bind(
                                extractHouse,
                                existingHouse
                            )
                        };
                    } else {
                        return {
                            ok: false,
                            error:
                                "해당 ProductId를 가지는 House가 존재하지 않습니다.",
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
