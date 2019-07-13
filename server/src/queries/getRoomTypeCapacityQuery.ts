import { transformRoom } from "../models/merge/merge";
import { RoomModel } from "../models/Room";
import { CapacityRoom, Gender } from "../types/graph";
import {
    GetRoomTypeCapacityParams,
    pipelineRoomTypeCapacity
} from "./aggregationPipeline/roomTypeCapacityAggregation";

// TODO: 핵 미완성
const getRoomTypeCapacityQuery = async (
    params: GetRoomTypeCapacityParams
): Promise<CapacityRoom[]> => {
    const roomTypeCapacity: Array<{
        _id: string;
        genders: Gender[];
        beds: number[];
    }> = await RoomModel.aggregate(pipelineRoomTypeCapacity(params));
    return await Promise.all(
        await roomTypeCapacity.map(async capacity => {
            return {
                ...capacity,
                room: (await transformRoom(capacity._id))!
            };
        })
    );
};

export { getRoomTypeCapacityQuery };
