import gql from "graphql-tag";

/* -------------------------------- client ------------------------------- */
// 쿼리 로그인여부
export const IS_LOGGED_IN = gql`
  {
    auth @client {
      isLogIn
    }
  }
`;
// 로그인 뮤테이션
export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    LogUserIn(token: $token) @client
  }
`;
// 로그인 아웃
export const LOG_USER_OUT = gql`
  mutation logUserOut {
    LogUserOut @client
  }
`;

// 하우스 선택
export const SELECT_HOUSE = gql`
  mutation selectHouse($selectedHouse: SelectOption) {
    selectHouse(selectedHouse: $selectedHouse) @client {
      ok
      erorr
    }
  }
`;
