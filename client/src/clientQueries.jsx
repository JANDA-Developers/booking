import gql from "graphql-tag";

/* -------------------------------- client ------------------------------- */
// 로그인이 되었는지?
export const IS_LOGGED_IN = gql`
  query auth {
    auth {
      isLoggedIn @client
    }
  }
`;
// 로그인 인
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
// 선택된 집 가져옴
export const SELECTED_HOUSE = gql`
  query lastSelectedHouse {
    lastSelectedHouse @client {
      label
      value
    }
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
