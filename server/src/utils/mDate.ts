import { ONE_DAY } from "./variables";

// 1년중 몇째 날인지 계산 ㄱㄱ
export const dayOfYear = (cur: Date): number => {
    const start = new Date(cur.getFullYear(), 0, 0);
    const diff =
        cur.getTime() -
        start.getTime() +
        (start.getTimezoneOffset() - cur.getTimezoneOffset()) * 60 * 1000;
    return Math.floor(diff / ONE_DAY);
};
