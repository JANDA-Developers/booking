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

export type PeriodWithDescription = {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    description?: string | null;
};

export type compareOption = {
    compareScope?: "date" | "time";
    ignoreYear?: boolean;
};

export type Interval = {
    time: number;
    minute: number;
    hour: number;
    date: number;
    year: number;
};
