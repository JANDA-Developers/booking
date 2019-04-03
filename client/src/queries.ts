import gql from 'graphql-tag';

/* ---------------------------------- query --------------------------------- */

// 프로덕트 UI와  DB의 정보 싱크는 수동으로 맞추세요.
// 상품 모두 가져오기
// eslint-disable-next-line camelcase
export const GET_All_PRODUCTS_TYPES = gql`
  query getAllProductTypes {
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
  query getMyProfile {
    GetMyProfile{
        user {
          phoneNumber
        }
      }
    }
`;

// 유저 정보 가져오기
export const GET_USER_INFO = gql`
  query getMyProfile {
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
            productType {
              _id
            }
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
// 모든 방타입 가져오기
export const GET_ALL_ROOMTYPES = gql`
  query getAllRoomType($houseId: ID!){
    GetAllRoomType(houseId:$houseId) {
      ok
      error
      roomTypes {
        _id
        name
        pricingType
        peopleCount
        peopleCountMax
        index
        roomCount
        roomGender
        description
        createdAt
        updatedAt
        rooms {
          _id       
          name
          index
          createdAt
          updatedAt
        }
      }
    }
  }`;

/* -------------------------------- mutation -------------------------------- */
// 방타입 생성
export const CREATE_ROOMTYPE = gql`
  mutation createRoomType($name: String!, $houseId: ID!, $pricingType: PricingType!, $peopleCount: Int!, $peopleCountMax: Int, $description: String, $tags: [TagInput!]) {
    CreateRoomType(name: $name, houseId: $houseId, pricingType: $pricingType, peopleCount: $peopleCount ,peopleCountMax: $peopleCountMax, description: $description, tags: $tags) {
      ok
      error
  }
}`;
// 방 생성
export const CREATE_ROOM = gql`
mutation createRoom($name: String!, $roomType: ID!) {
  CreateRoom(name: $name, roomType: $roomType) {
    ok
    error
  }
}`;
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
