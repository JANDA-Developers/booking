import { Types } from "mongoose";
import { RoomTypeModel } from "../models/RoomType";

export const privateResolver = resolverFunction => async (
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
            _id: new Types.ObjectId(args.roomTypeId),
            house: new Types.ObjectId(args.houseId)
        });
        if (!existingRoomType) {
            throw new Error("HouseId and RoomTypeId does not Matched!");
        } else {
            context.existingRoomType = existingRoomType;
        }
        return await resolverFunction(parent, args, context, info);
    });

export const privateResolverForSU = resolverFunction =>
    privateResolver(async (parent, args, context, info) => {
        const user = context.req.user;
        if (user.userRole !== "ADMIN") {
            return {
                ok: false,
                error: "You are not SuperUser",
                result: null
            };
        } // SuperUser 인증
        return await resolverFunction(parent, args, context, info);
    });

export const privateResolverForHostApp = resolverFunction => async (
    parent,
    args,
    context,
    info
) => {
    if (!context.req.house) {
        throw new Error("Unauthorized House");
    }
    return await resolverFunction(parent, args, context, info);
};
export const privateResolverForHouseAccess = resolverFunction => async (
    parent,
    args,
    context,
    info
) => {
    if (!context.req.house) {
        throw new Error("Unauthorized House");
    }
    return await resolverFunction(parent, args, context, info);
};
