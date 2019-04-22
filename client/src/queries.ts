import gql from 'graphql-tag';

const F_LOCATION = gql`
  fragment fieldsLocation on House {
    location {
      address
      addressDetail
    }
  }
`;
const F_MINI_ROOM_TYPE = gql`
  fragment FminiRoomType on RoomType {
    _id
    name
    index
    description
  }
`;
// 유저 기본정보 빼오기
const F_USER_INFO = gql`
  fragment fieldsUser on User {
    _id
    name
    phoneNumber
    password
    email
    isPhoneVerified
    checkPrivacyPolicy
    userRole
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
`;
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
    GetMyProfile {
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
        ...fieldsUser
      }
    }
  }
  ${F_USER_INFO}
`;

// 모든 유저 정보 가져오기
export const GEA_All_HOUSE_SUPER_USER = gql`
  query getHousesForSU($first: Int!, $cursor: String, $sort: HouseSortInput, $filter: HouseFilter) {
    GetHousesForSU(first: $first, cursor: $cursor, sort: $sort, filter: $filter) {
      ok
      error
      result {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            _id
            name
            houseType
            user {
              _id
              phoneNumber
              profileImg
            }
            location {
              address
              addressDetail
            }
            createdAt
            product {
              _id
              name
              productType {
                _id
              }
            }
            updatedAt
          }
        }
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
  query getAllRoomType($houseId: ID!) {
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        _id
        name
        pricingType
        peopleCount
        peopleCountMax
        roomGender
        roomCount
        index
        description
        createdAt
        updatedAt
        img
        rooms {
          _id
          name
          index
          createdAt
          updatedAt
        }
      }
    }
  }
`;

// 모든 방타입 가져오기
export const GET_ALL_ROOMTYPES_PRICE = gql`
  query getAllRoomTypePrice($houseId: ID!, $start: DateTime!, $end: DateTime!) {
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        ...FminiRoomType
      }
    }
    GetAllRoomPrice(houseId: $houseId, start: $start, end: $end) {
      ok
      error
      roomPrices {
        _id
        price
        date
        roomType {
          _id
        }
      }
    }
  }
  ${F_MINI_ROOM_TYPE}
`;
// 모든 방타입 가져오기
// export const GET_ALL_SEASON_PRICE = gql`
//   query getSeasonPrice($houseId: ID!) {
//     GetSeasonPrice(houseId: $houseId) {
//       ok
//       error
//       roomTypes {
//         _id
//         name
//         index
//         description
//       }
//     }
//   }
// `;
// 모든 방타입 가져오기
export const GET_USER_FOR_SU = gql`
  query getUserForSU($userId: ID!) {
    GetUserForSU(userId: $userId) {
      ok
      error
      user {
        ...fieldsUser
      }
    }
  }
  ${F_USER_INFO}
`;
// START 시즌관련 ────────────────────────────────────────────────────────────────────────────────
// 가격 테이블 만들기
export const SEASON_TABLE = gql`
  query getAllSeason($houseId: ID!) {
    GetAllSeason(houseId: $houseId) {
      ok
      error
      seasons {
        _id
        name
        start
        end
        priority
        color
        description
        createdAt
        updatedAt
      }
    }
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        ...FminiRoomType
      }
    }
    ${F_MINI_ROOM_TYPE}
  }
`;

// 모든 시즌 가져오기
export const GET_ALL_SEASON = gql`
  query getAllSeason($houseId: ID!) {
    GetAllSeason(houseId: $houseId) {
      ok
      error
      seasons {
        _id
        name
        start
        end
        priority
        color
        description
        createdAt
        updatedAt
      }
    }
  }
`;

/* -------------------------------- mutation -------------------------------- */

// START 예약관련 ────────────────────────────────────────────────────────────────────────────────
// 예약 생성
export const CREATE_BOOKING = gql`
  mutation createBooking($bookingParams: BookingInput!) {
    CreateBooking(bookingParams: $bookingParams) {
      ok
      error
    }
  }
`;

