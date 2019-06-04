import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import {
    Block,
    booking,
    Guest,
    HostApplication,
    House,
    Product,
    ProductType,
    Room,
    RoomPrice,
    RoomType,
    RoomTypeWithCapacity,
    Season,
    SeasonPrice,
    SmsInfo,
    User
} from "../../types/graph";
import { applyDaysToBinaryString } from "../../utils/applyDays";
import { BlockSchema } from "../Block";
import { bookingModel, BookingSchema } from "../bookingss";
import { GuestModel, GuestSchema } from "../Guest";
import {
    HostApplicationModel,
    HostApplicationSchema
} from "../HostApplication";
import { HouseModel, HouseSchema } from "../House";
import { ProductModel, ProductSchema } from "../Product";
import { ProductTypeModel, ProductTypeSchema } from "../ProductType";
import { RoomModel, RoomSchema } from "../Room";
import { RoomPriceSchema } from "../RoomPrice";
import { RoomTypeModel, RoomTypeSchema } from "../RoomType";
import { SeasonModel, SeasonSchema } from "../Season";
import { SeasonPriceModel, SeasonPriceSchema } from "../SeasonPrice";
import { SmsInfoModel, SmsInfoSchema } from "../SmsInfo";
import { UserModel, UserSchema } from "../User";

/*
    - extract로 시작하느 함수들은 InstanceType<T> 를 변수로 받는 async 함수
    - transform 으로 시작하는 함수들은 Types.ObjectId 를 변수로 받아 함수 안에서 DB에 접속하여 결과값을 출력하는 async 함수
*/
export const extractUser = async (
    user: InstanceType<UserSchema>
): Promise<User> => {
    const extractResult: any = {
        ...user
    };
    return {
        ...extractResult._doc,
        _id: user._id.toString(),
        password: null,
        houses: await transformHouses.bind(transformHouses, user.houses)
    };
};

export const transformUser = async (
    userId: Types.ObjectId | string
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
            _id: extracted._doc._id.toString(),
            user: await extractUser.bind(
                extractUser,
                await UserModel.findById(house.user)
            ),
            product: await transformProduct.bind(
                transformProduct,
                house.product
            ),
            hostApplication: await transformHostApp.bind(
                transformHostApp,
                house.hostApplication
            ),
            smsInfo: transformSmsInfo.bind(transformSmsInfo, house.smsInfo)
        };
    } catch (error) {
        throw error;
    }
};

export const transformSmsInfo = async (
    smsInfoId: Types.ObjectId | string
): Promise<SmsInfo | null> => {
    const smsInfoInstance = await SmsInfoModel.findById(smsInfoId);
    return smsInfoInstance && (await extractSmsInfo(smsInfoInstance));
};

export const extractSmsInfo = async (
    smsInfo: InstanceType<SmsInfoSchema>
): Promise<SmsInfo> => {
    return {
        ...(smsInfo as any)._doc,
        _id: smsInfo._id,
        house: await transformHouse.bind(transformHouse, smsInfo.house),
        user: await transformUser.bind(transformUser, smsInfo.user)
    };
};

