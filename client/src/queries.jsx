import gql from 'graphql-tag';

export const Booker = gql`
  {
    bookers {
      id
      name
      phone_num
      email
      status
    }
  }
`;

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;

export const GetBookerNameById = gql`
  query getBookerById($personId: ID!) {
    get_booker_by_id(_id: $personId) {
      id
      name
      phone_num
    }
  }
`;
