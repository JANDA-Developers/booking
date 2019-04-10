import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { HouseModel } from "../../../models/House";
import { UserSchema } from "../../../models/User";
import { extractHouses } from "../../../models/merge/merge";
import { Resolvers } from "../../../types/resolvers";
import {
    GetHousesForSuperUserResponse,
    GetHousesForSuperUserQueryArgs,
    House
} from "../../../types/graph";
import { decodeB64, encodeB64 } from "../../../utils/b64Func";
import privateResolver from "../../../utils/privateResolvers";
import { extractEdges } from "../../../models/merge/pagination";
import { Edge } from "../../../dtos/Edge.class";

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
                    console.log(query);
                    // query 확인해보기
                    const houses = await HouseModel.find(query)
                        .sort(orderBy)
                        .limit(first);
                    console.log({
                        houses
                    });

                    const result: Edge<House>[] = extractEdges(
                        (args: House): string => {
                            const val = new Date(args.updatedAt).toISOString();
                            console.log({
                                updatedAt: val
                            });
                            return encodeB64(val);
                        },
                        await extractHouses(houses)
                    );
                    return {
                        ok: true,
                        error: null,
                        result: {
                            edges: result, 
                            pageInfo: {
                                endCursor: null,
                                hasNextPage: false,
                                hasPreviousPage: true,
                                startCursor: null
                            },
                            totalCount: 11
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
