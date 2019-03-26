import { ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_YEAR } from "../utils/variables";

type outputType = "date" | "hour" | "minute";

class DateRange {
    start: Date;
    end: Date;
    timezone: string;

    constructor(start: Date, end: Date) {
        this.setDates(start, end);
    }

    public setDates(start: Date, end: Date) {
        if (start.getTime() <= end.getTime()) {
            this.start = start;
            this.end = end;
        } else {
            this.end = start;
            this.start = end;
        }
    }

    /**
     * ignoreYear = true 일때는 결과값이 0보다 작을 수 있음. 0보다 작을 때는 end~start까지를 제외한 나머지 날짜를 포함하는 경우.
     * @param type 리턴 타입 지정.
     * @param ignoreYear true => 년도를 모두 동일하게 지정하고 계산함.
     */
    public parseInterval(opt: "MD" | "MDHI"): number {
        const result = this.getEnd(opt) - this.getStart(opt);
        if (opt === "MD") {
            return result / ONE_DAY;
        } else {
            return result / ONE_MINUTE;
        }
    }

    public isOverlapRange(
        target: DateRange,
        type: outputType,
        ignoreYear: boolean
    ): number {
        return 0;
    }

    public isOverlapDate(
        target: Date,
        type: outputType,
        ignoreYear: boolean
    ): number {
        return 0;
    }

    /**
     * start 가지고 출력함 ㅎㅎ
     * date 단위로 출력함.
     * @param option 출력 옵션 => MD: 달, 일만 가지고 출력, MDHI => 달일시분 출력
     */
    public getStart(option: "MD" | "MDHI") {
        const temp = {
            Y: this.start.getFullYear() * ONE_YEAR * 365,
            HI:
                this.start.getHours() * ONE_HOUR * 24 +
                this.start.getMinutes() * ONE_MINUTE
        };
        let result = this.start.getTime();
        if (option.indexOf("Y") === -1) {
            result = result - temp.Y;
        }
        if (option.indexOf("HI") === -1) {
            result = result - temp.HI;
        }
        return result;
    }

    /**
     * start 가지고 출력함 ㅎㅎ
     * @param option 출력 옵션 => MD: 달, 일만 가지고 출력, MDHI => 달일시분 출력
     */
    public getEnd(option: "MD" | "MDHI") {
        const temp = {
            Y: this.end.getFullYear() * ONE_YEAR * 365,
            HI:
                this.end.getHours() * ONE_HOUR * 24 +
                this.end.getMinutes() * ONE_MINUTE
        };
        let result = this.end.getTime();
        if (option.indexOf("Y") === -1) {
            result = result - temp.Y;
        }
        if (option.indexOf("HI") === -1) {
            result = result - temp.HI;
        }
        return result;
    }

    public compareStart(date: Date, opt: "MD" | "MDHI"): number {
        let unit = ONE_DAY
        if (opt === "MDHI") {
            // start - date
            unit = ONE_HOUR;
        }
        return Math.floor(this.start.getTime() / unit) - Math.floor(date.getTime() / unit);
    }

    public compareEnd(date: Date, type: outputType): number {
        const divider =
            (type === "minute" && ONE_MINUTE) ||
            (type === "hour" && ONE_HOUR) ||
            ONE_DAY;
        return (
            Math.floor(this.end.getTime() / divider) -
            Math.floor(date.getTime() / divider)
        );
    }

    public getParams() {
        return {
            startDate: this.start,
            endDate: this.end
        };
    }
}
export default DateRange;
