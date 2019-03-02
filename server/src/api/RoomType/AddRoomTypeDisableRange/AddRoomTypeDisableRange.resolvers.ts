import { AddRoomTypeDisableRangeMutationArgs, AddRoomTypeDisableRangeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateRoomTypeExistCheckResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        AddRoomTypeDisableRange: privateRoomTypeExistCheckResolver(
            async (
                _,
                {
                    roomTypeId,
                    houseId,
                    disableRange
                }: AddRoomTypeDisableRangeMutationArgs,
                context
            ): Promise<AddRoomTypeDisableRangeResponse> => {
                const existingRoomType: InstanceType<any> =
                    context.existingRoomType;
                try {
                    await existingRoomType.update(
                        {
                            $push: {
                                disableRanges: disableRange
                            }
                        },
                        {
                            new: true
                        }
                    );
                    console.log({
                        test: "test 입니다 ㅎㅎ",
                        roomTypeId,
                        houseId,
                        disableRange,
                        existing: context.existingRoomType
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
        )
    }
};

export default resolvers;