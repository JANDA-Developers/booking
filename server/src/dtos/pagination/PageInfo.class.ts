import { Schema } from "mongoose";
import { PageInfo } from "../../types/graph";
import { Edge } from "./Edge.class";

export interface IPageInfo {
    endCursor?: string;
    startCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface ISort {
    [key: string]: 1 | -1;
}
export const getPageInfo = <T, SC extends Schema>(
    data: Array<Edge<T>>,
    sort: ISort
): PageInfo => {
    const pageInfo: PageInfo = {
        startCursor: null,
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false
    };
    const length: number = data.length;
    if (length !== 0) {
        pageInfo.endCursor = data[length - 1].cursor;
        pageInfo.startCursor = data[0].cursor;
    }

    return pageInfo;
};
