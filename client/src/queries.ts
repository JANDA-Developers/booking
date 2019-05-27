import gql from "graphql-tag";

// 👿 Read This [https://www.apollographql.com/docs/react/advanced/fragments#fragment-matcher]
const F_LOCATION = gql`
  fragment FieldsLocation on House {
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
const F_ALL_SEASON = gql`
  fragment FallSeason on Season {
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
`;
const F_PAGE_INFO = gql`
  fragment FpageInfo on PageInfoOffsetBase {
    currentPage
    totalPage
    rowCount
  }
`;
const F_ROOMTYPE = gql`
  fragment FroomType on RoomType {
    _id
    name
    pricingType
    peopleCount
    peopleCountMax
    index
    roomCount
    roomGender
    img
    description
    defaultPrice
    createdAt
    updatedAt
    roomTemplateSrl
  }
`;

const F_AVAILABLE_PEOPLE_COUNT = gql`
  fragment FavailablePeopleCount on AvailablePeopleCount {
    countAny
    countFemale
    countMale
  }
`;

const F_BOOKER = gql`
  fragment Fbooker on Booker {
    _id
    roomTypes {
      ...FroomType
    }
    name
    password
    phoneNumber
    email
    checkIn {
      isIn
      checkInDateTime
    }
    memo
    agreePrivacyPolicy
    start
    end
    price
    payMethod
    paymentStatus
    bookingStatus
    createdAt
    updatedAt
  }
  ${F_ROOMTYPE}
`;

const F_ROOM = gql`
  fragment Froom on Room {
    _id
    name
    pricingType
    peopleCount
    peopleCountMax
    index
    createdAt
    updatedAt
    roomSrl
  }
`;

const F_GUEST = gql`
  fragment Fguest on Guest {
    _id
    allocatedRoom {
      ...Froom
    }
    isUnsettled
    isSettleable {
      flag
      duplicateDates {
        start
        end
      }
    }
    name
    start
    end
    pricingType
    bedIndex
    gender
    createdAt
    updatedAt
  }
  ${F_ROOM}
`;
const F_ROOM_CAPACITY = gql`
  fragment FroomTypeCapacity on RoomTypeCapacity {
    roomTypeId
    pricingType
    availablePeopleCount {
      ...FavailablePeopleCount
    }
    roomCapacityList {
      roomId
      roomGender
      availableGenders
      availableCount
      peopleCount
      emptyBeds
    }
  }
  ${F_AVAILABLE_PEOPLE_COUNT}
`;
// 유저 기본정보 빼오기
const F_USER_INFO = gql`
  fragment FieldsUser on User {
    _id
    name
    phoneNumber
    password
    email
    isPhoneVerified
    profileImg
    checkPrivacyPolicy
    userRole
    houses {
      roomTypes {
        _id
      }
      hostApplication {
        url
      }
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

export const GET_ROOMTYPE_BY_ID = gql`
  query getRoomTypeById($roomTypeId: ID!) {
    GetRoomTypeById(roomTypeId: $roomTypeId) {
      ok
      error
      roomType {
        _id
        name
        pricingType
        peopleCount
        peopleCountMax
        index
        roomGender
        img
        description
        defaultPrice
        createdAt
        updatedAt
      }
    }
  }
`;

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

// 예약모두 가져오기
// export const GET_All_BOOKINGS = gql`
//   query getBookings($page: Int!, $count: Int!, $houseId: ID!) {
//     GetBookings {
//     ok
//       error
//       bookings {
//         _id
//         bookingId
//         name
//       }
//     }
//   }
// `;

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
        ...FieldsUser
      }
    }
  }
  ${F_USER_INFO}
`;

// 모든 유저 정보 가져오기  👿 제거될 예정
// export const GEA_All_HOUSE_SUPER_USER = gql`
//   query getHousesForSU($first: Int!, $cursor: String, $sort: HouseSortInput, $filter: HouseFilter) {
//     GetHousesForSU(first: $first, cursor: $cursor, sort: $sort, filter: $filter) {
//       ok
//       error
//       result {
//         totalCount
//         pageInfo {
//           startCursor
//           endCursor
//           hasPreviousPage
//           hasNextPage
//         }
//         edges {
//           cursor
//           node {
//             _id
//             name
//             houseType
//             user {
//               _id
//               phoneNumber
//               profileImg
//             }
//             location {
//               address
//               addressDetail
//             }
//             createdAt
//             product {
//               _id
//               name
//               productType {
//                 _id
//               }
//             }
//             updatedAt
//           }
//         }
//       }
//     }
//   }
// `;

