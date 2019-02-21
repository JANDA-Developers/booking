import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { House, RoomType, User } from "../types/graph";
import { HouseModel, HouseSchema } from "./House";
import { RoomTypeSchema } from "./RoomType";
import { UserModel, UserSchema } from "./User";

export const extractUser = async (
    user: InstanceType<UserSchema>
): Promise<User> => {
    const extractResult: any = {
        ...user
    };
    return {
        ...extractResult._doc,
        password: null,
        houses: await extractHouses.bind(extractHouses, user.houses)
    };
};

export const extractHouse = async (
    house: InstanceType<HouseSchema>
): Promise<House> => {
    try {
        const extracted: any = {
            ...house
        };
        return {
            ...extracted._doc,
            user: await extractUser.bind(
                extractUser,
                await UserModel.findById(house.user)
            )
        };
    } catch (error) {
        throw error;
    }
};

export const extractHouses = async (
    houseIds: Types.ObjectId[]
): Promise<Array<Promise<House>>> => {
    try {
        const houses = await HouseModel.find({ _id: { $in: houseIds } });
        return houses.map(async house => {
            return await extractHouse(house);
        });
    } catch (error) {
        throw error;
    }
};

export const extractRoomType = async (
    roomType: InstanceType<RoomTypeSchema>
): Promise<RoomType> => {
    const extractResult: any = {
        ...roomType
    };
    const house = await HouseModel.findById(extractResult._doc.house);
    const result = {
        ...extractResult._doc
    };

    if (house) {
        result.house = await extractHouse(house);
    }
    return result;
};
