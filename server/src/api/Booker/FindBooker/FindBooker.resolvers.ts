import { Context } from "graphql-yoga/dist/types";
import * as _ from "lodash";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel, BookerSchema } from "../../../models/Booker";
import { HouseSchema } from "../../../models/House";
import { extractBookers } from "../../../models/merge/merge";
import {
    FindBookerForBookerQueryArgs,
    FindBookerQueryArgs,
    FindBookerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";
import {
    privateResolver,
    privateResolverForPublicAccess
} from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        FindBooker: privateResolver(
            async (
                __,
                params: FindBookerQueryArgs
            ): Promise<FindBookerResponse> => {
                return findBooker(params);
            }
        ),
        FindBookerForBooker: privateResolverForPublicAccess(
            async (
                __,
                params: FindBookerForBookerQueryArgs,
                ctx: Context
            ): Promise<FindBookerResponse> => {
                const { house }: { house: InstanceType<HouseSchema> } = ctx.req;
                return findBooker({ ...params, houseId: house._id });
            }
        )
    }
};

export default resolvers;

const findBooker = async ({
    houseId,
    name,
    password,
    phoneNumber
}: FindBookerQueryArgs) => {
    try {
        const bookers = await BookerModel.find({
            name,
            phoneNumber,
            house: houseId && new Types.ObjectId(houseId)
        });
        if (!bookers.length) {
            return {
                ok: false,
                error: "존재하지 않는 BookerId 입니다",
                bookers: []
            };
        }
        const realBooker: Array<InstanceType<BookerSchema>> = [];
        await asyncForEach(bookers, async booker => {
            if (await booker.comparePassword(password)) {
                realBooker.push(booker);
            }
        });
        return {
            ok: true,
            error: null,
            bookers: await extractBookers.bind(extractBookers, realBooker)
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message,
            bookers: []
        };
    }
};
