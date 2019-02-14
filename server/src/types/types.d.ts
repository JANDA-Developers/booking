export type pricingType = "DOMITORY" | "ROOM";

export type target = "PHONE" | "EMAIL";

export type houseType =
    | "GUEST_HOUSE"
    | "HOSTEL"
    | "HOTEL"
    | "MOTEL"
    | "PENSION"
    | "YOUTH_HOSTEL";

export type SMSResult = {
    ok: boolean;
    error: string | null;
    msgId: string | null;
    msgType: string;
};