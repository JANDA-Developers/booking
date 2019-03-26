export const applyDaysToBinary = (val: number) => {
    return parseInt(`${val}`, 0)
        .toString(2)
        .padStart(7, "0");
};