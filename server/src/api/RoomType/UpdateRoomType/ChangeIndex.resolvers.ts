import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { RoomTypeModel, RoomTypeSchema } from "../../../models/RoomType";
import { selectNumberRangeQuery } from "../../../queries/queries";
import {
    ChangeIndexMutationArgs,
    ChangeIndexResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateRoomTypeExistCheckResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        ChangeIndex: privateRoomTypeExistCheckResolver(
            async (
                _,
                args: ChangeIndexMutationArgs,
                context
            ): Promise<ChangeIndexResponse> => {
                try {
                    const existingRoomType: InstanceType<RoomTypeSchema> =
                        context.existingRoomType;
                    // 우선 존재하는 roomType의 index를 먼저 업데이트함.
                    await existingRoomType.update({
                        index: args.index
                    });
                    const conditions = selectNumberRangeQuery(
                        args.index,
                        existingRoomType.index
                    );

                    await RoomTypeModel.updateMany(
                        {
                            _id: { $ne: new Types.ObjectId(args.roomTypeId) },
                            index: conditions.condition
                        },
                        { $inc: { index: conditions.increment } },
                        { new: true }
                    );
                    return {
                        ok: true,
                        error: null
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
};

export default resolvers;
