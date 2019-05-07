import { RoomTypeModel } from "../../../models/RoomType";
import { getMaxPriority } from "../../../queries/queriesSeason";
import {
    TestFunctionMutationArgs,
    TestFunctionResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        TestFunction: async (
            _,
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
                const domitoryCapacity = await roomType.getDomitoryCapacity(
                    start,
                    end,
                    gender,
                    paddingOtherGenderCount
                );
                console.log({
                    "TestFunction.domitoryCapacity": domitoryCapacity
                });
                const maxPriority = await getMaxPriority(roomType.house);
                console.log({
                    maxPriority
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
