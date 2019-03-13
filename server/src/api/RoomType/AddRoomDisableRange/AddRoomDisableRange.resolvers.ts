import { ObjectId } from "bson";
import DisableRange from "../../../dtos/DisableRange.class";
import { RoomModel } from "../../../models/Room";
import { dateRangeDuplicateCheckQuery } from "../../../queries/queries";
import {
    AddRoomDisableRangeMutationArgs,
    AddRoomDisableRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        AddRoomDisableRange: privateResolver(
            async (
                _,
                { disableRange, roomId }: AddRoomDisableRangeMutationArgs
            ): Promise<AddRoomDisableRangeResponse> => {
                try {
                    const range = new DisableRange({
                        ...disableRange
                    });
                    const params = range.getParams();
                    const { startDate, endDate } = params;
                    // db.Rooms.find({}, {disableRanges:{ $elemMatch: { startDate: {$gte:1551711600000}}  }}).pretty()
                    const query = dateRangeDuplicateCheckQuery({
                        startDate,
                        endDate,
                        className: "disableRanges",
                    });
                    const duplicateDisableRange = await RoomModel.findById(
                        roomId,
                        query
                    );
                    console.log({
                        duplicateDisableRange
                    });

                    if (
                        duplicateDisableRange &&
                        duplicateDisableRange.disableRanges.length !== 0
                    ) {
                        return {
                            ok: false,
                            error: "Duplicate start & end Date",
                            disableRange: null
                        };
                    }
                    await RoomModel.updateOne(
                        {
                            _id: new ObjectId(roomId)
                        },
                        {
                            $push: {
                                disableRanges: { ...params }
                            }
                        },
                        {
                            new: true
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        disableRange: {
                            ...params
                        }
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        disableRange: null
                    };
                }
            }
        )
    }
};
export default resolvers;
