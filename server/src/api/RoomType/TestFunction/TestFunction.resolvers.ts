import * as _ from "lodash";
import {
    addPadding,
    convertGenderArrToGuestGender,
    RoomTypeModel
} from "../../../models/RoomType";
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
                paddingGenderCountInput
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
                console.log(
                    "------------------------------------------------------------------------------------"
                );
                roomTypeCapacity.roomCapacityList.forEach(capacity => {
                    console.log({
                        capacity,
                        gender: convertGenderArrToGuestGender(
                            capacity.availableGenders
                        )
                    });
                });
                const temp = addPadding(
                    roomTypeCapacity,
                    gender,
                    (paddingGenderCountInput &&
                        paddingGenderCountInput.female) ||
                        0,
                    roomType.roomGender
                );
                console.log(
                    "------------------------------------------------------------------------------------"
                );

                console.log(temp);

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