// 슈퍼어드민 모든 집 GET
export const GET_HOUSES_FOR_SU = gql`
  query getHousesForSU($page: Int!, $count: Int!) {
    GetHousesForSU(page: $page, count: $count) {
      ok
      error
      houses {
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
        updatedAt
        product {
          _id
          name
          productType {
            _id
          }
        }
      }
      pageInfo {
        ...FpageInfo
      }
    }
  }
  ${F_PAGE_INFO}
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
        roomTypes {
          _id
        }
        hostApplication {
          url
        }
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

export const GET_GUESTS = gql`
  query getGuests($start: DateTime!, $end: DateTime!, $houseId: ID!) {
    GetGuests(start: $start, end: $end, houseId: $houseId) {
      ok
      error
      guests {
        roomType {
          _id
        }
        booker {
          _id
          bookingStatus
          checkIn {
            isIn
          }
        }
        ...Fguest
      }
    }
  }
  ${F_GUEST}
`;

export const GET_AVAILABLE_GUEST_COUNT = gql`
  query getAvailableGuestCount(
    $roomTypeId: ID!
    $start: DateTime!
    $end: DateTime!
    $femalePadding: Int!
    $malePadding: Int!
  ) {
    GetMale: GetAvailableGuestCount(
      roomTypeId: $roomTypeId
      start: $start
      end: $end
      gender: MALE
      paddingOtherGenderCount: $femalePadding
    ) {
      ok
      error
      roomCapacity {
        ...FroomTypeCapacity
      }
    }
    GetFemale: GetAvailableGuestCount(
      roomTypeId: $roomTypeId
      start: $start
      end: $end
      gender: FEMALE
      paddingOtherGenderCount: $malePadding
    ) {
      ok
      error
      roomCapacity {
        ...FroomTypeCapacity
      }
    }
  }
  ${F_ROOM_CAPACITY}
