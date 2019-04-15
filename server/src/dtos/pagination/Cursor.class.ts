import { Edge } from "./Edge.class";
import { PageInfo } from "./PageInfo.class";

export interface IResponseCursor<T> {
    edges: Array<Edge<T>>;
    pageInfo: PageInfo;
}
export class ResponseCursor<T> {
    edges: Array<Edge<T>>;
    pageInfo: PageInfo;
}
