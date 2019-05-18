import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel, BookerSchema } from "../models/Booker";
import { GuestModel, GuestSchema } from "../models/Guest";
import { BookerInput, Gender, GuestInput, PricingType } from "../types/graph";
import { GuestInputType, ResReturnType } from "../types/types";

export const insertBooker = async (
    args: BookerInput
): Promise<InstanceType<BookerSchema>> => {
    const booker = new BookerModel(args);
    await booker.hashPassword();
    return await booker.save();
};

export const insertGuest = async ({
    bookerId,
    houseId,
    roomId,
    roomTypeId,
    ...args
}: GuestInput): Promise<InstanceType<GuestSchema>> => {
    const guest = new GuestModel({
        house: new Types.ObjectId(houseId),
        booker: new Types.ObjectId(bookerId),
        roomType: new Types.ObjectId(roomTypeId),
        allocatedRoom: (roomId && new Types.ObjectId(roomId)) || undefined,
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
    pricingTypes: PricingType[],
    genders?: Gender[],
    roomIds?: string[]
): Promise<Array<InstanceType<GuestSchema>>> => {
    if (genders && pricingTypes.length !== genders.length) {
        throw new Error("Gender, PricingType의 길이가 다릅니다.");
    }
    const params = pricingTypes.map(
        (pricingType, idx): GuestInputType => {
            return {
                booker: new Types.ObjectId(bookerId),
                booking: new Types.ObjectId(bookingId),
                house: new Types.ObjectId(houseId),
                roomType: new Types.ObjectId(roomTypeId),
                allocatedRoom: roomIds && new Types.ObjectId(roomIds[idx]),
                start,
                end,
                pricingType
            };
        }
    );
    return await GuestModel.insertMany(params);
};

export const deleteGuest = async (
    guestId: Types.ObjectId | string
): Promise<ResReturnType> => {
    try {
        const existingGuest = await GuestModel.findById(guestId);
        if (!existingGuest) {
            return {
                ok: false,
                error: "존재하지 않는 guestId"
            };
        }
        return {
            ok: true,
            error: null
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message
        };
    }
};

export const deleteGuests = async (
    guestIds: Types.ObjectId[]
): Promise<ResReturnType> => {
    try {
        return {
            ok:
                (await GuestModel.deleteMany({ _id: { $in: guestIds } })).ok !==
                undefined,
            error: null
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message
        };
    }
};

export const deleteBooker = async (
    bookerId: Types.ObjectId
): Promise<ResReturnType> => {
    try {
        const existingBooker = await BookerModel.findById(bookerId);
        if (!existingBooker) {
            return {
                error: "존재하지 않는 BookerId",
                ok: false
            };
        }
        await existingBooker.remove();
        return {
            ok: true,
            error: null
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message
        };
    }
};
