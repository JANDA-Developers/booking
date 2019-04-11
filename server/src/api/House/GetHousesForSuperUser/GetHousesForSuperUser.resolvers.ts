import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { Edge } from "../../../dtos/Edge.class";
import { HouseModel } from "../../../models/House";
import { extractHouses } from "../../../models/merge/merge";
import { extractEdges } from "../../../models/merge/pagination";
import { UserSchema } from "../../../models/User";
import {
    GetHousesForSuperUserQueryArgs,
    GetHousesForSuperUserResponse,
    House
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { decodeB64, encodeB64 } from "../../../utils/b64Func";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetHousesForSuperUser: privateResolver(
            async (
                _,
                { first, cursor, sort, filter }: GetHousesForSuperUserQueryArgs,
                { req }
            ): Promise<GetHousesForSuperUserResponse> => {
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
                    let query = {};
                    let orderBy = {};
                    if (cursor && sort) {
                        const { key, order } = sort;
                        let decodedCursor: any = decodeB64(cursor);
                        const direction: "$gt" | "$lt" =
                            order === 1 ? "$gt" : "$lt";
                        switch (key) {
                            case "_id":
                                decodedCursor = new ObjectId(decodedCursor);
                                break;
                            case "createdAt":
                            case "updatedAt":
                                decodedCursor = new Date(decodedCursor);
                                break;
                        }
                        query = {
                            ...query,
                            [key]: {
                                [direction]: decodedCursor
                            }
                        };
                        orderBy = {
                            [sort.key]: sort.order
                        };
                    }
                    const houses = await HouseModel.find(query)
                        .sort(orderBy)
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
