export interface IEdge<T> {
    cursor: string;
    node: T;
}
export class Edge<T> {
    cursor: string;
    node: T;
}
export const extractEdges = <T>(
    cursorFunc: (args: T) => string,
    data: T[]
): Array<Edge<T>> => {
    return data.map(
        (args): Edge<T> => {
            return {
                cursor: cursorFunc(args),
                node: args
            };
        }
    );
};
