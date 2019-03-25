import { DateRange as DR } from "../types/graph";
import { compareScope, Period } from "../types/types";
import {
    DateElement,
    transformDateToDateElement
} from "../utils/transformData";
import { ONE_DAY, ONE_MINUTE } from "../utils/variables";

interface DateRangeInterface {
    setDate(dateRange: Period, opt?: "date" | "time"): void;
    getStart(): DateElement;
    getEnd(): DateElement;
    getHashCode(): number;
    isOverlap(dateRange: DateRange): boolean;
    interval(
        date: DateElement,
        target?: "start" | "end",
        scope?: compareScope
    ): number;
    include(date: Date | DateElement, scope: compareScope): number;
    getParams(scope?: compareScope): object;
}

class DateRange implements DateRangeInterface {
    private start: DateElement;
    private end: DateElement;
    private hashCode: number;

    constructor(dateRange: Period, opt: "date" | "time" = "date") {
        this.setDate(dateRange, opt);
    }

    public getParams(scope: compareScope = "ymd"): DR {
        return {
            hashCode: this.hashCode,
            startDate: this.start.getTime(scope),
            endDate: this.end.getTime(scope)
        };
    }

    /**
     *
     * @param dateRange 비교할 대상
     * @param scope 어떤 방식으로 비교할지...
     */
    isOverlap(dateRange: DateRange, scope: compareScope = "ymd"): boolean {
        // interval을 구해서 start보다 크고 end 보다 작으면 됨
        const includeTargetStart = this.include(dateRange.getStart(), scope);
        const includeTargetEnd = this.include(dateRange.getEnd(), scope);
        if (includeTargetEnd === 0 || includeTargetStart === 0) {
            return true;
        } else if (includeTargetEnd !== includeTargetStart) {
            return true;
        } else {
            return false;
        }
    }

    include(date: Date | DateElement, scope: compareScope = "ymd"): number {
        const target: DateElement =
            date instanceof Date ? transformDateToDateElement(date) : date;
        const startInterval = this.start.compare(target, scope);
        const endInterval = this.end.compare(target, scope);
        if (startInterval < 0 && endInterval > 0) {
            return 0;
        } else if (startInterval < 0 && endInterval < 0) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * Interval을 리턴함.
     * date > compareTarget => -
     * date < compareTarget => +
     * @param date 비교할 대상 날짜
     * @param compareTarget startDate, endDate 둘 중 어느것과 비교할지 선택
     * @param compareScope
     */
    public interval(
        date: DateElement | Date,
        compareTarget: "start" | "end" = "start",
        scope: compareScope = "ymd"
    ): number {
        const obj =
            date instanceof Date ? transformDateToDateElement(date) : date;
        const target = compareTarget === "start" ? this.start : this.end;
        return obj.compare(target, scope);
    }

    public getHashCode(): number {
        return this.hashCode;
    }

    public getStart(): DateElement {
        return this.start;
    }

    public getEnd(): DateElement {
        return this.end;
    }

    public setDate(
        { startDate, endDate }: Period,
        opt: "date" | "time" = "date"
    ): void {
        startDate.setMilliseconds(0);
        endDate.setMilliseconds(0);
        startDate.setSeconds(0);
        endDate.setSeconds(0);
        const isValid = startDate.getTime() <= endDate.getTime();
        const start = new Date(isValid ? startDate : endDate);
        const end = new Date(isValid ? endDate : startDate);
        this.setHashCode(opt);
        this.start = transformDateToDateElement(start);
        this.end = transformDateToDateElement(end);
    }

    /**
     * startDate, endDate 를 16진법으로 바꾼 뒤 this.hashCode 변수에 값을 할당함.
     */
    private setHashCode(opt: "date" | "time" = "date"): void {
        // 16진법으로 출력하여 이어 붙이면 될듯하다
        // startDate, endDate 중 undefined 변수가 있다면 0으로 바꿈
        const startHash = this.makeDateToHex(this.start.date, opt);
        const endHash = this.makeDateToHex(this.end.date, opt);

        this.hashCode = parseInt(startHash + endHash, 16);
    }

    /**
     * 날짜를 16진법 숫자로 표시해줌
     * @param date 날짜 객체
     * @param scope date, time 둘중 하나
     */
    private makeDateToHex(date: Date, scope: "date" | "time"): string {
        // 4~5자리 16진수
        const scopeUnit: number = scope === "date" ? ONE_DAY : ONE_MINUTE;
        return Math.floor(new Date(date).getTime() / scopeUnit).toString(16);
    }
}
export default DateRange;
