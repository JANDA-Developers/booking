import { Context } from "graphql-yoga/dist/types";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { HouseSchema } from "../../../models/House";
import { addPadding, RoomTypeModel } from "../../../models/RoomType";
import {
    GetAvailableGuestCountQueryArgs,
    GetAvailableGuestCountResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolverForPublicAccess } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAvailableGuestCount: async (
            _,
            params: GetAvailableGuestCountQueryArgs
        ): Promise<GetAvailableGuestCountResponse> => {
            return await getAvailableGuestCount(params);
        },
        GetAvailableGuestCountForBooker: privateResolverForPublicAccess(
            async (
                _,
                params: GetAvailableGuestCountQueryArgs,
                ctx: Context
            ): Promise<GetAvailableGuestCountResponse> => {
                return await getAvailableGuestCount(params, ctx);
            }
        )
    }
};
export default resolvers;
const getAvailableGuestCount = async (
    {
        roomTypeId,
        start,
        end,
        gender,
        paddingOtherGenderCount
    }: GetAvailableGuestCountQueryArgs,
    ctx?: Context
): Promise<GetAvailableGuestCountResponse> => {
    try {
        const roomTypeQuery = { _id: new Types.ObjectId(roomTypeId) };
        if (ctx) {
            const { house }: { house: InstanceType<HouseSchema> } = ctx.req;
            if (house) {
                (roomTypeQuery as any).house = new Types.ObjectId(house._id);
            }
        }
        const roomType = await RoomTypeModel.findOne(
            removeUndefined(roomTypeQuery)
        );
        if (!roomType) {
            return {
                ok: false,
                error: "존재하지 않는 roomTypeId",
                roomCapacity: null
            };
        }
        const roomCapacity = await roomType.getCapacity(start, end);
        console.log(roomCapacity);
        const temp = addPadding(
            roomCapacity,
            gender === "FEMALE" ? "MALE" : "FEMALE",
            paddingOtherGenderCount,
            roomType.roomGender
        );
        console.log(
            "-------------------------------------------------------------------------------------------------"
        );
        console.log(temp);
        return {
            ok: true,
            error: null,
            roomCapacity: temp
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message,
            roomCapacity: null
        };
    }
};
