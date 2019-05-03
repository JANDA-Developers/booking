import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { HouseModel, HouseSchema } from "../../../../models/House";
import { extractRoomType } from "../../../../models/merge/merge";
import { RoomTypeModel } from "../../../../models/RoomType";
import {
    CreateRoomTypeToHostAppMutationArgs,
    CreateRoomTypeToHostAppResponse
} from "../../../../types/graph";
import { Resolvers } from "../../../../types/resolvers";
import privateResolverForHostApp from "../../../../utils/privateResolverForHostApplication";

const resolvers: Resolvers = {
    Mutation: {
        CreateRoomTypeToHostApp: privateResolverForHostApp(
            async (
                _,
                { name, ...args }: CreateRoomTypeToHostAppMutationArgs,
                { req }
            ): Promise<CreateRoomTypeToHostAppResponse> => {
                try {
                    const house: InstanceType<HouseSchema> = req.house;
                    // 중복되는 방타입 이름인지 검사함.
                    if (
                        !(await RoomTypeModel.find({
                            name,
                            house: new Types.ObjectId(house._id)
                        }))
                    ) {
                        return {
                            ok: false,
                            error: "방타입 이름 중복",
                            roomType: null
                        };
                    }
                    const roomType = await new RoomTypeModel({
                        name,
                        ...args,
                        house: new Types.ObjectId(house._id)
                    });
                    // 방 타입을 생성해야함... 방 타입에 들어갈 정보들부터 확인해보자...
                    await roomType.save();

                    await HouseModel.updateOne(
                        {
                            _id: new Types.ObjectId(house._id)
                        },
                        {
                            $push: {
                                roomTypes: new Types.ObjectId(roomType._id)
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
