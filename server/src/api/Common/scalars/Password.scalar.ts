import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

function serialize(val: string) {
    // 특수문자 1개 이상 포함 & 7~15숫자, 영문 조합
    const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/gi;
    const validation = regExp.test(val);
    if (!validation) {
        throw new Error("Invalid Name");
    }
    return val;
}

function parseValue(value: string) {
    return serialize(value);
}

function parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
}

export default new GraphQLScalarType({
    name: "Password",
    description: "특수문자 1개이상 포함, 7~15자리 숫자 & 영문",
    serialize,
    parseValue,
    parseLiteral
});
