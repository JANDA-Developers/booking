import ApolloClient from "apollo-boost";
import uri from "./uri";

const client = new ApolloClient({
    uri
});

export default client;