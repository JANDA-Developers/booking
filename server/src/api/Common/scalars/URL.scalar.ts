import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

function serialize(val: string) {
    const regExp = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    const validation = regExp.test(val);
    if (!validation) {
        throw new Error("Invalid URL");
    }
    return regExp.test(val) ? val : null;
}

function parseValue(value: string) {
    return serialize(value);
}

function parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
}

export default new GraphQLScalarType({
    name: "URL",
    description:
        "URL.../^http(s)?://(www.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$/",
    serialize,
    parseValue,
    parseLiteral
});
