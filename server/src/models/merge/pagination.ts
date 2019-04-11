import { Edge } from "../../dtos/Edge.class";

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
