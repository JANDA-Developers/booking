export const applyDaysToBinaryString = (val: number) => {
    return parseInt(`${val}`, 0)
        .toString(2)
        .padStart(7, "0");
};
export enum DayOfWeekEnum {
    SUN = 1,
    MON = SUN << 1,
    TUE = MON << 1,
    WED = TUE << 1,
    THU = WED << 1,
    FRI = THU << 1,
    SAT = FRI << 1,
    ALL_DAY = (SAT << 1) - 1
}

export const applyDaysToArr = (applyDaysBinary: number): DayOfWeekEnum[] => {
    // val 은 0~127 사이의 숫자
    let val = applyDaysBinary % (1 << 7);
    const result: DayOfWeekEnum[] = [];
    let index = 6;
    while (val > 0) {
        const day = 1 << index;
        if (val >= day) {
            result.push(day);
            val -= day;
        }
        index--;
    }
    return result;
};
export const arrToApplyDays = (arr: Array<number | boolean>): number => {
    return (
        arr
            .map((val, i) => {
                return (val ? 1 : 0) << i;
            })
            .reduce((v1, v2) => {
                return v1 + v2;
            }) % 128
    );
};

/**
 * dayOfWeek가 applyDays에 포함되는지 확인함.
 * @param dayOfWeek 요일
 * @param applyDays 적용되는 요일들
 */
export const isIncludeDayOfWeek = (
    dayOfWeek: number,
    applyDays: number
): boolean => {
    const day = 1 << dayOfWeek;
    const applyDaysArr = applyDaysToArr(applyDays);
    return applyDaysArr.includes(day);
};
