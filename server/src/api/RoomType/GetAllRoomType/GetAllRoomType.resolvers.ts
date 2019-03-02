import { ObjectId } from "bson";
import { extractRoomTypes } from "../../../models/Merge";
import {
    GetAllRoomTypeQueryArgs,
    GetAllRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetAllRoomType: privateResolver(
            async (
                _,
                { houseId }: GetAllRoomTypeQueryArgs,
                { req }
            ): Promise<GetAllRoomTypeResponse> => {
                try {
                    if (houseId) {
                        return {
                            ok: true,
                            error: null,
                            roomTypes: await extractRoomTypes(
                                new ObjectId(houseId)
                            )
                        };
                    }
                    return {
                        ok: false,
                        error: "Under Delveop",
                        roomTypes: []
                    };
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
