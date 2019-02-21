import { ObjectId } from "bson";
import { extractRoomType } from "../../../models/Merge";
import { RoomTypeModel } from "../../../models/RoomType";
import {
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
        }
    }
};

export default resolver;
