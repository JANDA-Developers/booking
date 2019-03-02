import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { RoomTypeModel, RoomTypeSchema } from "../../../models/RoomType";
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