`;

export const GET_ALL_ROOMTYPES = gql`
  query getAllRoomType($houseId: ID!) {
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        ...FminiRoomType
        pricingType
        peopleCount
        peopleCountMax
        roomGender
        roomCount
        createdAt
        defaultPrice
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
  ${F_MINI_ROOM_TYPE}
`;

export const FIND_BOOKER = gql`
  query findBooker(
    $name: Name!
    $phoneNumber: PhoneNumber!
    $password: String!
    $houseId: ID
  ) {
    FindBooker(
      name: $name
      phoneNumber: $phoneNumber
      password: $password
      houseId: $houseId
    ) {
      ok
      error
      bookers {
        ...Fbooker
        guests {
          ...Fguest
          roomType {
            ...FminiRoomType
          }
        }
      }
    }
  }
  ${F_GUEST}
  ${F_BOOKER}
  ${F_MINI_ROOM_TYPE}
`;

// ⭐️방배정!!
// 모든 방타입 + 모든 게스트 가져오기!!
export const GET_ALL_ROOMTYPES_WITH_GUESTS = gql`
  query getAllRoomTypeWithGuest(
    $houseId: ID!
    $start: DateTime!
    $end: DateTime!
  ) {
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        ...FminiRoomType
        pricingType
        peopleCount
        peopleCountMax
        roomGender
        roomCount
        createdAt
        updatedAt
        defaultPrice
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
    GetGuests(start: $start, end: $end, houseId: $houseId) {
      ok
      error
      guests {
        ...Fguest
        roomType {
          _id
          index
        }
        allocatedRoom {
          ...Froom
        }
        booker {
          bookingStatus
          _id
          checkIn {
            isIn
          }
        }
      }
    }
  }
  ${F_GUEST}
  ${F_MINI_ROOM_TYPE}
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
export const GET_USER_FOR_SU = gql`
  query getUserForSU($userId: ID!) {
    GetUserForSU(userId: $userId) {
      ok
      error
      user {
        ...FieldsUser
      }
    }
  }
  ${F_USER_INFO}
`;

export const GET_APPLIED_PRICE_WITH_DATE = gql`
  query getAppliedPriceWithDateRange(
    $roomTypeId: ID!
    $start: DateTime!
    $end: DateTime!
  ) {
    GetAppliedPriceWithDateRange(
      roomTypeId: $roomTypeId
      start: $start
      end: $end
    ) {
      ok
      error
      seasonPrices {
        season {
          start
          end
        }
        defaultPrice
        dayOfWeekPrices {
          price
          applyDays
        }
      }
      roomPrices {
        _id
        price
        date
        createdAt
        updatedAt
      }
    }
  }
`;

// 모든 방타입 가져오기
export const GET_ALL_ROOM_TYPE_CAPACITY = gql`
  query getAllRoomTypeCapacity(
    $houseId: ID!
    $start: DateTime!
    $end: DateTime!
    $filter: String
  ) {
    GetAllRoomTypeCapacity(
      houseId: $houseId
      start: $start
      end: $end
      filter: $filter
    ) {
      ok
      error
      roomTypeWithCapacityList {
        roomType {
          ...FroomType
        }
        roomTypeCapacity {
          ...FroomTypeCapacity
        }
      }
    }
  }
  ${F_ROOMTYPE}
  ${F_ROOM_CAPACITY}
`;

// 모든 예약자 가져오기
export const GET_BOOKERS = gql`
  query getBookers($houseId: ID!, $page: Int!, $count: Int!) {
    GetBookers(houseId: $houseId, page: $page, count: $count) {
      ok
      error
      bookers {
        ...Fbooker
        guests {
          ...Fguest
          roomType {
            ...FminiRoomType
          }
        }
      }
      pageInfo {
        ...FpageInfo
      }
    }
  }
  ${F_GUEST}
  ${F_MINI_ROOM_TYPE}
  ${F_BOOKER}
  ${F_PAGE_INFO}
`;

export const GET_BOOKER = gql`
  query getBooker($bookerId: ID!) {
    GetBooker(bookerId: $bookerId) {
      ok
      error
      booker {
        ...Fbooker
        guests {
          _id
          gender
          roomType {
            _id
          }
        }
        price
        roomTypes {
          _id
          name
          pricingType
        }
        createdAt
        updatedAt
      }
    }
  }
  ${F_BOOKER}
`;
// START 시즌관련 ────────────────────────────────────────────────────────────────────────────────
// 가격 테이블 만들기
export const SEASON_TABLE = gql`
  query getAllSeason($houseId: ID!) {
    GetAllSeason(houseId: $houseId) {
      ok
      error
      seasons {
        ...FallSeason
      }
    }
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        ...FminiRoomType
      }
    }
  }
  ${F_MINI_ROOM_TYPE}
  ${F_ALL_SEASON}
`;

// 모든 시즌 가져오기
export const GET_ALL_SEASON_TABLE = gql`
  query getAllSeasonTable($houseId: ID!) {
    GetAllSeason(houseId: $houseId) {
      ok
      error
      seasons {
        ...FallSeason
      }
    }
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        ...FminiRoomType
      }
    }
    GetSeasonPrice(houseId: $houseId) {
      ok
      error
      seasonPrices {
        _id
        roomType {
          _id
        }
        season {
          _id
        }
        defaultPrice
        dayOfWeekPrices {
          price
          applyDays
        }
      }
    }
  }
  ${F_ALL_SEASON}
  ${F_MINI_ROOM_TYPE}
`;

/* -------------------------------- mutation -------------------------------- */

// START 예약관련 ────────────────────────────────────────────────────────────────────────────────
// 예약 생성

export const UPDATE_BOOKER = gql`
  mutation updateBooker(
    $bookerId: ID!
    $params: UpdateBookerMutationParamsInput!
  ) {
    UpdateBooker(bookerId: $bookerId, params: $params) {
      ok
      error
    }
  }
`;

export const DELETE_GUEST = gql`
  mutation deleteGuests($guestIds: [ID!]) {
    DeleteGuests(guestIds: $guestIds) {
      ok
      error
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation createBooker($bookingParams: CreateBookerParams!) {
    CreateBooker(bookingParams: $bookingParams) {
      ok
      error
      booker {
        ...Fbooker
        guests {
          ...Fguest
        }
      }
    }
  }
  ${F_BOOKER}
  ${F_GUEST}
`;

export const ALLOCATE_GUEST_TO_ROOM = gql`
  mutation allocateGuestToRoom($roomId: ID!, $guestId: ID!, $bedIndex: Int!) {
    AllocateGuestToRoom(
      roomId: $roomId
      guestId: $guestId
      bedIndex: $bedIndex
    ) {
      ok
      error
      guest {
        ...Fguest
      }
    }
  }
  ${F_GUEST}
`;

export const CREATE_ROOMTYPE = gql`
  mutation createRoomType(
    $name: String!
    $houseId: ID!
    $pricingType: PricingType!
    $peopleCount: Int!
    $peopleCountMax: Int
    $description: String
    $defaultPrice: Float!
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
      defaultPrice: $defaultPrice
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
  mutation createRoomPrice(
    $price: Float!
    $roomTypeId: ID!
    $houseId: ID!
    $date: DateTime!
  ) {
    CreateRoomPrice(
      price: $price
      roomTypeId: $roomTypeId
      houseId: $houseId
      date: $date
    ) {
      ok
      error
    }
  }
`;

export const DELETE_BOOKER = gql`
  mutation deleteBooker($bookerId: ID!) {
    DeleteBooker(bookerId: $bookerId) {
      ok
      error
    }
  }
`;

export const DELETE_ROOM_PRICE = gql`
  mutation deleteRoomPrice($roomTypeId: ID!, $date: DateTime!) {
    DeleteRoomPrice(roomTypeId: $roomTypeId, date: $date) {
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

// 방 업데이트yar
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
    $name: String
    $peopleCount: Int
    $peopleCountMax: Int
    $defaultPrice: Float
    $description: String
    $img: URL
  ) {
    UpdateRoomType(
      roomTypeId: $roomTypeId
      params: {
        name: $name
        peopleCount: $peopleCount
        peopleCountMax: $peopleCountMax
        description: $description
        defaultPrice: $defaultPrice
        img: $img
      }
    ) {
      ok
      error
    }
  }
`;

// START 시즌관련 ────────────────────────────────────────────────────────────────────────────────
export const CREATE_SEASON_PRICE = gql`
  mutation createSeasonPrice(
    $roomTypeId: ID!
    $seasonId: ID!
    $defaultPrice: Float!
    $dayOfWeekPrices: [DayOfWeekPriceInput!]
  ) {
    CreateSeasonPrice(
      roomTypeId: $roomTypeId
      seasonId: $seasonId
      defaultPrice: $defaultPrice
      dayOfWeekPrices: $dayOfWeekPrices
    ) {
      ok
      error
    }
  }
`;

// 시즌 생성
export const CREATE_SEASON = gql`
  mutation createSeason(
    $name: String!
    $start: DateTime!
    $end: DateTime!
    $houseId: ID!
    $color: String
    $description: String
    $seasonPrices: [SeasonPriceInput!]
  ) {
    CreateSeason(
      name: $name
      start: $start
      end: $end
      houseId: $houseId
      color: $color
      description: $description
      seasonPrices: $seasonPrices
    ) {
      ok
      error
    }
  }
`;

export const CHANGE_PRIORITY = gql`
  mutation changePriority($seasonId: ID!, $houseId: ID!, $priority: Int!) {
    ChangePriority(
      seasonId: $seasonId
      houseId: $houseId
      priority: $priority
    ) {
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
    $seasonPrices: [SeasonPriceInput!]
  ) {
    UpdateSeason(
      seasonPrices: $seasonPrices
      name: $name
      start: $start
      end: $end
      seasonId: $seasonId
      color: $color
      description: $description
    ) {
      ok
      error
    }
  }
`;

// 호스트관련 ────────────────────────────────────────────────────────────────────────────────
// 프로필 업데이트
export const UPDATE_MYPROFILE = gql`
  mutation updateMyProfile(
    $name: Name!
    $phoneNumber: PhoneNumber!
    $email: EmailAddress!
    $password: Password!
    $profileImg: URL
  ) {
    UpdateMyProfile(
      name: $name
      phoneNumber: $phoneNumber
      email: $email
      password: $password
      profileImg: $profileImg
    ) {
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
  mutation emailSignUp(
    $name: Name!
    $email: EmailAddress!
    $phoneNumber: PhoneNumber!
    $password: Password!
  ) {
    EmailSignUp(
      name: $name
      email: $email
      password: $password
      phoneNumber: $phoneNumber
    ) {
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
  mutation createHouse(
    $name: String!
    $houseType: HouseType!
    $location: LocationInput!
  ) {
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
