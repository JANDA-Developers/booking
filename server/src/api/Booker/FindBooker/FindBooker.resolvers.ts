import { Types } from "mongoose";
import { BookerModel } from "../../../models/Booker";
import { extractBooker } from "../../../models/merge/merge";
import { FindBookerQueryArgs, FindBookerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        FindBooker: privateResolver(
            async (
                _,
                { houseId, name, password, phoneNumber }: FindBookerQueryArgs
            ): Promise<FindBookerResponse> => {
                try {
                    const existingBooker = await BookerModel.findOne({
                        name,
                        phoneNumber,
                        house: houseId && new Types.ObjectId(houseId)
                    });
                    if (!existingBooker) {
                        return {
                            ok: false,
                            error: "존재하지 않는 BookerId 입니다",
                            booker: null
                        };
                    }
                    if (!existingBooker.comparePassword(password)) {
                        return {
                            ok: false,
                            error: "패스워드가 일치하지 않습니다.",
                            booker: null
                        };
                    }
                    return {
                        ok: true,
                        error: null,
                        booker: await extractBooker.bind(
                            extractBooker,
                            existingBooker
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        booker: null
                    };
                }
            }
        )
    }
};

export default resolvers;
