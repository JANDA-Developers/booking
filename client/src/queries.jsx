import gql from 'graphql-tag';

/* -------------------------------- client ------------------------------- */

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;

export const SELECTED_HOUSE = gql`
  {
    auth {
      lastSelectedHouse @client {
        label
        value
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

export const SELECT_HOUSE = gql`
  mutation selectHouse($selectedHouse: SelectOption!) {
    selectHouse(selectedHouse: $selectedHouse) @client {
      label
      value
    }
  }
`;

/* ---------------------------------- query --------------------------------- */

export const GET_USER_INFO = gql`
  query {
    GetMyProfile {
      user {
        _id
        name
        phoneNumber
        password
        email
        isPhoneVerified
        checkPrivacyPolicy
        houses {
          product {
            _id
            name
          }
          _id
          name
          houseType
          location {
            address
            addressDetail
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      ok
    }
  }
`;

export const EMAIL_SIGN_IN = gql`
  query emailSignIn($email: EmailAddress!, $password: Password!) {
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

/* -------------------------------- mutation -------------------------------- */

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
  mutation emailSignUp($name: Name!, $email: EmailAddress!, $phoneNumber: PhoneNumber!, $password: Password!) {
    EmailSignUp(name: $name, email: $email, password: $password, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;

export const CREATE_HOUSE = gql`
  mutation createHouse($name: String!, $houseType: HouseType!, $location: LocationInput!) {
    CreateHouse(name: $name, houseType: $houseType, location: $location) {
      ok
      error
    }
  }
`;
