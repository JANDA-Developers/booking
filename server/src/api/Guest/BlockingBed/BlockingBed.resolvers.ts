import { Types } from "mongoose";
import { GuestModel } from "../../../models/Guest";
import { extractGuest } from "../../../models/merge/merge";
import { RoomModel } from "../../../models/Room";
import {
    BlockingBedMutationArgs,
    BlockingBedResponse
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
                    houseId,
                    blocking
                }: BlockingBedMutationArgs
            ): Promise<BlockingBedResponse> => {
                try {
                    const roomObjId = new Types.ObjectId(roomId);
                    blocking = blocking === null ? true : blocking;
                    if (!blocking) {
                        const blocker = await GuestModel.findOne({
                            start,
                            end,
                            allocatedRoom: roomObjId,
                            bedIndex,
                            blocking: true
                        });
                        if (!blocker) {
                            return {
                                ok: false,
                                error: "방 막기 해제 실패",
                                guest: blocker
                            };
                        }
                        await blocker.remove();
                        return {
                            ok: true,
                            error: null,
                            guest: await extractGuest.bind(
                                extractGuest,
                                blocker
                            )
                        };
                    }
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
                        return {
                            ok: false,
                            error: "이미 배정된 인원이 존재합니다",
                            guest: await extractGuest.bind(
                                extractGuest,
                                existingGuest
                            )
                        };
                    }
                    const roomInstance = await RoomModel.findById(roomId);
                    if (!roomInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 roomId",
                            guest: null
                        };
                    }
                    const guest = new GuestModel({
                        start,
                        end,
                        pricingType: roomInstance.pricingType,
                        roomType: new Types.ObjectId(roomInstance.roomType),
                        house: new Types.ObjectId(houseId),
                        allocatedRoom: roomObjId,
                        blockRoom: true,
                        bedIndex
                    });
                    await guest.save();
                    return {
                        ok: true,
                        error: null,
                        guest: await extractGuest.bind(extractGuest, guest)
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        guest: null
                    };
                }
            }
        )
    }
};
export default resolvers;
