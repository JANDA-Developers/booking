import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BlockModel, BlockSchema } from "../../../models/Block";
import { GuestModel } from "../../../models/Guest";
import { extractBlock, extractGuest } from "../../../models/merge/merge";
import { BookingStatusEnum, GuestTypeEnum } from "../../../types/enums";
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
                    roomId,
                    bedIndex,
                    houseId,
                    ...dateRange
                }: CreateBlockMutationArgs
            ): Promise<CreateBlockResponse> => {
                try {
                    const { start, end } = {
                        start: new Date(dateRange.start),
                        end: new Date(dateRange.end)
                    };
                    const roomObjId = new Types.ObjectId(roomId);
                    const existingGuest = await GuestModel.findOne({
                        start: {
                            $lt: end
                        },
                        end: {
                            $gt: start
                        },
                        allocatedRoom: roomObjId,
                        bedIndex,
                        guestType: GuestTypeEnum.GUEST,
                        bookingStatus: BookingStatusEnum.COMPLETE
                    });
                    if (existingGuest) {
                        return {
                            ok: false,
                            error: "배정된 인원이 존재합니다",
                            block: await extractGuest.bind(
                                extractGuest,
                                existingGuest
                            )
                        };
                    }
                    const existingBlock = await BlockModel.findOne({
                        start: {
                            $lt: end
                        },
                        end: {
                            $gt: start
                        },
                        house: new Types.ObjectId(houseId),
                        allocatedRoom: roomObjId,
                        bedIndex,
                        guestType: GuestTypeEnum.BLOCK
                    });
                    if (existingBlock) {
                        let result: InstanceType<BlockSchema> = existingBlock;
                        await BlockModel.findOneAndUpdate(
                            {
                                _id: new Types.ObjectId(existingBlock._id)
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
                            block: await extractBlock.bind(extractBlock, result)
                        };
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
                        block: await extractBlock.bind(extractBlock, block)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        block: null
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
