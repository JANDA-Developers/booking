import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

function serialize(val: string) {
    const regExp = /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 .'_]+$/gi;
    const maxLen = 60;
    const validation = val.length <= maxLen && regExp.test(val);
    return validation ? val : null;
}

function parseValue(value: string) {
    return serialize(value);
}

function parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
}

export default new GraphQLScalarType({
    name: 'Name',
    description: "이름. 특수문자 사용 불가 ('.', ''', 공백 만 사용 가능)",
    serialize,
    parseValue,
    parseLiteral
});