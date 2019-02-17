import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

function serialize(value: string) {
    const date = new Date(value).toISOString();
    return date.substr(0, date.search("T"));
}

function parseValue(value: Date) {
    if (value instanceof Date || typeof value === 'string') {
        return value.getTime();
    } else if (typeof value === 'number') {
        return value;
    } else {
        return null;
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
    name: 'Date',
    description: 'YYYY-MM-DD',
    serialize, parseValue, parseLiteral
});