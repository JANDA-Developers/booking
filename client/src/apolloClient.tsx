import React from "react";
import ApolloClient, {InMemoryCache} from "apollo-boost";
import dotenv from "dotenv";
import uri from "./uri";
import resolvers from "./resolvers";
import {toast} from "react-toastify";
import Button from "./atoms/button/Button";
import {Link} from "react-router-dom";
import insideRedirect from "./utils/insideRedirect";

import {IntrospectionFragmentMatcher} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";
import ToastError from "./components/toasts/errorToast";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({addTypename: true, fragmentMatcher});

dotenv.config({
  path: "../.env"
});

const client = new ApolloClient({
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
        "HP-Key": localStorage.getItem("hpk") || "",
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
        // 이건 DEV 용 메세지임 showError가 기타 에러 처리할것임
        console.warn(
          `[GraphQL error]: Me2ssage: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
      toast.warn(<ToastError />);
    } else if (networkError) {
      console.log(networkError);
      console.warn(`[Network error]: ${networkError}`);
      toast.warn("네트워크 연결상태를 확인해주세요!");
    }
  }
});

export default client;
