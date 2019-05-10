import * as _ from "lodash";
import { Types } from "mongoose";
import { RoomModel } from "../../../models/Room";
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
                // 렛츠 테스트 썸띵!
                const roomType = await RoomTypeModel.findById(roomTypeId);
                if (!roomType) {
                    return {
                        ok: false,
                        error: "존재하지 않는 roomTypeId"
                    };
                }
                const rooms = roomType.rooms.map(roomId => {
                    return new Types.ObjectId(roomId);
                });
                console.log({
                    rooms
                });

                const roomInstances = await RoomModel.find({
                    _id: {
                        $in: rooms
                    }
                });
                console.log({
                    rooms: roomInstances
                });

                roomInstances.forEach(async roomInstance => {
                    console.log({
                        log: await roomInstance.getCapacity(start, end)
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
