import { Types } from "mongoose";
import { GuestModel } from "../../../models/Guest";
import { extractGuest } from "../../../models/merge/merge";
import { RoomModel } from "../../../models/Room";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    AllocateGuestToRoomMutationArgs,
    AllocateGuestToRoomResponse,
    RoomCapacity
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        AllocateGuestToRoom: privateResolver(
            async (
                _,
                { guestId, roomId }: AllocateGuestToRoomMutationArgs
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
                    let isAbleToAllocate = true;
                    if (existingGuest.pricingType === "DOMITORY") {
                        const allocatableGender: RoomCapacity = await existingRoom.getCapacity(
                            existingGuest.start,
                            existingGuest.end
                        );
                        isAbleToAllocate =
                            allocatableGender.availableCount !== 0;
                    } else {
                        isAbleToAllocate = await existingRoom.isAllocatable(
                            existingGuest.start,
                            existingGuest.end
                        );
                    }
                    if (!isAbleToAllocate) {
                        return {
                            ok: false,
                            error: "배정 불가",
                            guest: null
                        };
                    }
                    existingGuest.allocatedRoom = new Types.ObjectId(roomId);
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
