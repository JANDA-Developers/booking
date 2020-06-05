import { ApolloClient } from "apollo-client";
import React from "react";
import dotenv from "dotenv";
import uri from "./uri";
import resolvers from "./resolvers";
import cache from "./cache";
import { toast } from "react-toastify";
import ToastError from "../components/toasts/ErrorToast";
import { } from "../langs/JDlang";
import { Observable, ApolloLink } from "apollo-link";
import { onError, ErrorResponse } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";
import { LANG } from "../hooks/hook";

const request = async (operation: any) => {
  operation.setContext({
    headers: {
      UTH: localStorage.getItem("UTH") || "",
      "H-KEY": localStorage.getItem("hk") || "",
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
    toast.warn(LANG("server_dose_not_respond"));
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
