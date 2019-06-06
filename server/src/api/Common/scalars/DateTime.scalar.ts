import { GraphQLScalarType } from "graphql";
import { ASTNode, Kind } from "graphql/language";

function serialize(value: string) {
    const date = new Date(value);
    // date.setTime(date.getTime() - date.getTimezoneOffset() * 1000 * 60);
    // console.log({
    //     date
    // });
    return date;
}

function parseValue(value: string | Date) {
    const date = new Date(value);
    date.setUTCHours(0, 0, 0, 0);
    if (isNaN(date.getTime())) {
        throw new Error("Invalid Date Value");
    }
    return date.toISOString();
    // if (tov === "string") {
    //     return new Date(value).toISOString();
    // } else if (tov === "number") {
    //     return new Date(value).toISOString();
    // } else if (value instanceof Date) {
    //     return value.toISOString();
    // } else {
    //     throw new Error("Invalid Date Value");
    // }
}

function parseLiteral(ast: ASTNode) {
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
