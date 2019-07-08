import { Types } from "mongoose";
import { GuestModel } from "../../../models/Guest";
import { extractBlock, extractBlocks } from "../../../models/merge/merge";
import { GuestTypeEnum } from "../../../types/enums";
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
                            $lt: end
                        },
                        end: {
                            $gt: start
                        },
                        house: new Types.ObjectId(houseId),
                        guestType: GuestTypeEnum.BLOCK
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
