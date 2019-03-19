export type SMSResult = {
    ok: boolean;
    error: string | null;
    msgId: string | null;
    msgType: string;
};

export type DateRangeStatusType = "PAST" | "PRESENT" | "FUTURE";

export type Period = {
    startDate: Date;
    endDate: Date;
};

export type PeriodWithDescription = {
    startDate: Date;
    endDate: Date;
    description?: string | null;
};

export type compareScope = "ymd" | "md" | "ymdhi" | "mdhi";
