import { ObjectId } from "bson";
import { GuestModel } from "../../../models/Guest";
import { extractGuest } from "../../../models/merge/merge";
import {
    CreateGuestMutationArgs,
    CreateGuestResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateGuest: async (
            _,
            {
                bookerId,
                houseId,
                roomId,
                roomTypeId,
                ...args
            }: CreateGuestMutationArgs
        ): Promise<CreateGuestResponse> => {
            try {
                const guest = new GuestModel({
                    booker: new ObjectId(bookerId),
                    house: new ObjectId(houseId),
                    roomType: new ObjectId(roomTypeId),
                    ...args
                });
                if (roomId) {
                    guest.room = new ObjectId(roomId);
                }
                await guest.save();
                return {
                    ok: true,
                    error: null,
                    guest: await extractGuest.bind(extractGuest, guest)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    guest: null
                };
            }
        }
    }
};
export default resolvers;
