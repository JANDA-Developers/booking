import * as _ from "lodash";
import { RoomTypeModel } from "../../../models/RoomType";
import {
    RoomCapacity,
    TestFunctionMutationArgs,
    TestFunctionResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        TestFunction: async (
            __,
            {
                roomTypeId,
                start,
                end,
                gender,
                paddingOtherGenderCount
            }: TestFunctionMutationArgs
        ): Promise<TestFunctionResponse> => {
            try {
                // 렛츠 테스트 썸띵!
                const roomType = await RoomTypeModel.findById(roomTypeId);
                if (!roomType) {
                    return {
                        ok: false,
                        error: "존재하지 않는 roomTypeId"
                    };
                }
                const domitoryCapacity = await roomType.getCapacityForDomitory(
                    start,
                    end,
                    gender,
                    paddingOtherGenderCount
                );
                console.log({
                    "TestFunction.domitoryCapacity": domitoryCapacity
                });
                const isDomitory = roomType.pricingType === "DOMITORY";

                const allocatableRooms: RoomCapacity[] = _.orderBy(
                    await roomType.getRoomCapacitiesWithRoomIdForDomitory(
                        start,
                        end
                    ),
                    ["guestGender", "availableCount"],
                    ["asc", "asc"]
                ).filter(capacity => {
                    if (!isDomitory) {
                        return !(
                            capacity.roomGender === "FEMALE" ||
                            capacity.roomGender === "MALE"
                        );
                    }
                    // 이하 도미토리 방식인 경우.
                    if (!gender) {
                        return true;
                    }
                    return (
                        capacity.guestGender === gender || !capacity.guestGender
                    );
                });
                console.log({
                    allocatableRooms
                });

                return {
                    ok: true,
                    error: null
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};
export default resolvers;
