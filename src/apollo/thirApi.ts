import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import gql from "graphql-tag";

const jdBankClient = new ApolloClient({
  cache: new InMemoryCache({ addTypename: true }),
  link: createUploadLink({
    uri: "https://bank.stayjanda.cloud/graphql",
    credentials: "omit"
  })
});
// gql`
// `
// thirdClient.query()

const HISTORY_FIND_BY_TID = gql`
  query historyFindByTid($tid: String!) {
    HistoryFindByTid(tid: $tid) {
      ok
      data {
        _id
        createdAt
        updatedAt
        isDelete
        tradeDate
        cancelDate
        mid
        tid
        productName
        price
        status
        approvalNo
        orderNo
        companay
        cardNo
        partialCancel
      }
    }
  }
`;

export const queryTid = (tid: string) => {
  return jdBankClient.query({
    query: HISTORY_FIND_BY_TID,
    variables: {
      tid: tid
    }
  });
};
