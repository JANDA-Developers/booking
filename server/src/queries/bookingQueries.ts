import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { BookerModel, BookerSchema } from "../models/Booker";
import { GuestModel, GuestSchema } from "../models/Guest";
import { BookerInput, Gender, GuestInput, GuestType } from "../types/graph";
import { GuestInputType } from "../types/types";

export const insertBooker = async (
    args: BookerInput
): Promise<InstanceType<BookerSchema>> => {
    const booker = new BookerModel(args);
    await booker.hashPassword();
    return await booker.save();
};

export const insertGuest = async ({
    bookerId,
    bookingId,
    houseId,
    roomId,
    roomTypeId,
    ...args
}: GuestInput): Promise<InstanceType<GuestSchema>> => {
    const guest = new GuestModel({
        house: new ObjectId(houseId),
        booker: new ObjectId(bookerId),
        roomType: new ObjectId(roomTypeId),
        booking: (bookingId && new ObjectId(bookingId)) || undefined,
        allocatedBed: (roomId && new ObjectId(roomId)) || undefined,
        ...args
    });
    return await guest.save();
};

export const insertGuests = async (
    houseId: string,
    bookerId: string,
    bookingId: string,
    roomTypeId: string,
    start: Date,
    end: Date,
    guestTypes: GuestType[],
    genders?: Gender[],
    roomIds?: string[]
): Promise<Array<InstanceType<GuestSchema>>> => {
    if (genders && guestTypes.length !== genders.length) {
        throw new Error("Gender, GuestType의 길이가 다릅니다.");
    }
    const params = guestTypes.map(
        (guestType, idx): GuestInputType => {
            return {
                booker: new ObjectId(bookerId),
                booking: new ObjectId(bookingId),
                house: new ObjectId(houseId),
                roomType: new ObjectId(roomTypeId),
                allocatedBed: roomIds && new ObjectId(roomIds[idx]),
                start,
                end,
                guestType
            };
        }
    );
    return await GuestModel.insertMany(params);
};
