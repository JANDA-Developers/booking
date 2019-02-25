import { ObjectId } from "bson";
import { extractRoomType } from "../../../models/Merge";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    ChangeIndexMutationArgs,
    ChangeIndexResponse,
    UpdateRoomTypeMutationArgs,
    UpdateRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolver: Resolvers = {
    Mutation: {
        UpdateRoomType: async (
            _,
            args: UpdateRoomTypeMutationArgs,
            { req }
        ): Promise<UpdateRoomTypeResponse> => {
            try {
                const { user } = req;
                const existingRoomType = await RoomTypeModel.findOneAndUpdate(
                    {
                        _id: args.roomTypeId,
                        user: new ObjectId(user._id)
                    },
                    {
                        ...args
                    },
                    {
                        new: true
                    }
                );
                if (existingRoomType) {
                    const roomType = await extractRoomType(existingRoomType);
                    return {
                        ok: true,
                        error: null,
                        roomType: {
                            ...roomType
                        }
                    };
                } else {
                    return {
                        ok: false,
                        error: "Invalid RoomTypeId",
                        roomType: null
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    roomType: null
                };
            }
        },
        ChangeIndex: async (
            _,
            args: ChangeIndexMutationArgs,
            { req }
        ): Promise<ChangeIndexResponse> => {
            const { user } = req;
            try {
                const existingRoomType = await RoomTypeModel.findOne({
                    _id: args.roomTypeId,
                    user: new ObjectId(user._id)
                });
                if (existingRoomType) {
                    await existingRoomType.update({
                        index: args.index
                    });
                    const gt = args.index;
                    const lt = existingRoomType.index;
                    let increment = 1;
                    let indexCondition: any;
                    if (gt > lt) {
                        increment = -1;
                        indexCondition = { $gt: lt, $lte: gt };
                    } else {
                        indexCondition = { $gte: gt, $lt: lt };
                    }
                    await RoomTypeModel.updateMany(
                        {
                            _id: { $ne: new ObjectId(args.roomTypeId) },
                            index: indexCondition
                        },
                        { $inc: { index: increment } },
                        { new: true }
                    );
                    return {
                        ok: true,
                        error: null
                    };
                } else {
                    return {
                        ok: false,
                        error: "RoomType does not exist"
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};

export default resolver;
