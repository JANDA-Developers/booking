import { Types } from "mongoose";
import { GuestModel } from "../../../models/Guest";
import { extractGuest } from "../../../models/merge/merge";
import { GuestTypeEnum } from "../../../types/enums";
import {
    BlockingBedMutationArgs,
    BlockingBedResponse,
    RemoveBlockingMutationArgs,
    Response
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        BlockingBed: privateResolver(
            async (
                _,
                {
                    start,
                    end,
                    roomId,
                    bedIndex,
                    houseId
                }: BlockingBedMutationArgs
            ): Promise<BlockingBedResponse> => {
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
                                error: "이미 배정된 인원이 존재합니다",
                                guest: await extractGuest.bind(
                                    extractGuest,
                                    existingGuest
                                )
                            };
                        } else {
                            await existingGuest.update(
                                {
                                    $set: {
                                        start,
                                        end
                                    }
                                },
                                {
                                    new: true
                                }
                            );
                            return {
                                ok: true,
                                error: null,
                                guest: await extractGuest.bind(
                                    extractGuest,
                                    existingGuest
                                )
                            };
                        }
                    }
                    const block = new GuestModel({
                        start,
                        end,
                        house: new Types.ObjectId(houseId),
                        allocatedRoom: roomObjId,
                        guestType: GuestTypeEnum.BLOCK,
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
        RemoveBlocking: privateResolver(
            async (
                _,
                { blockId }: RemoveBlockingMutationArgs
            ): Promise<Response> => {
                const blocker = await GuestModel.findById(blockId);
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
