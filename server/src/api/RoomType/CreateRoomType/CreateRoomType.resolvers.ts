import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { extractRoomType } from "../../../models/merge/Merge";
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
                    if (!(await isUsersHouse(args.houseId, user._id))) {
                        return {
                            ok: false,
                            error: "User and House is not match",
                            roomType: null
                        };
                    }

                    if (
                        !(await RoomTypeModel.find({
                            name: args.name,
                            house: args.houseId
                        }))
                    ) {
                        return {
                            ok: false,
                            error: "Existing RoomType Name",
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
                        house: args.houseId
                    });
                    // 방 타입을 생성해야함... 방 타입에 들어갈 정보들부터 확인해보자...
                    await roomType.save();

                    await HouseModel.updateOne(
                        {
                            _id: new ObjectId(args.houseId)
                        },
                        {
                            $push: {
                                roomTypes: new ObjectId(roomType._id)
                            }
                        }
                    );
                    const result = await extractRoomType(roomType);
                    return {
                        ok: true,
                        error: null, 
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
