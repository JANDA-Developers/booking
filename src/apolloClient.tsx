import React from "react";
import ApolloClient, {InMemoryCache} from "apollo-boost";
import dotenv from "dotenv";
import uri from "./uri";
import resolvers from "./resolvers";
import {toast} from "react-toastify";
import {IntrospectionFragmentMatcher} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";
import ToastError from "./components/toasts/ErrorToast";
import {JDlang} from "./langs/JDlang";
import {CURRENT_LANG} from "./hooks/hook";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({addTypename: true, fragmentMatcher});

dotenv.config({
  path: "../.env"
});

const client = new ApolloClient<object>({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLogIn: Boolean(localStorage.getItem("jwt"))
      },
      lastSelectedHouse: {
        __typename: "House",
        value: localStorage.getItem("selectId"),
        label: localStorage.getItem("selectHouseLabel")
      }
    },
    resolvers
  },
  request: async operation => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || "",
        "HP-Key": sessionStorage.getItem("hpk") || "",
        "HM-Key": localStorage.getItem("hmk") || ""
      }
    });
  },
  uri,
  credentials: "omit",
  cache,
  onError: ({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) => {
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
      toast.warn(<ToastError />);
    } else if (networkError) {
      console.error(networkError);
      console.error(`[Network error]: ${networkError}`);
      toast.warn(JDlang(CURRENT_LANG, "check_net_status"));
    }
  }
});

export default client;
