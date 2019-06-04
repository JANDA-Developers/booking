import { Context } from "graphql-yoga/dist/types";
import * as _ from "lodash";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { bookingModel, BookingSchema } from "../../../models/bookingss";
import { HouseSchema } from "../../../models/House";
import { extractbookings } from "../../../models/merge/merge";
import {
    FindbookingForbookingQueryArgs,
    FindbookingQueryArgs,
    FindbookingResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";
import {
    privateResolver,
    privateResolverForPublicAccess
} from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        Findbooking: privateResolver(
            async (
                __,
                params: FindbookingQueryArgs
            ): Promise<FindbookingResponse> => {
                return findbooking(params);
            }
        ),
        FindbookingForbooking: privateResolverForPublicAccess(
            async (
                __,
                params: FindbookingForbookingQueryArgs,
                ctx: Context
            ): Promise<FindbookingResponse> => {
                const { house }: { house: InstanceType<HouseSchema> } = ctx.req;
                return findbooking({ ...params, houseId: house._id });
            }
        )
    }
};

export default resolvers;

const findbooking = async ({
    houseId,
    name,
    password,
    phoneNumber
}: FindbookingQueryArgs) => {
    try {
        const bookings = await bookingModel.find({
            name,
            phoneNumber,
            house: houseId && new Types.ObjectId(houseId)
        });
        if (!bookings.length) {
            return {
                ok: false,
                error: "존재하지 않는 bookingId 입니다",
                bookings: []
            };
        }
        const realbooking: Array<InstanceType<BookingSchema>> = [];
        await asyncForEach(bookings, async booking => {
            if (await booking.comparePassword(password)) {
                realbooking.push(booking);
            }
        });
        return {
            ok: true,
            error: null,
            bookings: await extractbookings.bind(extractbookings, realbooking)
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message,
            bookings: []
        };
    }
};
