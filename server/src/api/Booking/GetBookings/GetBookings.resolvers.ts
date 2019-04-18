import { Edge, extractEdges } from "../../../dtos/pagination/Edge.class";
import { BookingModel } from "../../../models/Booking";
import { extractBookings } from "../../../models/merge/merge";
import { getQueryAndSort } from "../../../models/merge/pagination";
import {
    Booking,
    GetBookingsQueryArgs,
    GetBookingsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { decodeB64, encodeB64 } from "../../../utils/b64Func";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBookings: privateResolver(
            async (
                _,
                { first, cursor, sort }: GetBookingsQueryArgs
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
                    // const sortInfo: ISort = {
                    //     [sort !== null ? sort.key : "updatedAt"]:
                    //         sort !== null ? (sort.order > 0 ? 1 : -1) : -1
                    // };
                    // const pageInfo = getPageInfo<Booking>(edges, sortInfo);
                    // console.log({
                    //     pageInfo
                    // });
                    const isNotEmpty = bookings.length !== 0;
                    const startCursor = isNotEmpty ? edges[0].cursor : null;
                    const endCursor = isNotEmpty
                        ? edges[edges.length - 1].cursor
                        : null;
                    // startCursor & endCursor 를 가지고 한번 더 조회한다...
                    // sort 에 따라서 달라지겠지... ㅜㅜ 흐규흐규흐규흐규
                    // sort.order = 1 인 경우.
                    // sort.order = -1 인 경우.
                    if (sort) {
                        const decodedStartCursor = await decodeB64(startCursor);
                        await BookingModel.countDocuments({
                            [sort.key]: decodedStartCursor
                        });
                    }
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
