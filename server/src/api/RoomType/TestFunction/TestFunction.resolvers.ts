import * as _ from "lodash";
import { RoomTypeModel } from "../../../models/RoomType";
import {
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
                // 렛츠 테스트 썸띵
                const roomType = await RoomTypeModel.findById(roomTypeId);
                if (!roomType) {
                    return {
                        ok: false,
                        error: "✈존재하지 않는 roomType"
                    };
                }
                const roomTypeCapacity = await roomType.getCapacity(start, end);
                roomTypeCapacity.roomCapacityList.forEach(capacity => {
                    console.log({
                        capacity
                    });
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
