import { Types } from "mongoose";
import { Stage } from "../../types/aggregationStage";
import { Gender } from "../../types/graph";
import { pipelineRoomCapacity } from "./roomCapacityAggregation";

interface GetRoomTypeCapacityParams {
    roomTypeId: Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
    initValue?: {
        count: number;
        gender: Gender;
    };
}

export { pipelineRoomTypeCapacity, GetRoomTypeCapacityParams };

const pipelineRoomTypeCapacity = ({
    roomTypeId,
    checkIn,
    checkOut,
    initValue
}: GetRoomTypeCapacityParams): Stage[] => {
    const pipeline = [
        ...pipelineRoomCapacity({
            roomTypeId,
            checkIn,
            checkOut,
            initValue
        }),
        {
            $group: {
                _id: {
                    _id: "$_id",
                    genders: "$genders",
                    roomGender: "$roomGender",
                    pricingType: "$pricingType"
                },
                beds: {
                    $push: "$beds"
                }
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        "$_id",
                        {
                            beds: "$beds"
                        }
                    ]
                }
            }
        },
        {
            $facet: {
                roomCapacityList: [
                    {
                        $project: {
                            roomGender: 0,
                            pricingType: 0
                        }
                    }
                ],
                availableGenders: [
                    {
                        $unwind: {
                            path: "$genders",
                            preserveNullAndEmptyArrays: false
                        }
                    },
                    {
                        $project: {
                            gender: "$genders",
                            count: {
                                $size: "$beds"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$gender",
                            count: {
                                $sum: "$count"
                            }
                        }
                    }
                ],
                availableCount: [
                    {
                        $project: {
                            count: {
                                $size: "$beds"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            count: {
                                $sum: "$count"
                            }
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                availableCount: {
                    $arrayElemAt: ["$availableCount.count", 0]
                }
            }
        }
    ];
    return pipeline;
};
