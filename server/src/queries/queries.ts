export interface SelectNumberRangeReturn {
    condition: any;
    increment: number;
}

export const selectNumberRange = (
    origin: number,
    target: number
): SelectNumberRangeReturn => {
    // TODO: 여기서부터 하면 될듯하다 ㅎㅎ
    let increment = 1;
    let condition: any;
    if (origin > target) {
        increment = -1;
        condition = { $gt: target, $lte: origin };
    } else {
        condition = { $gte: origin, $lt: target };
    }
    return {
        condition,
        increment
    };
};
