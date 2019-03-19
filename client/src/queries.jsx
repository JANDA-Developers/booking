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
// 하우스 선택
export const SELECT_HOUSE = gql`
  mutation selectHouse($selectedHouse: SelectOption!) {
    selectHouse(selectedHouse: $selectedHouse) @client {
      ok
      erorr
    }
  }
`;

/* ---------------------------------- query --------------------------------- */

// 프로덕트 UI와  DB의 정보 싱크는 수동으로 맞추세요.
// eslint-disable-next-line camelcase
export const GET_All_PRODUCTS = gql`
  query {
    GetAllProducts {
      ok
      error
      products {
        _id
        name
      }
    }
  }
`;

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

export const UPDATE_MYPROFILE = gql`
  mutation updateMyProfile($name: Name!, $phoneNumber: PhoneNumber!, $email: EmailAddress!) {
    UpdateMyProfile(name: $name, phoneNumber: $phoneNumber, email: $email) {
      ok
      error
    }
  }
`;

export const BUY_PRODUCTS = gql`
  mutation buyProduct($houseId: ID!, $productId: ID!) {
    BuyProduct(houseId: $houseId, productId: $productId) {
      ok
      error
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
      house {
        _id
        name
      }
    }
  }
`;
