import { Types } from "mongoose";
import { HouseModel } from "../../../models/House";
import { extractRoomTypes } from "../../../models/merge/merge";
import {
    GetAllRoomTypeQueryArgs,
    GetAllRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

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
