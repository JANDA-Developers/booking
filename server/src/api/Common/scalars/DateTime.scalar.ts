import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

function serialize(value: string) {
    return new Date(value).toISOString();
}

function parseValue(value: any) {
    const tov = typeof value;
    if (tov === "string" || tov === "number") {
        return new Date(value);
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
