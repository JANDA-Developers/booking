import { DateRange as DR } from "../types/graph";
import { compareOption, Interval, Period } from "../types/types";

interface DateRangeInterface {
    setDate(dateRange: Period, option: compareOption): void;
    getStartDate(): Date | undefined;
    getEndDate(): Date | undefined;
    getHashCode(): number;
    compareDate(date: Date): string;
    isOverlap(dateRange: DateRange): boolean;
    interval(date: Date, target: "start" | "end"): Interval;
    getParams(): object;
}
enum DateIncludeStatus {
    FUTURE = "FUTURE",
    INCLUDE = "INCLUDE",
    PAST = "PAST"
}

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

class DateRange implements DateRangeInterface {
    private startDate: Date | undefined;
    private endDate: Date | undefined;
    private hashCode: number;
    private option: compareOption = {
        compareScope: "date",
        ignoreYear: false
    };

    constructor(dateRange: Period, option?: compareOption) {
        console.log({
            dateRange
        });

        this.setDate(dateRange, option);
    }

    public getParams(): DR {
        return {
            hashCode: this.hashCode,
            startDate: this.startDate && this.startDate.getTime(),
            endDate: this.endDate && this.endDate.getTime()
        };
    }

    /**
     * 
     * @param dateRange 비교할 대상
     */
    isOverlap(dateRange: DateRange): boolean {
        const startDateIsOverlap =
            dateRange.startDate && this.compareDate(dateRange.startDate);
        const endDateIsOverlap =
            dateRange.endDate && this.compareDate(dateRange.endDate);
        if (
            startDateIsOverlap === DateIncludeStatus.FUTURE ||
            endDateIsOverlap === DateIncludeStatus.PAST
        ) {
            return false;
        } else if (!startDateIsOverlap && !endDateIsOverlap) {
            throw new Error("Both Values are 'undefined'");
        }
        return true;
    }

    /**
     * -1, 0, 1 리턴함.
     * 언제나 DateRange 를 기준으로 비교한다.
     * DateRange를 기준으로 date가 FUTURE, INCLUDE, PAST 중 어디에 위치하여있는지 출력함
     * @param date 비교할 날짜
     */
    compareDate(date: Date): string {
        let startTime = this.startDate && this.startDate.getTime();
        let endTime = this.endDate && this.endDate.getTime();
        const objDate = this.getScopeDate(date);

        if (this.option.compareScope === "date") {
            if (startTime) {
                startTime = startTime - (startTime % ONE_DAY);
            }
            if (endTime) {
                endTime = endTime - (endTime % ONE_DAY);
            }
        }

        const laterThenStartTime: boolean | undefined = this.compareIsTrue(
            this.startDate,
            objDate
        );

        const earlierThenEndTime: boolean | undefined = this.compareIsTrue(
            objDate,
            this.endDate
        );

        console.log({
            laterThenStartTime,
            earlierThenEndTime
        });

        if (laterThenStartTime && earlierThenEndTime) {
            return DateIncludeStatus.INCLUDE;
        } else if (
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

    /**
     * Interval을 리턴함.
     * date > compareTarget => -
     * date < compareTarget => +
     * @param date 비교할 대상 날짜
     * @param compareTarget startDate, endDate 둘 중 어느것과 비교할지 선택
     */
    public interval(
        date: Date,
        compareTarget: "start" | "end" = "start"
    ): Interval {
        const target =
            compareTarget === "start" ? this.startDate : this.endDate;
        const result = {
            date: 0,
            hour: 0,
            minute: 0,
            year: 0,
            time: 0
        };
        if (target) {
            // 현재 타임 스코프에 맞는 date를 구한다.
            const objDate = this.getScopeDate(date);
            const intervalTime = target.getTime() - objDate.getTime();
            result.time = intervalTime;
            result.hour = Math.floor(intervalTime / ONE_HOUR);
            result.minute = Math.floor(intervalTime / ONE_MINUTE);
            result.date = Math.floor(intervalTime / ONE_DAY);
            result.date = Math.floor(intervalTime / (ONE_DAY * 365));
        }
        return result;
    }

    public getHashCode(): number {
        return this.hashCode;
    }

    public getStartDate(): Date | undefined {
        return this.startDate;
    }

    public getEndDate(): Date | undefined {
        return this.endDate;
    }

    /**
     * 필드의 startDate, endDate 변수 할당을 위한 함수
     * @param param0 startDate, endDate
     * @param option compareOption 참조
     */
    public setDate(
        { startDate, endDate }: Period,
        option?: compareOption
    ): void {
        const start = (startDate && new Date(startDate)) || this.startDate;
        const end = (endDate && new Date(endDate)) || this.endDate;
        if (start) {
            start.setTime(this.getScopeDate(start).getTime());
        }
        if (end) {
            end.setTime(this.getScopeDate(end).getTime());
        }
        const isValid = this.isValid({ startDate: start, endDate: end });
        if (isValid) {
            this.startDate = start;
            this.endDate = end;
        } else {
            this.endDate = start;
            this.startDate = end;
        }
        if (option) {
            this.option = option;
        }
        this.setHashCode();
    }

    /**
     * startDate, endDate 를 16진법으로 바꾼 뒤 this.hashCode 변수에 값을 할당함.
     */
    private setHashCode(): void {
        // 16진법으로 출력하여 이어 붙이면 될듯하다
        // startDate, endDate 중 undefined 변수가 있다면 0으로 바꿈
        const startHash = this.makeDateToHex(
            this.startDate,
            this.option.compareScope || "date"
        );
        const endHash = this.makeDateToHex(
            this.endDate,
            this.option.compareScope || "date"
        );

        this.hashCode = parseInt(startHash + endHash, 16);
    }

    /**
     * 날짜를 16진법 숫자로 표시해줌
     * @param date 날짜 객체
     * @param scope date, time 둘중 하나
     */
    private makeDateToHex(
        date: Date | undefined,
        scope: "date" | "time"
    ): string {
        // 4~5자리 16진수
        const scopeUnit: number = scope === "date" ? ONE_DAY : ONE_MINUTE;
        return date
            ? Math.floor(new Date(date).getTime() / scopeUnit).toString(16)
            : "0";
    }

    /**
     * startDate, endDate 둘다 undefined 일때 에러남...
     * @param param0 startDate, endDate를 받음...
     */
    private isValid({ startDate, endDate }: Period): boolean {
        if (startDate && endDate) {
            // start, end 둘 다 값이 있는 경우
            if (startDate.getTime() <= endDate.getTime()) {
                // start.getTime() <= end.getTime() 인 경우 => true
                return true;
            } // start.getTime() > end.getTime() 인 경우 => false
            return false;
        } else if (startDate || endDate) {
            // start, end 둘 중 하나라도 값이 있는 경우 => true
            return true;
        } else {
            // start, end 둘 다 undefined 인 경우 => false
            throw new Error("StartDate and EndDate are Undefined");
        }
    }

    private compareIsTrue(
        early: Date | undefined,
        late: Date | undefined
    ): boolean | undefined {
        if (early && late) {
            return early.getTime() <= late.getTime();
        } else {
            return undefined;
        }
    }

    private getScopeDate(date: Date): Date {
        if (date) {
            const result = date;
            switch (this.option.compareScope) {
                case "date":
                    result.setHours(0);
                    result.setMinutes(0);
                case "time":
                    result.setSeconds(0);
                    result.setMilliseconds(0);
                default:
                    break;
            }
            return result;
        }
        return date;
    }
}
export default DateRange;
