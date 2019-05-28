import { Types } from "mongoose";
import { GuestModel } from "../../../models/Guest";
import { extractBlock, extractBlocks } from "../../../models/merge/merge";
import { GetBlocksQueryArgs, GetBlocksResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBlocks: privateResolver(
            async (
                _,
                { start, end, houseId }: GetBlocksQueryArgs
            ): Promise<GetBlocksResponse> => {
                try {
                    const existingBlocks = await GuestModel.find({
                        start: {
                            $lte: end
                        },
                        end: {
                            $gte: start
                        },
                        house: new Types.ObjectId(houseId)
                    });
                    return {
                        ok: true,
                        error: null,
                        blocks: await extractBlocks.bind(
                            extractBlock,
                            existingBlocks
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        blocks: []
                    };
                }
            }
        )
    }
};
export default resolvers;
