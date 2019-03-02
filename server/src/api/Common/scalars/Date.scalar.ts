import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

function serialize(value: string) {
    const date = new Date(value).toISOString();
    return date.substr(0, date.search("T"));
}

function parseValue(value: any) {
    if (value instanceof Date) {
        return value;
    } else if (typeof value === "number" || typeof value === "string") {
        const time: number = Math.floor(Number(value) * 0.000001) * 100000;
        return new Date(time);
    } else {
        throw new Error("Invalid Date value");
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
    name: "Date",
    description: "YYYY-MM-DD",
    serialize,
    parseValue,
    parseLiteral
});
