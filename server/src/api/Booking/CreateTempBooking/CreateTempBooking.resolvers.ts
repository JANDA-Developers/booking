import { Types } from "mongoose";
import {
    CreateTempBookingMutationArgs,
    CreateTempBookingResponse,
    TempBookingInput
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateTempBooking: privateResolver(
            async (
                _,
                params: CreateTempBookingMutationArgs
            ): Promise<CreateTempBookingResponse> => {
                try {
                    const { tempBookingInputs } = params;
                    const args = tempBookingInputs.map(
                        (tempBooking: TempBookingInput) => {
                            return {
                                room: new Types.ObjectId(tempBooking.roomId),
                                gender: tempBooking.gender
                            };
                        }
                    );
                    console.log({
                        args
                    });

                    return {
                        ok: false,
                        error: "개발중"
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
