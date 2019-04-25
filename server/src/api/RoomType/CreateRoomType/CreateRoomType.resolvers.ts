import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { extractRoomType } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import { SeasonModel, SeasonSchema } from "../../../models/Season";
import {
    SeasonPriceModel,
    SeasonPriceSchema
} from "../../../models/SeasonPrice";
import { UserSchema } from "../../../models/User";
import {
    CreateRoomTypeMutationArgs,
    CreateRoomTypeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { isUsersHouse } from "../../../utils/check";
import { privateResolver } from "../../../utils/privateResolvers";

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
                    const roomType = await new RoomTypeModel({
                        ...args,
                        house: args.houseId
                    }).save();

                    await HouseModel.updateOne(
                        {
                            _id: new Types.ObjectId(args.houseId)
                        },
                        {
                            $push: {
                                roomTypes: new Types.ObjectId(roomType._id)
                            }
                        }
                    );
                    // SeasonPrice 생성
                    const allSeason = await SeasonModel.find({
                        house: new Types.ObjectId(args.houseId)
                    });
                    const seasonPrices: Array<
                        InstanceType<SeasonPriceSchema>
                    > = allSeason.map(
                        (
                            season: InstanceType<SeasonSchema>
                        ): InstanceType<SeasonPriceSchema> => {
                            return new SeasonPriceModel({
                                defaultPrice: args.defaultPrice,
                                season: new Types.ObjectId(season._id),
                                roomType: new Types.ObjectId(roomType._id)
                            });
                        }
                    );
                    const loggg = await SeasonPriceModel.insertMany(
                        seasonPrices
                    );
                    console.log({
                        loggg
                    });

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
