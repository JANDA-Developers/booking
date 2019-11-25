import { ApolloClient } from "apollo-client";
import React from "react";
import dotenv from "dotenv";
import uri from "./uri";
import resolvers from "./resolvers";
import { toast } from "react-toastify";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";
import ToastError from "../components/toasts/ErrorToast";
import { JDlang } from "../langs/JDlang";
import { CURRENT_LANG } from "../hooks/hook";
import { Observable, ApolloLink } from "apollo-link";
// DEFRECATEDDDDD
import { onError, ErrorResponse } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const request = async (operation: any) => {
  operation.setContext({
    headers: {
      "X-JWT": localStorage.getItem("jwt") || "",
      "HP-Key": sessionStorage.getItem("hpk") || "",
      "HM-Key": sessionStorage.getItem("hmk") || ""
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer: any) => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const cache = new InMemoryCache({ addTypename: true, fragmentMatcher });

// networkError : 아래 에러는 그래프큐엘 통신이 실패했거나
// graphQLErrors : 그래프큐엘 통신규약이 맞지않음
const hanldeError = ({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
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
};

dotenv.config({
  path: "../.env"
});

cache.writeData({
  data: {
    auth: {
      __typename: "Auth",
      isLogIn: Boolean(localStorage.getItem("jwt"))
    },
    lastSelectedHouse: {
      __typename: "House",
      value: localStorage.getItem("selectId"),
      label: localStorage.getItem("selectHouseLabel")
    }
  }
});

const client = new ApolloClient({
  resolvers,
  link: ApolloLink.from([
    onError(hanldeError),
    requestLink,
    createUploadLink({
      uri,
      credentials: "omit"
    })
  ]),
  cache
});

export default client;
