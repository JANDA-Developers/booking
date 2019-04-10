export interface IEdge<T> {
    cursor: string;
    node: T;
}
export interface IPageInfo {
    endCursor?: string;
    startCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface IResponseCursor<T> {
    edges: Edge<T>[];
    pageInfo: PageInfo;
}
export class Edge<T> {
    cursor: string;
    node: T;
}
export class PageInfo {
    endCursor?: string;
    startCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export class ResponseCursor<T> {
    edges: Edge<T>[];
    pageInfo: PageInfo;
}
