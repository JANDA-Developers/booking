import { extractRoomType } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    GetRoomTypeByIdQueryArgs,
    GetRoomTypeByIdResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetRoomTypeById: privateResolver(
            async (
                _,
                { roomTypeId }: GetRoomTypeByIdQueryArgs
            ): Promise<GetRoomTypeByIdResponse> => {
                try {
                    const existingRoomType = await RoomTypeModel.findById(
                        roomTypeId
                    );
                    if (!existingRoomType) {
                        return {
                            ok: false,
                            error: "존재하지 않는 RoomTypeId",
                            roomType: null
                        };
                    }
                    return {
                        ok: true,
                        error: null,
                        roomType: await extractRoomType.bind(
                            extractRoomType,
                            existingRoomType
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        roomType: null
                    };
                }
            }
        )
    }
};

export default resolvers;
