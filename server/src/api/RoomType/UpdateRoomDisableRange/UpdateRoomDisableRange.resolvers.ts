import { ObjectId } from "bson";
import DisableRange from "../../../dtos/DisableRange.class";
import { RoomModel } from "../../../models/Room";
import { dateRangeDuplicateCheckQuery } from "../../../queries/queries";
import {
    UpdateRoomDisableRangeMutationArgs,
    UpdateRoomDisableRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRoomDisableRange: privateResolver(
            async (
                _,
                {
                    roomId,
                    hashCode,
                    startDate,
                    endDate,
                    description
                }: UpdateRoomDisableRangeMutationArgs,
                __
            ): Promise<UpdateRoomDisableRangeResponse> => {
                try {
                    // 일단 찾자... id값으로 ㅎㅎ
                    // 1. 바꾸려는 새로운 객체의 hashCode 존재하는지 확인
                    // 2. 입력받은 hashCode 로 disableRange가 존재하는지 확인
                    // 3. 앞의 1,2 과정을 통과했다면 oldhashCode에 해당하는 객체 삭제 & newHashCode에 해당하는 객체 insert
                    const duplicateChkQuery = dateRangeDuplicateCheckQuery({
                        startDate,
                        endDate,
                        className: "disableRanges"
                    });

                    const overlapedDisableRange = await RoomModel.findById(
                        roomId,
                        {
                            _id: 0,
                            ...duplicateChkQuery
                        }
                    );
                    console.log({
                        overlapedDisableRange
                    });

                    if (
                        overlapedDisableRange &&
                        overlapedDisableRange.disableRanges.length
                    ) {
                        const existingDisableRanges =
                            overlapedDisableRange.disableRanges;
                        const matched = existingDisableRanges.filter(
                            disableRange => disableRange.hashCode === hashCode
                        );
                        console.log({
                            disableRanges: existingDisableRanges,
                            matched
                        });
                        // hashCode 가 일치하는 것이 없는 경우
                        if (matched.length === 0) {
                            return {
                                ok: false,
                                error: "Duplicate Period",
                                disableRange: null
                            };
                        }
                    }

                    const newDisableRange = new DisableRange({
                        startDate,
                        endDate,
                        description
                    });

                    // db상에서 찾아야한다 씨발... 그...

                    // startDate, endDate만을 가지고 찾아야한다...
                    // 당연히 hashCode는 중복되면 안되고...
                    const updateResult = await RoomModel.findOneAndUpdate(
                        {
                            _id: new ObjectId(roomId),
                            disableRanges: {
                                $elemMatch: {
                                    hashCode
                                }
                            }
                        },
                        {
                            $set: {
                                "disableRanges.$": {
                                    hashCode: newDisableRange.getHashCode(),
                                    startDate,
                                    endDate,
                                    description
                                }
                            }
                        },
                        {
                            new: true
                        }
                    );
                    if (updateResult) {
                        return {
                            ok: true,
                            error: null,
                            disableRange: newDisableRange.getParams()
                        };
                    } else {
                        return {
                            ok: false,
                            error: "_id, hashCode does not matched",
                            disableRange: null
                        };
                    }
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
