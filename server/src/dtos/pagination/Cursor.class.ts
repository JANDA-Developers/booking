import { PageInfo } from "../../types/graph";
import { Edge } from "./Edge.class";

export interface IResponseCursor<T> {
    edges: Array<Edge<T>>;
    pageInfo: PageInfo;
}
export class ResponseCursor<T> implements IResponseCursor<T> {
    edges: Array<Edge<T>>;
    pageInfo: PageInfo;
}
