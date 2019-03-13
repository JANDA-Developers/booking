import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

function serialize(value: string) {
    const date = new Date(value);
    // date.setTime(date.getTime() - date.getTimezoneOffset() * 1000 * 60);
    // console.log({
    //     date
    // });
    
    return date.toISOString();
}

function parseValue(value: any) {
    const tov = typeof value;
    if (tov === "string") {
        return new Date(value).getTime();
    } else if (tov === "number") {
        return value;
    } else if (value instanceof Date) {
        return value;
    } else {
        throw new Error("Invalid Date Value");
    }
}

function parseLiteral(ast) {
    switch (ast.kind) {
        case Kind.STRING:
        case Kind.INT:
            return parseValue(ast.value);
        default:
            return null;
    }
}

export default new GraphQLScalarType({
    name: "DateTime",
    description: "JavaScript Date object as an ISO timestamp",
    serialize,
    parseValue,
    parseLiteral
});