export const transformHouse = async (
    houseId: Types.ObjectId | string
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

export const transformHouses = async (
    houseIds: Types.ObjectId[]
): Promise<House[]> => {
    try {
        const houses = await HouseModel.find({ _id: { $in: houseIds } });
        const result = await Promise.all(
            houses.map(async house => {
                return await extractHouse(house);
            })
        );
        return result;
    } catch (error) {
        throw error;
    }
};

export const extractHouses = async (
    houseTypes: Array<InstanceType<HouseSchema>>
): Promise<House[]> => {
    return await Promise.all(
        houseTypes.map(
            async (house: InstanceType<HouseSchema>): Promise<House> => {
                return {
                    ...(await extractHouse(house)),
                    roomTypes: await extractRoomTypes.bind(
                        extractRoomTypes,
                        house.roomTypes
                    )
                };
            }
        )
    );
};

export const extractRoomType = async (
    roomType: InstanceType<RoomTypeSchema>
): Promise<RoomType> => {
    const extractResult: any = {
        ...roomType
    };

    const house = await HouseModel.findById(extractResult._doc.house);
    return {
        ...extractResult._doc,
        _id: roomType._id.toString(),
        rooms: await transformRooms.bind(
            transformRooms,
            extractResult._doc.rooms
        ),
        roomCount: extractResult._doc.rooms.length,
        house: await transformHouse.bind(transformHouse, house)
    };
};

export const extractRoomTypeWithCapacity = async (
    roomType: InstanceType<RoomTypeSchema>,
    start: Date,
    end: Date,
    includeSettled?: boolean | undefined,
    exceptbookingIds?: Types.ObjectId[]
): Promise<RoomTypeWithCapacity> => {
    return {
        roomType: extractRoomType.bind(extractRoomType, roomType),
        roomTypeCapacity: await extractRoomTypeCapacity.bind(
            extractRoomTypeCapacity,
            roomType,
            start,
            end,
            includeSettled,
            exceptbookingIds
        )
    };
};

export const extractRoomTypeCapacity = async (
    roomType: InstanceType<RoomTypeSchema>,
    start: Date,
    end: Date,
    includeSettled?: boolean | undefined,
    exceptbookingIds?: Types.ObjectId[]
) => {
    return await roomType.getCapacity(
        start,
        end,
        includeSettled,
        exceptbookingIds
    );
};

export const transformRoomType = async (
    roomTypeId: string | Types.ObjectId
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

export const transformRoomTypes = async (
    roomTypeIds: Types.ObjectId[]
): Promise<RoomType[]> => {
    const roomTypeInstances = await RoomTypeModel.find({
        _id: { $in: roomTypeIds }
    });
    return await Promise.all(
        roomTypeInstances.map(async roomTypeInstance => {
            return await extractRoomType(roomTypeInstance);
        })
    );
};

export const extractRoomTypes = async (
    roomTypeIds: Types.ObjectId[]
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

export const transformRoom = async (
    roomId: Types.ObjectId | string
): Promise<Room | null> => {
    const roomSchema: InstanceType<
        RoomSchema
    > | null = await RoomModel.findById(roomId);
    if (roomSchema) {
        return await extractRoom(roomSchema);
    } else {
        return null;
    }
};

export const transformRooms = async (
    roomIds: Types.ObjectId[]
): Promise<Room[]> => {
    try {
        const result: any = (await Promise.all(
            roomIds.map(
                async (roomId): Promise<Room | null> => {
                    return await transformRoom(roomId);
                }
            )
        )).filter(room => room);
        return result;
    } catch (error) {
        return [];
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
    return {
        ...extractResult._doc,
        _id: season._id.toString(),
        house: await transformHouse.bind(
            transformHouse,
            extractResult._doc.house
        )
    };
};

export const extractSeasons = async (
    seasons: Array<InstanceType<SeasonSchema>>
): Promise<Season[]> => {
    return await Promise.all(
        seasons.map(
            async (season: InstanceType<SeasonSchema>): Promise<Season> => {
                return await extractSeason(season);
            }
        )
    );
};

export const transformSeason = async (
    seasonId: Types.ObjectId
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

export const transformSeasons = async (
    seasonIds: Types.ObjectId[]
): Promise<Season[]> => {
    try {
        const seasons: Array<
            InstanceType<SeasonSchema>
        > = await SeasonModel.find({ _id: { $in: seasonIds } });
        const results: Season[] = await Promise.all(
            seasons.map(
                async (season): Promise<Season> => {
                    return await extractSeason(season);
                }
            )
        );
        return results;
    } catch (error) {
        return [];
    }
};

export const extractProductType = (
    productType: InstanceType<ProductTypeSchema>
): ProductType => {
    const result: any = { ...productType };
    return {
        ...result._doc,
        _id: result._doc._id.toString()
    };
};

export const transformProductType = async (
    productTypeId: Types.ObjectId | string
): Promise<ProductType | null> => {
    const productType = await ProductTypeModel.findById(productTypeId);
    if (productType) {
        return await extractProductType(productType);
    } else {
        return null;
    }
};

export const extractProduct = async (
    product: InstanceType<ProductSchema>
): Promise<Product> => {
    const result: any = { ...product };
    return {
        ...result._doc,
        _id: product._id.toString(),
        productType: await transformProductType.bind(
            transformProductType,
            result._doc.productType
        )
    };
};

export const transformProduct = async (
    productId: Types.ObjectId | string
): Promise<Product | null> => {
    const product = await ProductModel.findById(productId);
    if (product) {
        return await extractProduct(product);
    } else {
        return null;
    }
};

export const extractSeasonPrice = async (
    seasonPrice: InstanceType<SeasonPriceSchema>
): Promise<SeasonPrice> => {
    const sp: any = {
        ...seasonPrice
    };
    return {
        ...sp._doc,
        _id: sp._doc._id.toString(),
        // FIXME - Here... SeasonPriceSchema 변경으로 여기도 바뀌어야함.
        dayOfWeekPrices: sp._doc.dayOfWeekPrices,
        applyDays: applyDaysToBinaryString(sp._doc.applyDays),
        roomType: await transformRoomType.bind(
            transformRoomType,
            sp._doc.roomType
        ),
        season: await transformSeason.bind(transformSeason, sp._doc.season)
    };
};

export const extractSeasonPrices = async (
    seasonPrices: Array<InstanceType<SeasonPriceSchema>>
): Promise<SeasonPrice[]> => {
    return await Promise.all(
        seasonPrices.map(
            async (
                seasonPrice: InstanceType<SeasonPriceSchema>
            ): Promise<SeasonPrice> => {
                return await extractSeasonPrice(seasonPrice);
            }
        )
    );
};

export const transformSeasonPrice = async (
    seasonPriceId?: string,
    args?: { seasonId: string; roomTypeId: string }
): Promise<SeasonPrice | null> => {
    try {
        let existingSeasonPrice: InstanceType<SeasonPriceSchema> | null = null;
        if (seasonPriceId) {
            existingSeasonPrice = await SeasonPriceModel.findById(
                seasonPriceId
            );
        } else if (args) {
            existingSeasonPrice = await SeasonPriceModel.findOne({
                season: new Types.ObjectId(args.seasonId),
                roomType: new Types.ObjectId(args.roomTypeId)
            });
        }
        if (existingSeasonPrice) {
            return {
                ...(await extractSeasonPrice(existingSeasonPrice))
            };
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export const extractRoomPrice = async (
    roomPrice: InstanceType<RoomPriceSchema>
): Promise<RoomPrice> => {
    const result: any = {
        ...roomPrice
    };
    return {
        ...result._doc,
        _id: result._doc._id.toString(),
        roomType: await transformRoomType.bind(
            transformRoomType,
            result._doc.roomType
        )
    };
};

export const extractRoomPrices = async (
    roomPrices: Array<InstanceType<RoomPriceSchema>>
): Promise<RoomPrice[]> => {
    return await Promise.all(
        await roomPrices.map(
            async (roomPrice): Promise<RoomPrice> => {
                return await extractRoomPrice(roomPrice);
            }
        )
    );
};

export const extractbooking = async (
    bookingInstance: InstanceType<BookingSchema>
): Promise<booking> => {
    const result: any = {
        ...bookingInstance
    };
    console.log({
        result
    });

    return {
        ...result._doc,
        _id: bookingInstance._id,
        roomTypes: await transformRoomTypes.bind(
            transformRoomTypes,
            bookingInstance.roomTypes
        ),
        house: await transformHouse.bind(transformHouse, bookingInstance.house),
        guests: await transformGuests.bind(
            transformGuests,
            bookingInstance.guests
        )
    };
};

export const transformbooking = async (
    bookingId: string | Types.ObjectId
): Promise<booking | null> => {
    const bookingInstance = await bookingModel.findById(bookingId);
    if (bookingInstance) {
        return await extractbooking(bookingInstance);
    } else {
        return null;
    }
};

export const extractGuest = async (
    guest: InstanceType<GuestSchema>
): Promise<Guest> => {
    const temp: any = {
        ...guest
    };
    return {
        ...temp._doc,
        _id: guest._id,
        booking: await transformbooking.bind(
            transformbooking,
            temp._doc.booking
        ),
        house: await transformHouse.bind(transformHouse, temp._doc.house),
        roomType: await transformRoomType.bind(
            transformRoomType,
            temp._doc.roomType
        ),
        allocatedRoom: temp._doc.allocatedRoom
            ? await transformRoom.bind(transformRoom, temp._doc.allocatedRoom)
            : null,
        isSettleable: await guest.verifySettleable()
    };
};

export const transformGuest = async (
    guestId: string | Types.ObjectId
): Promise<Guest | null> => {
    const guest = await GuestModel.findById(guestId);
    if (guest) {
        return await extractGuest(guest);
    } else {
        return null;
    }
};

export const transformGuests = async (
    guestIds: Array<string | Types.ObjectId>
): Promise<Guest[]> => {
    const objIds: Types.ObjectId[] = guestIds.map(
        guestId => new Types.ObjectId(guestId)
    );
    const guests = await GuestModel.find({ _id: { $in: objIds } });
    const result = await Promise.all(
        guests.map(async guest => {
            return await extractGuest(guest);
        })
    );
    return result;
};

export const extractGuests = async (
    guestInstances: Array<InstanceType<GuestSchema>>
): Promise<Guest[]> => {
    return await Promise.all(
        guestInstances.map(async guestInstance => {
            return await extractGuest(guestInstance);
        })
    );
};

export const extractBlock = async (
    blockInstance: InstanceType<BlockSchema>
): Promise<Block> => {
    return {
        ...(blockInstance as any)._doc,
        _id: blockInstance._id,
        house: await transformHouse.bind(transformHouse, blockInstance.house),
        allocatedRoom: await transformRoom.bind(
            transformRoom,
            blockInstance.allocatedRoom
        )
    };
};

export const extractBlocks = async (
    blockInstances: Array<InstanceType<BlockSchema>>
): Promise<Block[]> => {
    return await Promise.all(
        blockInstances.map(
            async blockInstance => await extractBlock(blockInstance)
        )
    );
};

export const extractbookings = async (
    bookings: Array<InstanceType<BookingSchema>>
): Promise<booking[]> => {
    return await Promise.all(
        bookings.map(
            async (bookingInstance): Promise<booking> => {
                return await extractbooking(bookingInstance);
            }
        )
    );
};

export const extractHostApp = async (
    hostAppInstance: InstanceType<HostApplicationSchema>
): Promise<HostApplication> => {
    const temp: any = {
        ...hostAppInstance
    };
    return {
        ...temp._doc,
        house: await transformHouse.bind(transformHouse, hostAppInstance.house),
        user: await transformUser.bind(transformUser, hostAppInstance.user)
    };
};

export const transformHostApp = async (
    hostAppId: Types.ObjectId | string | undefined | null
): Promise<HostApplication | null> => {
    const hostAppInstance = await HostApplicationModel.findById(hostAppId);
    if (!hostAppInstance) {
        return null;
    }
    return await extractHostApp(hostAppInstance);
};
