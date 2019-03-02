import { ObjectId } from "bson";
import { RoomTypeModel } from "../models/RoomType";

const privateResolver = resolverFunction => async (
    parent,
    args,
    context,
    info
) => {
    if (!context.req.user) {
        throw new Error("Unauthorized");
    }
    return await resolverFunction(parent, args, context, info);
};

export const privateRoomTypeExistCheckResolver = resolverFunction =>
    privateResolver(async (parent, args, context, info) => {
        const existingRoomType = await RoomTypeModel.findOne({
            _id: new ObjectId(args.roomTypeId),
            house: new ObjectId(args.houseId)
        });
        if (!existingRoomType) {
            throw new Error("HouseId and RoomTypeId does not Matched!");
        }else{
            context.existingRoomType = existingRoomType;
        }
        return await resolverFunction(parent, args, context, info);
    });

export default privateResolver;
