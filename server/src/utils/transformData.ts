import { compareScope } from "../types/types";
import { ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_YEAR, TimeUnit } from "./variables";

export const transformDate = (date: string): string => {
    return new Date(date).toISOString();
};

export interface DateElement {
    date: Date;
    y: () => number;
    m: () => number;
    d: () => number;
    h: () => number;
    i: () => number;
    getTime(opt?: compareScope): number;
    /**
     * 0을 리턴하면 같음
     * 음수인 경우에 DateElement 보다 target이 더 과거날짜
     * 양수인 경우 미래
     * @param target 비교 대상 날짜
     * @param opt 년,월,일,시,분 => 어디까지 비교할거니?
     */
    compare(target: DateElement, scope: compareScope): number;
}

export const floorTime = (
    date: Date | number,
    target: TimeUnit = ONE_DAY
): number => {
    return (
        Math.floor((date instanceof Date ? date.getTime() : date) / target) *
        target
    );
};

export const transformDateToDateElement = (date: Date): DateElement => {
    date.setMilliseconds(0);
    date.setSeconds(0);
    return {
        date,
        y(): number {
            return this.date.getFullYear();
        },
        m(): number {
            return this.date.getMonth();
        },
        d(): number {
            return this.date.getDate();
        },
        h(): number {
            return this.date.getHours();
        },
        i(): number {
            return this.date.getMinutes();
        },
        getTime(scope = "ymd"): number {
            let result = date.getTime();
            if (scope.indexOf("i") === -1) {
                result = result - this.i() * ONE_MINUTE;
            }
            if (scope.indexOf("h") === -1) {
                result = result - this.h() * ONE_HOUR;
            }
            if (scope.indexOf("d") === -1) {
                result = result - this.d() * ONE_DAY;
            }
            if (scope.indexOf("y") === -1) {
                result = result - this.y() * ONE_YEAR;
            }
            return result;
        },
        compare(this: DateElement, target: DateElement, scope = "ymd"): number {
            const compareY = this.y() - target.y();
            const compareM = this.m() - target.m();
            const compareD = this.d() - target.d();
            const compareH = this.h() - target.h();
            const compareI = this.i() - target.i();
            if (scope.indexOf("y") !== -1 && compareY !== 0) {
                return compareY;
            }
            if (scope.indexOf("m") !== -1 && compareM !== 0) {
                return compareM;
            }
            if (scope.indexOf("d") !== -1 && compareD !== 0) {
                return compareD * ONE_DAY;
            }
            if (scope.indexOf("h") !== -1 && compareH !== 0) {
                return compareH * ONE_HOUR;
            }
            if (scope.indexOf("i") !== -1 && compareI !== 0) {
                return compareI * ONE_MINUTE;
            }
            return 0;
            // return this.getTime(scope) - target.getTime(scope);
        }
    };
};

export const transformYMDToMD = (date: Date): number => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const dayOfMonth = d.getDate();
    const md = parseInt(month + String(dayOfMonth).padStart(2, "0"), 10);
    return md;
}

/**
 * 0: 같음, -1: date가 target 보다 작음, 1: date가 target 보다 큼
 * @param date 날짜
 * @param target 비교 기준 날짜
 * @param opt MD: Month & Date / YMD: Year & Month & Date
 */
export const compareDate = (date: Date, target: Date, opt: "MD" | "YMD"): number => {
    if(opt === "YMD"){
        const t1 = date.getTime();
        const t2 = target.getTime();
        const eq = (date.getTime() === target.getTime()) && 0;
        return eq === false ? t1 : t2
    }
    return 0;
}