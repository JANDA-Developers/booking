import { ObjectId } from "bson";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { House, Room, RoomType, User } from "../types/graph";
import { HouseModel, HouseSchema } from "./House";
import { RoomSchema } from "./Room";
import { RoomTypeModel, RoomTypeSchema } from "./RoomType";
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
    roomType: InstanceType<RoomTypeSchema> | string
): Promise<RoomType> => {
    let extractResult: any;
    if (typeof(roomType) === 'string') {
        extractResult = {
            ...(await RoomTypeModel.findById({ _id: new ObjectId(roomType) }))
        };
    } else {
        extractResult = {
            ...roomType
        };
    }
    const house = await HouseModel.findById(extractResult._doc.house);
    const result = {
        ...extractResult._doc
    };

    if (house) {
        result.house = await extractHouse(house);
    }
    return result;
};

export const extractRoomTypes = async (
    houseId: ObjectId
): Promise<RoomType[]> => {
    const house = await HouseModel.findOne({ _id: houseId }, { roomTypes: 1 });
    console.log({
        extractRoomTypes: house
    });

    const result: RoomType[] = [];
    if (house) {
        await house.roomTypes.forEach(async roomTypeId => {
            const temp = await RoomTypeModel.findById(roomTypeId);
            if (temp) {
                result.push(await extractRoomType(temp));
            }
        });
    }

    return result;
};

export const extractRoom = async (
    room: InstanceType<RoomSchema>
): Promise<Room> => {
    const extractResult: any = {
        ...room
    };
    const roomType = await RoomTypeModel.findById(extractResult._doc.roomType);
    if (roomType) {
        return {
            ...extractResult._doc,
            roomType: await extractRoomType(roomType),
            disableRanges: extractResult._doc.disableRanges || []
        };
    } else {
        throw new Error("RoomType is Null...");
    }
};
