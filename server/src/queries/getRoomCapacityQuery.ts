import { Types } from "mongoose";
import { transformRoom } from "../models/merge/merge";
import { RoomModel } from "../models/Room";
import { CapacityRoom, Gender } from "../types/graph";
import {
    GetRoomCapacityQueryParams,
    pipelineRoomCapacity
} from "./aggregationPipeline/roomCapacityAggregation";

const getRoomCapacityQuery = async (
    params: GetRoomCapacityQueryParams & { roomTypeId?: Types.ObjectId }
): Promise<CapacityRoom[]> => {
    const roomCapacity: Array<{
        _id: string;
        genders: Gender[];
        beds: number[];
    }> = await RoomModel.aggregate(pipelineRoomCapacity(params));
    return await Promise.all(
        await roomCapacity.map(async capacity => {
            return {
                ...capacity,
                room: (await transformRoom(capacity._id))!
            };
        })
    );
};

export { getRoomCapacityQuery };
