import { InstanceType } from "typegoose";
import { Edge, extractEdges } from "../../../dtos/pagination/Edge.class";
import { HouseModel } from "../../../models/House";
import { extractHouses } from "../../../models/merge/merge";
import { getQueryAndSort } from "../../../models/merge/pagination";
import { UserSchema } from "../../../models/User";
import {
    GetHousesForSuQueryArgs,
    GetHousesForSUResponse,
    House
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { encodeB64 } from "../../../utils/b64Func";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetHousesForSU: privateResolver(
            async (
                _,
                { first, cursor, sort, filter }: GetHousesForSuQueryArgs,
                { req }
            ): Promise<GetHousesForSUResponse> => {
                try {
                    const user: InstanceType<UserSchema> = req.user;
                    // first: 시작부터 몇 개의 데이터를 출력할지 지정.
                    // cursor: 현재 데이터 커서.
                    if (user.userRole !== "ADMIN") {
                        return {
                            ok: false,
                            error: "You are not SuperUser",
                            result: null
                        };
                    } // SuperUser 인증
                    const queryAndSort = getQueryAndSort(cursor, sort);
                    const houses = await HouseModel.find(queryAndSort.query)
                        .sort(queryAndSort.orderBy)
                        .limit(first);
                    const result: Array<Edge<House>> = extractEdges(
                        (args: House): string => {
                            const val = new Date(args.updatedAt).toISOString();
                            console.log({
                                updatedAt: val
                            });
                            return encodeB64(val);
                        },
                        await extractHouses(houses)
                    );

                    const isEmptyResult = result.length === 0;
                    const startCursor = isEmptyResult ? null : result[0].cursor;
                    const endCursor = isEmptyResult
                        ? null
                        : result[result.length - 1].cursor;

                    // TODO hasNextPage, hasPreviousPage 구현 ㄱㄱ
                    // hasNextPage 는 EndCursor로 구현
                    // hasPreviousPage 는 StartCursor로 구현
                    return {
                        ok: true,
                        error: null,
                        result: {
                            edges: result,
                            pageInfo: {
                                hasPreviousPage: false,
                                hasNextPage: false,
                                startCursor,
                                endCursor
                            },
                            totalCount: result.length
                        }
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        result: null
                    };
                }
            }
        )
    }
};
export default resolvers;
