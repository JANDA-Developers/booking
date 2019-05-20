import { addPadding, RoomTypeModel } from "../../../models/RoomType";
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
                const roomCapacity = await roomType.getCapacity(start, end);
                console.log(roomCapacity);

                const temp = addPadding(
                    roomCapacity,
                    gender,
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
        }
    }
};
export default resolvers;