// START 방관련 ────────────────────────────────────────────────────────────────────────────────
// 방타입 생성
export const CREATE_ROOMTYPE = gql`
  mutation createRoomType(
    $name: String!
    $houseId: ID!
    $pricingType: PricingType!
    $peopleCount: Int!
    $peopleCountMax: Int
    $description: String
    $tags: [TagInput!]
    $img: URL
    $roomGender: RoomGender
  ) {
    CreateRoomType(
      name: $name
      houseId: $houseId
      pricingType: $pricingType
      peopleCount: $peopleCount
      peopleCountMax: $peopleCountMax
      description: $description
      roomGender: $roomGender
      tags: $tags
      img: $img
    ) {
      ok
      error
    }
  }
`;
// 방 생성
export const CREATE_ROOM = gql`
  mutation createRoom($name: String!, $roomType: ID!) {
    CreateRoom(name: $name, roomType: $roomType) {
      ok
      error
    }
  }
`;
export const CREATE_ROOM_PRICE = gql`
  mutation createRoomPrice($price: Float!, $roomTypeId: ID!, $houseId: ID!, $date: DateTime!) {
    CreateRoomPrice(price: $price, roomTypeId: $roomTypeId, houseId: $houseId, date: $date) {
      ok
      error
    }
  }
`;
// 방타입 제거
export const DELETE_ROOMTYPE = gql`
  mutation deleteRoomType($houseId: ID!, $roomTypeId: ID!) {
    DeleteRoomType(houseId: $houseId, roomTypeId: $roomTypeId) {
      ok
      error
    }
  }
`;
// 방 제거
export const DELETE_ROOM = gql`
  mutation deleteRoom($roomId: ID!) {
    DeleteRoom(roomId: $roomId) {
      ok
      error
    }
  }
`;
// 방 업데이트
export const UPDATE_ROOM = gql`
  mutation updateRoom($roomId: ID!, $name: String) {
    UpdateRoom(roomId: $roomId, name: $name) {
      ok
      error
    }
  }
`;
// 방 타입 업데이트
export const UPDATE_ROOMTYPE = gql`
  mutation updateRoomType(
    $roomTypeId: ID!
    $houseId: ID!
    $name: String
    $peopleCount: Int
    $peopleCountMax: Int
    $description: String
  ) {
    UpdateRoomType(
      roomTypeId: $roomTypeId
      houseId: $houseId
      name: $name
      peopleCount: $peopleCount
      peopleCountMax: $peopleCountMax
      description: $description
    ) {
      ok
      error
    }
  }
`;

// START 시즌관련 ────────────────────────────────────────────────────────────────────────────────
// 시즌 생성
export const CREATE_SEASON = gql`
  mutation createSeason(
    $name: String!
    $start: DateTime!
    $end: DateTime!
    $houseId: ID!
    $color: String
    $description: String
  ) {
    CreateSeason(name: $name, start: $start, end: $end, houseId: $houseId, color: $color, description: $description) {
      ok
      error
    }
  }
`;
// 시즌 삭제
export const DELETE_SEASON = gql`
  mutation deleteSeason($seasonId: ID!, $houseId: ID!) {
    DeleteSeason(seasonId: $seasonId, houseId: $houseId) {
      ok
      error
    }
  }
`;
// 시즌 업데이트
export const UPDATE_SEASON = gql`
  mutation updateSeason(
    $name: String!
    $start: DateTime!
    $end: DateTime!
    $seasonId: ID!
    $color: String
    $description: String
  ) {
    UpdateSeason(name: $name, start: $start, end: $end, seasonId: $seasonId, color: $color, description: $description) {
      ok
      error
    }
  }
`;

// 호스트관련 ────────────────────────────────────────────────────────────────────────────────
// 프로필 업데이트
export const UPDATE_MYPROFILE = gql`
  mutation updateMyProfile($name: Name!, $phoneNumber: PhoneNumber!, $email: EmailAddress!, $password: Password!) {
    UpdateMyProfile(name: $name, phoneNumber: $phoneNumber, email: $email, password: $password) {
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
// 숙소관련 ────────────────────────────────────────────────────────────────────────────────
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
// 상품관련 ────────────────────────────────────────────────────────────────────────────────
// 상품구매
export const BUY_PRODUCTS = gql`
  mutation buyProduct($houseId: ID!, $productTypeId: ID!) {
    BuyProduct(houseId: $houseId, productTypeId: $productTypeId) {
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
