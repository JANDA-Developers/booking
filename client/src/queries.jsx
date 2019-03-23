import gql from 'graphql-tag';

/* -------------------------------- client ------------------------------- */
// 로그인이 되었는지?
export const IS_LOGGED_IN = gql`
  {
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
  {
    auth {
      lastSelectedHouse @client {
        label
        value
      }
    }
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
// 상품 모두 가져오기
// eslint-disable-next-line camelcase
export const GET_All_PRODUCTS_TYPES = gql`
  query {
    GetAllProductTypes {
      ok
      error
      productTypes {
        _id
        name
      }
    }
  }
`;
// 유저 핸드폰 가져오기
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

// 유저 정보 가져오기
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
// 이메일 로그인
export const EMAIL_SIGN_IN = gql`
  query emailSignIn($email: EmailAddress!, $password: Password!) {
    EmailSignIn(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;
// 단일 숙소 가져오기
export const GET_HOUSE = gql`
  query getHouse($houseId: ID!) {
    GetHouse(houseId: $houseId) {
      ok
      error
      house {
        _id
        name
        houseType
        product {
          _id
          name
          productType {
            _id
          }
        }
        location {
          address
          addressDetail
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/* -------------------------------- mutation -------------------------------- */
// 프로필 업데이트
export const UPDATE_MYPROFILE = gql`
  mutation updateMyProfile($name: Name!, $phoneNumber: PhoneNumber!, $email: EmailAddress!, $password: Password!) {
    UpdateMyProfile(name: $name, phoneNumber: $phoneNumber, email: $email, password: $password) {
      ok
      error
    }
  }
`;
// 숙소 업데이트
export const UPDATE_HOUSE = gql`
  mutation updateHouse(
    $houseId: ID!
    $name: String
    $houseType: HouseType!
    $location: LocationInput!
    $refundPolicy: [TermsOfRefundInput!]
    $termsOfBooking: TermsOfBookingInput
  ) {
    UpdateHouse(
      houseId: $houseId
      name: $name
      houseType: $houseType
      location: $location
      refundPolicy: $refundPolicy
      termsOfBooking: $termsOfBooking
    ) {
      ok
      error
    }
  }
`;
// 상품구매
export const BUY_PRODUCTS = gql`
  mutation buyProduct($houseId: ID!, $productTypeId: ID!) {
    BuyProduct(houseId: $houseId, productTypeId: $productTypeId) {
      ok
      error
    }
  }
`;
// 핸드폰인증
export const PHONE_VERIFICATION = gql`
  mutation startPhoneVerification {
    StartPhoneVerification {
      ok
      error
    }
  }
`;
// 핸드폰인증 완료
export const COMEPLETE_PHONE_VERIFICATION = gql`
  mutation completePhoneVerification($key: String!) {
    CompletePhoneVerification(key: $key) {
      ok
      error
    }
  }
`;
// 회원가입
export const EMAIL_SIGN_UP = gql`
  mutation emailSignUp($name: Name!, $email: EmailAddress!, $phoneNumber: PhoneNumber!, $password: Password!) {
    EmailSignUp(name: $name, email: $email, password: $password, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;
// 숙소생성
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
// 숙소삭제
export const DELETE_HOUSE = gql`
  mutation deleteHouse($id: String!) {
    DeleteHouse(_id: $id) {
      ok
      error
    }
  }
`;
// 상품해지
export const REFUND_PRODUCT = gql`
  mutation refundProduct($houseId: ID!, $productId: ID!) {
    RefundProduct(houseId: $houseId, productId: $productId) {
      ok
      error
    }
  }
`;
