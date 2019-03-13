import { ObjectId } from "bson";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import DateRange from "../../dtos/DateRange.class";
import {
    House,
    Product,
    ProductType,
    Room,
    RoomType,
    Season,
    User,
} from "../../types/graph";
import { HouseModel, HouseSchema } from "../House";
import { ProductSchema } from "../Product";
import { ProductTypeSchema } from "../ProductType";
import { RoomModel, RoomSchema } from "../Room";
import { RoomTypeModel, RoomTypeSchema } from "../RoomType";
import { SeasonModel, SeasonSchema } from "../Season";
import { UserModel, UserSchema } from "../User";

/*
    - extract로 시작하느 함수들은 InstanceType<T> 를 변수로 받는 async 함수
    - transform 으로 시작하는 함수들은 ObjectId 를 변수로 받아 함수 안에서 DB에 접속하여 결과값을 출력하는 async 함수
*/
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

export const transformUser = async (
    userId: ObjectId | string
): Promise<User | null> => {
    const user: InstanceType<UserSchema> | null = await UserModel.findById(
        userId
    );
    if (user) {
        return await extractUser(user);
    } else {
        return null;
    }
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

export const transformHouse = async (
    houseId: ObjectId | string
): Promise<House | null> => {
    const house: InstanceType<HouseSchema> | null = await HouseModel.findById(
        houseId
    );
    if (house) {
        return await extractHouse(house);
    } else {
        return null;
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
    if (typeof roomType === "string") {
        extractResult = {
            ...(await RoomTypeModel.findById(roomType))
        };
    } else {
        extractResult = {
            ...roomType
        };
    }
    const house = await HouseModel.findById(extractResult._doc.house);
    const result = {
        ...extractResult._doc,
        rooms: await transformRooms.bind(
            transformRooms,
            extractResult._doc.rooms
        )
    };

    if (house) {
        result.house = await extractHouse(house);
    }
    return result;
};

export const transformRoomType = async (
    roomTypeId: string | ObjectId
): Promise<RoomType> => {
    const roomTypeSchema: InstanceType<
        RoomTypeSchema
    > | null = await RoomTypeModel.findById(roomTypeId);
    if (roomTypeSchema) {
        return await extractRoomType(roomTypeSchema);
    } else {
        throw new Error("Unexist Id");
    }
};

export const extractRoomTypes = async (
    roomTypeIds: ObjectId[]
): Promise<RoomType[]> => {
    try {
        const results: RoomType[] = await Promise.all(
            roomTypeIds.map(
                async (roomTypeId): Promise<RoomType> => {
                    return await transformRoomType(roomTypeId);
                }
            )
        );
        return results;
    } catch (error) {
        return [];
    }
};

export const transformRooms = async (roomIds: ObjectId[]): Promise<Room[]> => {
    try {
        const result: Room[] = await Promise.all(
            roomIds.map(
                async (roomId): Promise<Room> => {
                    return await transformRoom(roomId);
                }
            )
        );
        return result;
    } catch (error) {
        return [];
    }
};

export const transformRoom = async (
    roomId: ObjectId | string
): Promise<Room> => {
    const roomSchema: InstanceType<
        RoomSchema
    > | null = await RoomModel.findById(roomId);
    if (roomSchema) {
        return await extractRoom(roomSchema);
    } else {
        throw new Error("Unexist Id");
    }
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
            roomType: await extractRoomType.bind(extractRoomType, roomType),
            disableRanges: extractResult._doc.disableRanges || []
        };
    } else {
        throw new Error("RoomType is Null...");
    }
};

export const extractSeason = async (
    season: InstanceType<SeasonSchema>
): Promise<Season> => {
    const extractResult: any = { ...season };

    console.log({
        extractResult
    });

    return {
        ...extractResult._doc,
        house: await transformHouse.bind(
            transformHouse,
            extractResult._doc.house
        ),
        dateRange: new DateRange(extractResult._doc.dateRange).getParams()
    };
};

export const transformSeason = async (
    seasonId: ObjectId
): Promise<Season | null> => {
    const season: InstanceType<
        SeasonSchema
    > | null = await SeasonModel.findById(seasonId);
    if (season) {
        return await extractSeason(season);
    } else {
        return null;
    }
};

export const extractProductType = (
    productType: InstanceType<ProductTypeSchema>
): ProductType => {
    const result: any = { ...productType };
    return {
        ...result._doc
    };
};

export const extractProduct = (
    product: InstanceType<ProductSchema>
): Product => {
    const result: any = { ...product };
    return {
        ...result._doc
    };
};
