import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { RoomPriceModel, RoomPriceSchema } from "../models/RoomPrice";

export const getRoomPriceWithDateRange = async (
    start: Date,
    end: Date,
    roomTypeId: Types.ObjectId
): Promise<Array<InstanceType<RoomPriceSchema>>> =>
    await RoomPriceModel.find({
        roomType: roomTypeId,
        date: {
            $gte: start,
            $lte: end
        }
    }).sort({ date: 1 });
