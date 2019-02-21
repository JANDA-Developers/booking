import { ObjectId } from "bson";
import { HouseModel } from "../models/House";

export const isUsersHouse = async (
    houseId: string,
    user: string
): Promise<boolean> => {
    const existingHouse = await HouseModel.findOne({
        _id: houseId,
        user: new ObjectId(user)
    });
    if (existingHouse) {
        return true;
    }
    return false;
};
