import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { extractRoomType } from "../../../models/Merge";
import { RoomTypeModel } from "../../../models/RoomType";
import { UserSchema } from "../../../models/User";
import {
    CreateRoomTypeMutationArgs,
    CreateRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { isUsersHouse } from "../../../utils/check";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateRoomType: privateResolver(
            async (
                _,
                args: CreateRoomTypeMutationArgs,
                { req }
            ): Promise<CreateRoomTypeResponse> => {
                const user: InstanceType<UserSchema> = req.user;
                try {
                    // 유저가 가지고 있는 집인지 확인
                    if (!(await isUsersHouse(args.house, user._id))) {
                        return {
                            ok: false,
                            error: "User and House is not match",
                            roomType: null
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        roomType: null
                    };
                }
                try {
                    const roomType = await new RoomTypeModel({
                        ...args,
                        house: new ObjectId(args.house),
                        user: user._id
                    });
                    // 방 타입을 생성해야함... 방 타입에 들어갈 정보들부터 확인해보자...
                    await roomType.save();
                    const result = await extractRoomType(roomType);
                    return {
                        ok: true,
                        error: "Under Develop",
                        roomType: result
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
