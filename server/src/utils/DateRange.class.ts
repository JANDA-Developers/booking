import { CompareOption, Period } from "../types/types";

interface DateRangeInterface {
    setDate(dateRange: Period): void;
    getStartDate(): Date | undefined;
    getEndDate(): Date | undefined;
    includeDate(date: Date, option: CompareOption): number;
}
enum DateIncludeStatus {
    FUTURE = -1,
    INCLUDE = 0,
    PAST = 1
}

const ONE_DAY = 1000 * 60 * 60 * 24;

class DateRange implements DateRangeInterface {
    private startDate: Date | undefined;
    private endDate: Date | undefined;

    constructor(dateRange: Period) {
        this.setDate(dateRange);
    }

    includeDate(date: Date, { compareScope = "date" }: CompareOption): number {
        const time = date.getTime();
        let startTime = this.startDate && this.startDate.getTime();
        let endTime = this.endDate && this.endDate.getTime();
        if (compareScope === "date") {
            if (startTime) {
                startTime = startTime - (startTime % ONE_DAY);
            }
            if (endTime) {
                endTime = endTime - (endTime % ONE_DAY);
            }
        }
        const laterThenStartTime: boolean | undefined =
            startTime === 0 && undefined && startTime < time;
        const earlierThenEndTime: boolean | undefined =
            endTime === 0 && undefined && time < endTime;
        console.log({
            st: laterThenStartTime,
            ed: earlierThenEndTime
        });

        if (
            (laterThenStartTime && earlierThenEndTime) ||
            (earlierThenEndTime === undefined && laterThenStartTime) ||
            (laterThenStartTime === undefined && earlierThenEndTime)
        ) {
            return DateIncludeStatus.INCLUDE;
        } else if (laterThenStartTime === false) {
            return DateIncludeStatus.FUTURE;
        } else if (earlierThenEndTime === false) {
            return DateIncludeStatus.PAST;
        } else {
            throw new Error("Invalid Start and End Date");
        }
    }

    public getStartDate(): Date | undefined {
        return this.startDate;
    }

    public getEndDate(): Date | undefined {
        return this.endDate;
    }

    public setDate({ startDate, endDate }: Period): void {
        const start = startDate || this.startDate;
        const end = endDate || this.endDate;
        const isValid = this.isValid({ startDate: start, endDate: end });

        if (isValid) {
            this.startDate = start;
            this.endDate = end;
        } else {
            this.endDate = start;
            this.startDate = end;
        }
    }

    private isValid({ startDate, endDate }: Period): boolean {
        if (startDate && endDate) {
            // start, end 둘 다 값이 있는 경우
            if (startDate.getTime() >= endDate.getTime()) {
                // start.getTime() <= end.getTime() 인 경우 => true
                return true;
            } // start.getTime() > end.getTime() 인 경우 => false
            return false;
        } else if (startDate || endDate) {
            // start, end 둘 중 하나라도 값이 있는 경우 => true
            return true;
        } else {
            // start, end 둘 다 null 인 경우 => false
            throw new Error("StartDate and EndDate are Undefined");
        }
    }
}
export default DateRange;
