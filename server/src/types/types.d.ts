import { GuestType } from "./graph";
import { ObjectId } from "bson";

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
    booker: ObjectId;
    booking: ObjectId;
    house: ObjectId;
    roomType: ObjectId;
    room?: ObjectId;
    start: Date;
    end: Date;
    guestType: GuestType;
};
