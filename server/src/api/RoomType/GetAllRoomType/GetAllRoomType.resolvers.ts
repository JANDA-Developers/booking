import { HouseModel } from "../../../models/House";
import { extractRoomTypes } from "../../../models/merge/Merge";
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
            ): Promise<GetAllRoomTypeResponse> => {
                try {
                    const house = await HouseModel.findOne(
                        { _id: houseId },
                        { roomTypes: 1 }
                    );
                    if (house) {
                        return {
                            ok: true,
                            error: null,
                            roomTypes: await extractRoomTypes(house.roomTypes)
                        };
                    } else {
                        return {
                            ok: false,
                            error: "Under Delveop",
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
