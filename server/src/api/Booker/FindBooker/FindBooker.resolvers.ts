import * as _ from "lodash";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel, BookerSchema } from "../../../models/Booker";
import { extractBookers } from "../../../models/merge/merge";
import { FindBookerQueryArgs, FindBookerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        FindBooker: privateResolver(
            async (
                __,
                { houseId, name, password, phoneNumber }: FindBookerQueryArgs
            ): Promise<FindBookerResponse> => {
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
                        bookers: await extractBookers.bind(
                            extractBookers,
                            realBooker
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        bookers: []
                    };
                }
            }
        )
    }
};

export default resolvers;
