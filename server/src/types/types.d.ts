export type pricingType = "DOMITORY" | "ROOM";

export type SMSResult = {
    ok: boolean;
    error: string | null;
    msgId: string | null;
    msgType: string;
};
