import { Types } from "mongoose";
import { Guest, PricingType, Room, RoomType } from "./graph";

export type SMSResult = {
    ok: boolean;
    error: string | null;
    msgId: string | null;
    msgType: string;
};

export type Period = {
    startDate: Date;
    endDate: Date;
};

export type compareScope = "ymd" | "md" | "ymdhi" | "mdhi";

export type ResReturnType = {
    ok: boolean;
    error: string | null;
};

export type GuestInputType = {
    booker: Types.ObjectId;
    booking: Types.ObjectId;
    house: Types.ObjectId;
    roomType: Types.ObjectId;
    allocatedRoom?: Types.ObjectId;
    start: Date;
    end: Date;
    pricingType: PricingType;
};

export type DayOfWeekPriceType = {
    price: number;
    applyDays: string;
};

export type Allocation = {
    start: Date;
    end: Date;
    bed: Bed;
    guest: Guest;
};

export type AllocatedGuest = {
    room: Room;
    start: Date;
    end: Date;
    guests: Guest[];
};
