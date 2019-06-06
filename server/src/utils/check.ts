import { Types } from "mongoose";
import { HouseModel } from "../models/House";

export const isUsersHouse = async (
    houseId: string,
    user: string
): Promise<boolean> => {
    const existingHouse = await HouseModel.findOne({
        _id: houseId,
        user: new Types.ObjectId(user)
    });
    if (existingHouse) {
        return true;
    }
    return false;
};
