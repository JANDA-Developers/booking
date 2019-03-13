import { InstanceType } from "typegoose";
import { RoomTypeSchema } from "../../../models/RoomType";
import {
    RemoveRoomTypeDisableRangeMutationArgs,
    RemoveRoomTypeDisableRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateRoomTypeExistCheckResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        RemoveRoomTypeDisableRange: privateRoomTypeExistCheckResolver(
            async (
                _,
                args: RemoveRoomTypeDisableRangeMutationArgs,
                context
            ): Promise<RemoveRoomTypeDisableRangeResponse> => {
                const existingRoomType: InstanceType<RoomTypeSchema> =
                    context.existingRoomType;
                try {
                    console.log(
                        new Date(args.disableRange.startDate).getTime()
                    );

                    await existingRoomType.update(
                        {
                            $pull: {
                                disableRanges: {
                                    startDate: new Date(
                                        args.disableRange.startDate
                                    ),
                                    endDate: new Date(args.disableRange.endDate)
                                }
                            }
                        },
                        {
                            new: true
                        }
                    );
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
                return {
                    ok: false,
                    error: "Under Develop"
                };
            }
        )
    }
};
export default resolvers;
