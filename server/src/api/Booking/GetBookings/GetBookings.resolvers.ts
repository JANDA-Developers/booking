import { Edge } from "../../../dtos/pagination/Edge.class";
import { BookingModel } from "../../../models/Booking";
import { extractBookings } from "../../../models/merge/merge";
import {
    extractEdges,
    getQueryAndSort
} from "../../../models/merge/pagination";
import {
    Booking,
    GetBookingsQueryArgs,
    GetBookingsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { encodeB64 } from "../../../utils/b64Func";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBookings: privateResolver(
            async (
                _,
                { first, last, cursor, sort, filter }: GetBookingsQueryArgs
            ): Promise<GetBookingsResponse> => {
                try {
                    const queryAndSort = getQueryAndSort(cursor, sort);
                    console.log({
                        queryAndSort
                    });

                    const bookings = await BookingModel.find(queryAndSort.query)
                        .sort(queryAndSort.orderBy)
                        .limit(first ? first : 0);
                    console.log({
                        bookings
                    });
                    const edges: Array<Edge<Booking>> = extractEdges(
                        (args: Booking): string => {
                            const val = new Date(args.updatedAt).toISOString();
                            console.log({
                                updatedAt: val
                            });
                            return encodeB64(val);
                        },
                        await extractBookings(bookings)
                    );
                    const isNotEmpty = bookings.length !== 0;
                    const startCursor = isNotEmpty ? edges[0].cursor : null;
                    const endCursor = isNotEmpty
                        ? edges[edges.length - 1].cursor
                        : null;
                    return {
                        ok: true,
                        error: null,
                        data: {
                            edges,
                            pageInfo: {
                                startCursor,
                                endCursor,
                                hasNextPage: false,
                                hasPreviousPage: false
                            },
                            totalCount: edges.length
                        }
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        data: null
                    };
                }
            }
        )
    }
};
export default resolvers;
