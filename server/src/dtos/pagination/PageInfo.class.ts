export interface IPageInfo {
    endCursor?: string;
    startCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export class PageInfo {
    endCursor?: string;
    startCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
