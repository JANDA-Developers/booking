import { Types } from "mongoose";
import { RoomTypeModel } from "../models/RoomType";
import { UserRoleEnum } from "../models/User";

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
        if (
            user.userRole !== UserRoleEnum.ADMIN &&
            !user.userRoles.includes(UserRoleEnum.ADMIN)
        ) {
            return {
                ok: false,
                error: "You are not SuperUser",
                result: null
            };
        } // SuperUser 인증
        return await resolverFunction(parent, args, context, info);
    });

export const privateResolverForPublicAccess = resolverFunction => async (
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

// TODO 여기부터 ㄱㄱ
export const privateResolverForHost = resolverFunction =>
    privateResolver(async (parent, args, context, info) => {
        const user = context.req.user;
        if (
            user.userRole !== UserRoleEnum.HOST &&
            !user.userRoles.includes(UserRoleEnum.HOST)
        ) {
            return {
                ok: false,
                error: "You are not SuperUser",
                result: null
            };
        } // SuperUser 인증
        return await resolverFunction(parent, args, context, info);
    });
