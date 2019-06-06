import { extractRoomType } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    UpdateRoomTypeMutationArgs,
    UpdateRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

/**
 * UpdateRoomType: 방 타입 업데이트
 * ChangeIndex: 방 정렬번호 변경
 */
const resolver: Resolvers = {
    Mutation: {
        UpdateRoomType: privateResolver(
            async (
                _,
                { roomTypeId, params }: UpdateRoomTypeMutationArgs
            ): Promise<UpdateRoomTypeResponse> => {
                try {
                    const existingRoomType = await RoomTypeModel.findById(
                        roomTypeId
                    );
                    if (!existingRoomType) {
                        return {
                            ok: false,
                            error: "Invalid RoomTypeId",
                            roomType: null
                        };
                    }
                    const returns = await existingRoomType.updateThis(params);
                    return {
                        ...returns,
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

export default resolver;
