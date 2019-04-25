import { Types } from "mongoose";
import { GuestType } from "./graph";

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

export type GuestInputType = {
    booker: Types.ObjectId;
    booking: Types.ObjectId;
    house: Types.ObjectId;
    roomType: Types.ObjectId;
    allocatedBed?: Types.ObjectId;
    start: Date;
    end: Date;
    guestType: GuestType;
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
