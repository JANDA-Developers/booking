import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel, BookerSchema } from "../../../models/Booker";
import { extractBooker } from "../../../models/merge/merge";
import {
    UpdateBookerMutationArgs,
    UpdateBookerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateBooker: privateResolver(
            async (
                __,
                { bookerId, params }: UpdateBookerMutationArgs
            ): Promise<UpdateBookerResponse> => {
                try {
                    let bookerInstance: InstanceType<
                        BookerSchema
                    > | null = null;
                    await BookerModel.findOneAndUpdate(
                        { _id: new Types.ObjectId(bookerId) },
                        {
                            $set: { ...params }
                        },
                        { new: true },
                        (err, doc) => {
                            console.log({
                                ...doc
                            });
                            bookerInstance = doc;
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        booker:
                            bookerInstance &&
                            (await extractBooker.bind(
                                extractBooker,
                                bookerInstance
                            ))
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
