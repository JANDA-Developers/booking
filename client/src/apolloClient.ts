import ApolloClient, {InMemoryCache} from "apollo-boost";
import dotenv from "dotenv";
import uri from "./uri";
import resolvers from "./resolvers";
import {toast} from "react-toastify";

dotenv.config({
  path: "../.env"
});

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
        "X-JWT": localStorage.getItem("jwt") || "",
        "HP-Key": localStorage.getItem("hpk") || ""
      }
    });
  },
  uri,
  credentials: "omit",
  cache: new InMemoryCache({
    addTypename: true
  }),
  onError: ({graphQLErrors, networkError}) => {
    if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) =>
    // 이건 DEV 용 메세지임 showError가 기타 에러 처리할것임
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      toast.warn("네트워크 문제발생");
    }
  }
});

export default client;
