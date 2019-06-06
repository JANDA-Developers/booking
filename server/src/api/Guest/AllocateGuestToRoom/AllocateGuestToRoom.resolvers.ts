import { Types } from "mongoose";
import { BlockModel } from "../../../models/Block";
import { GuestModel } from "../../../models/Guest";
import { extractGuest } from "../../../models/merge/merge";
import { RoomModel } from "../../../models/Room";
import { RoomTypeModel } from "../../../models/RoomType";
import { GuestTypeEnum } from "../../../types/enums";
import {
    AllocateGuestToRoomMutationArgs,
    AllocateGuestToRoomResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        AllocateGuestToRoom: privateResolver(
            async (
                _,
                { guestId, roomId, bedIndex }: AllocateGuestToRoomMutationArgs
            ): Promise<AllocateGuestToRoomResponse> => {
                try {
                    const existingGuest = await GuestModel.findById(guestId);
                    if (!existingGuest) {
                        return {
                            ok: false,
                            error: "게스트가 존재하지 않습니다",
                            guest: null
                        };
                    }
                    const existingRoom = await RoomModel.findById(roomId);
                    if (!existingRoom) {
                        return {
                            ok: false,
                            error: "방이 존재하지 않습니다",
                            guest: await extractGuest.bind(
                                extractGuest,
                                existingGuest
                            )
                        };
                    }
                    const block = await BlockModel.findOne({
                        allocatedRoom: new Types.ObjectId(roomId),
                        start: {
                            $lte: new Date(existingGuest.end)
                        },
                        end: {
                            $gt: new Date(existingGuest.start)
                        },
                        bedIndex,
                        guestType: GuestTypeEnum.BLOCK
                    });
                    if (block) {
                        return {
                            ok: false,
                            error: "블로킹!",
                            guest: null
                        };
                    }
                    const roomType = await RoomTypeModel.findById(
                        existingRoom.roomType
                    );
                    if (!roomType) {
                        return {
                            ok: false,
                            error: "잘못된 roomTypeId",
                            guest: null
                        };
                    }
                    existingGuest.allocatedRoom = new Types.ObjectId(roomId);
                    existingGuest.bedIndex = bedIndex;
                    await existingGuest.save();
                    return {
                        ok: true,
                        error: null,
                        guest: await extractGuest.bind(
                            extractGuest,
                            existingGuest
                        )
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
