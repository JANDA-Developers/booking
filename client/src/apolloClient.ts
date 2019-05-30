import ApolloClient, {InMemoryCache} from "apollo-boost";
import dotenv from "dotenv";
import uri from "./uri";
import resolvers from "./resolvers";
import {onError} from "apollo-link-error";

dotenv.config({
  path: "../.env"
});

// const link = onError(({graphQLErrors, networkError}) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({message, locations, path}) =>
//       console.log(
//         `[GraphQL error규]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   if (networkError) console.log(`[Network error규]: ${networkError}`);
// });

const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt")),
        lastSelectedHouse: {
          __typename: "House",
          value: localStorage.getItem("selectId"),
          label: localStorage.getItem("selectHouseLabel")
        }
      }
    },
    resolvers
  },
  request: async operation => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri,
  credentials: "omit",
  cache: new InMemoryCache({
    addTypename: true
  })
});

export default client;
