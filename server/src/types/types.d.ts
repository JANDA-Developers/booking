export type SMSResult = {
    ok: boolean;
    error: string | null;
    msgId: string | null;
    msgType: string;
};

export type DateRangeStatusType = "PAST" | "PRESENT" | "FUTURE";

export type Period = {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
};

export type CompareOption = {
    compareScope?: "date" | "time";
};
