import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { HouseSchema } from "../../../../models/House";
import { extractRoomType } from "../../../../models/merge/merge";
import { RoomTypeModel } from "../../../../models/RoomType";
import {
    UpdateRoomTypeToHostAppMutationArgs,
    UpdateRoomTypeToHostAppResponse
} from "../../../../types/graph";
import { Resolvers } from "../../../../types/resolvers";
import { privateResolverForHostApp } from "../../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRoomTypeToHostApp: privateResolverForHostApp(
            async (
                _,
                {
                    roomTemplateSrl,
                    ...args
                }: UpdateRoomTypeToHostAppMutationArgs,
                { req }
            ): Promise<UpdateRoomTypeToHostAppResponse> => {
                try {
                    const house: InstanceType<HouseSchema> = req.house;
                    const existingRoomType = await RoomTypeModel.findOne({
                        house: new Types.ObjectId(house._id),
                        roomTemplateSrl
                    });
                    if (!existingRoomType) {
                        return {
                            ok: false,
                            error: "RoomType is not exist",
                            roomType: null
                        };
                    }
                    await existingRoomType.update(
                        {
                            ...args
                        },
                        {
                            new: true
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        roomType: await extractRoomType.bind(
                            extractRoomType,
                            existingRoomType
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: "Underdevelop",
                        roomType: null
                    };
                }
            }
        )
    }
};
export default resolvers;
