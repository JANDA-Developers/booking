import { Types } from "mongoose";
import { decodeB64 } from "../../utils/b64Func";

export const getQueryAndSort = (
    cursor: string | null,
    sort: any
): { query: any; orderBy: any } => {
    let query = {};
    let orderBy = {};
    if (cursor && sort) {
        const { key, order } = sort;
        let decodedCursor: any = decodeB64(cursor);
        const direction: "$gt" | "$lt" = order === 1 ? "$gt" : "$lt";
        switch (key) {
            case "_id":
                decodedCursor = new Types.ObjectId(decodedCursor);
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
    return {
        query,
        orderBy
    };
};
