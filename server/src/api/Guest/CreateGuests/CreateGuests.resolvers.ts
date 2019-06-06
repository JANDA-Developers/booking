import {
    CreateGuestsMutationArgs,
    CreateGuestsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateGuests: async (
            _,
            {
                bookingId,
                end,
                houseId,
                roomTypeId,
                roomIds,
                start
            }: CreateGuestsMutationArgs
        ): Promise<CreateGuestsResponse> => {
            try {
                return {
                    ok: false,
                    error: "개발 중 ㅜ",
                    guests: []
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    guests: []
                };
            }
        }
    }
};
export default resolvers;
