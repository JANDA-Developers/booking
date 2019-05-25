import { Context } from "graphql-yoga/dist/types";
import { extractRoomTypes } from "../../../models/merge/merge";
import { GetAllRoomTypeForBookerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolverForHouseAccess } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllRoomTypeForBooker: privateResolverForHouseAccess(
            async (
                _,
                __,
                ctx: Context
            ): Promise<GetAllRoomTypeForBookerResponse> => {
                try {
                    const { house } = ctx;

                    if (house) {
                        return {
                            ok: true,
                            error: null,
                            roomTypes: await extractRoomTypes.bind(
                                extractRoomTypes,
                                house.roomTypes
                            )
                        };
                    } else {
                        return {
                            ok: false,
                            error: "House is not Exist",
                            roomTypes: []
                        };
                    }
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

export default resolvers;
