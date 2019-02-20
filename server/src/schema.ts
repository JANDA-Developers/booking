import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";
import * as scalars from "./api/Common/scalars/scalars";

// 파일 트리를 전부 타고 들어가서 병합하는 로직을 만들어야 함.
const allTypes: any[] = fileLoader(path.join(__dirname, "./api/**/*.graphql"));

const allResolvers: any[] = fileLoader(
    path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);

const mergedResolvers = mergeResolvers(allResolvers);

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: { ...mergedResolvers, ...scalars }
});

export default schema;
