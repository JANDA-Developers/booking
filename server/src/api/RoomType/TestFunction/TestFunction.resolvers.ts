import * as _ from "lodash";
import { GuestModel } from "../../../models/Guest";
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
            { roomTypeId, guestId }: TestFunctionMutationArgs
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
                const guest = await GuestModel.findById(guestId);
                if (!guest) {
                    return {
                        ok: false,
                        error: "게스트 null"
                    };
                }
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
