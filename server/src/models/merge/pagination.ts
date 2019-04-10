import { Edge } from "../../dtos/Edge.class";

/*
    edges: [
        {
            cursor: "",
            node: await extractHouse.bind(
                extractHouse,
                null
            )
        }
    ],
*/
export const extractEdges = <T>(cursorFunc: (args: T) => string, data: T[]): Edge<T>[] => {
    return data.map(
        (args): Edge<T> => {
            return {
                cursor: cursorFunc(args),
                node: args
            };
        }
    );
};

