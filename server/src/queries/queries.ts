interface DuplicateRangeParams {
    startDate: number;
    endDate: number;
    className?: "disableRanges" | "dateRanges";
}

export const dateRangeDuplicateCheckQuery = ({
    startDate,
    endDate,
    className = "dateRanges"
}: DuplicateRangeParams): any => {
    return {
        [className]: {
            $elemMatch: {
                $or: [
                    {
                        $or: [
                            {
                                startDate: {
                                    $gte: startDate || 0,
                                    $lt: endDate || startDate * 3
                                }
                            },
                            {
                                endDate: {
                                    $gt: startDate || 0,
                                    $lte: endDate || startDate * 3
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            {
                                startDate: {
                                    $lte: startDate || 0
                                }
                            },
                            {
                                endDate: {
                                    $gte: endDate || startDate * 3
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
};

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
