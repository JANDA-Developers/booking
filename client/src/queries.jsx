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

export const GET_USER_INFO = gql`
  {
    GetMyProfile {
      user {
        isPhoneVerified
      }
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

export const PHONE_VERIFICATION = gql`
  mutation startPhoneVerification {
    StartPhoneVerification {
      ok
      error
    }
  }
`;

export const COMEPLETE_PHONE_VERIFICATION = gql`
  mutation completePhoneVerification($key: String!) {
    CompletePhoneVerification(key: $key) {
      ok
      error
      token
    }
  }
`;

export const EMAIL_SIGN_UP = gql`
  mutation emailSignUp($name: Name!, $email: EmailAddress!, $phoneNumber: PhoneNumber!, $password: String!) {
    EmailSignUp(name: $name, email: $email, password: $password, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;

export const EMAIL_SIGN_IN = gql`
  query emailSignIn($email: String!, $password: String!) {
    EmailSignIn(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

export const GET_MY_PHON_NUMBER = gql`
  query {
    GetMyProfile {
      ok
      error
      user {
        phoneNumber
      }
    }
  }
`;

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    LogUserIn(token: $token) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    LogUserOut @client
  }
`;
