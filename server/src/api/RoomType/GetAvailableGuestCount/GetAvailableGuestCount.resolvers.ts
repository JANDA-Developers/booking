import { RoomTypeModel } from "../../../models/RoomType";
import {
    GetAvailableGuestCountQueryArgs,
    GetAvailableGuestCountResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query: {
        GetAvailableGuestCount: async (
            _,
            {
                roomTypeId,
                start,
                end,
                gender,
                paddingOtherGenderCount
            }: GetAvailableGuestCountQueryArgs
        ): Promise<GetAvailableGuestCountResponse> => {
            try {
                // 렛츠 테스트 썸띵!
                const roomType = await RoomTypeModel.findById(roomTypeId);
                if (!roomType) {
                    return {
                        ok: false,
                        error: "존재하지 않는 roomTypeId",
                        roomCapacity: null
                    };
                }
                const roomCapacity = await roomType.getDomitoryCapacity(
                    start,
                    end,
                    gender,
                    paddingOtherGenderCount
                );
                return {
                    ok: true,
                    error: null,
                    roomCapacity
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    roomCapacity: null
                };
            }
        }
    }
};
export default resolvers;
