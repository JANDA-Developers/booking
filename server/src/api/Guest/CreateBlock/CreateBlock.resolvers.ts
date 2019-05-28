import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BlockModel, BlockSchema } from "../../../models/Block";
import { GuestModel } from "../../../models/Guest";
import { extractBlock, extractGuest } from "../../../models/merge/merge";
import {
    CreateBlockMutationArgs,
    CreateBlockResponse,
    DeleteBlockMutationArgs,
    Response
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateBlock: privateResolver(
            async (
                _,
                {
                    start,
                    end,
                    roomId,
                    bedIndex,
                    houseId
                }: CreateBlockMutationArgs
            ): Promise<CreateBlockResponse> => {
                try {
                    const roomObjId = new Types.ObjectId(roomId);
                    const existingGuest = await GuestModel.findOne({
                        start: {
                            $lte: end
                        },
                        end: {
                            $gte: start
                        },
                        allocatedRoom: roomObjId,
                        bedIndex
                    });
                    if (existingGuest) {
                        if (existingGuest.guestType === "GUEST") {
                            return {
                                ok: false,
                                error: "배정된 인원이 존재합니다",
                                guest: await extractGuest.bind(
                                    extractGuest,
                                    existingGuest
                                )
                            };
                        } else {
                            let result: InstanceType<
                                BlockSchema
                            > = existingGuest;
                            await BlockModel.findOneAndUpdate(
                                {
                                    _id: new Types.ObjectId(existingGuest._id)
                                },
                                {
                                    $set: {
                                        start,
                                        end
                                    }
                                },
                                {
                                    new: true
                                },
                                (err, doc) => {
                                    if (doc !== null) {
                                        result = doc;
                                    }
                                }
                            );
                            return {
                                ok: true,
                                error: null,
                                guest: await extractBlock.bind(
                                    extractBlock,
                                    result
                                )
                            };
                        }
                    }
                    const block = new BlockModel({
                        start,
                        end,
                        house: new Types.ObjectId(houseId),
                        allocatedRoom: roomObjId,
                        bedIndex
                    });
                    await block.save();
                    return {
                        ok: true,
                        error: null,
                        guest: await extractGuest.bind(extractGuest, block)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        guest: null
                    };
                }
            }
        ),
        DeleteBlock: privateResolver(
            async (
                _,
                { blockId }: DeleteBlockMutationArgs
            ): Promise<Response> => {
                const blocker = await BlockModel.findById(blockId);
                if (!blocker) {
                    return {
                        ok: false,
                        error: "방 막기 해제 실패"
                    };
                }
                await blocker.remove();
                return {
                    ok: true,
                    error: null
                };
            }
        )
    }
};
export default resolvers;
