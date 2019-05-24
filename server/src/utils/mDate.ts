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

export const getDateArr = (start: Date, end: Date): Date[] => {
    const result = [start];
    let i = 0;
    const st = new Date(result[0]);
    while (result[i].getTime() < end.getTime()) {
        st.setDate(st.getDate() + i);
        result.push(st);
        i++;
    }
    return result;
};
