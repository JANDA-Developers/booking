import { Context } from "graphql-yoga/dist/types";
import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { extractRoomTypes } from "../../../models/merge/merge";
import {
    GetAllRoomTypeQueryArgs,
    GetAllRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import {
    privateResolver,
    privateResolverForPublicAccess
} from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllRoomType: privateResolver(
            async (
                _,
                { houseId }: GetAllRoomTypeQueryArgs
            ): Promise<GetAllRoomTypeResponse> => {
                try {
                    const house = await HouseModel.findOne(
                        { _id: new Types.ObjectId(houseId) },
                        { roomTypes: 1 }
                    );
                    return await resultFunc(house);
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        roomTypes: []
                    };
                }
            }
        ),
        GetAllRoomTypeForbooking: privateResolverForPublicAccess(
            async (_, __, ctx: Context): Promise<GetAllRoomTypeResponse> => {
                try {
                    const { house } = ctx.req;
                    console.log({
                        house
                    });

                    return await resultFunc(house);
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        roomTypes: []
                    };
                }
            }
        )
    }
};

const resultFunc = async (house: any) => {
    if (!house) {
        return {
            ok: false,
            error: "House is not Exist",
            roomTypes: []
        };
    }
    return {
        ok: true,
        error: null,
        roomTypes: await extractRoomTypes.bind(
            extractRoomTypes,
            house.roomTypes
        )
    };
};

export default resolvers;
