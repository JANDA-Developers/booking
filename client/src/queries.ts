import gql from "graphql-tag";

// 👿 Read This [https://www.apollographql.com/docs/react/advanced/fragments#fragment-matcher]
// 지역에 관한 프레임
export const F_LOCATION = gql`
    fragment FieldsLocation on House {
        location {
            address
            addressDetail
        }
    }
`;

export const F_HOUSE = gql`
    fragment Fhouse on House {
        _id
        name
        houseType
        publicKey
        hostMemo
        createdAt
        updatedAt
    }
`


export const F_HM = gql`
    fragment FHM on HouseManual {
        _id
        name
        lang
        backgroundImg
        profileImg
        phoneNumber
        createdAt
        updatedAt
    }
`

// 하우스메뉴얼 메뉴
export const F_HMM = gql`
    fragment FHMM on HMMenu {
        id
        name
        type
        icon
        img
        content
        isEnable
    }
`

// 룸타입 관련된 최소 프레임
export const F_HOUSE_CONFIG = gql`
    fragment FhouseConfig on HouseConfig {
        assigTimeline {
            roomTypeTabEnable
            itemBlockOp {
                itemBlockOpEnable
                useColor
            }
        }
        pollingPeriod {
            enable
            period
        }
        bookingConfig {
            newBookingMark {
                enable
                newGuestTime
            }
        }
    }
`;

// 상품 관련 프레임
export const F_PRODUCT_TYPE = gql`
    fragment FprodcutType on ProductType {
        _id
        name
        price
        roomCount
        key
        roomCountExtraCharge
        bookingCount
        bookingCountExtraCharge
        description
        canHaveHostApp
        createdAt
        updatedAt
    }
`

// 상품 관련 프레임
export const F_APP_INFO_REQUEST = gql`
    fragment FappInfoRequest on AppInfoRequest {
        url
        layoutType
        requestedDate
        isDone
        useHostApp
    }
`

// 상품 관련 프레임
export const F_PRODUCT = gql`
    fragment Fprodcut on Product {
        _id
        name
        price
        discountedPrice
        roomCount
        roomCountExtraCharge
        bookingCount
        bookingCountExtraCharge
        layoutType
        layoutPrice
        layoutPricePaid
        appliedUrl
        canHaveHostApp
        existingHostApp
        description
        status
        createdAt
        updatedAt
    }
`;

// sms 템플릿 관련된 프레임
export const F_SMS_TEMPLATE = gql`
    fragment FsmsTemplate on SmsTemplate {
        _id
        formatName
        smsFormat
        smsSendCase {
            enable
            when
            who
        }
    }
`;

// 모든 시즌에 관한 프레임
export const F_ALL_SEASON = gql`
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

// 페이지 정보에 관한 프레임
export const F_PAGE_INFO = gql`
    fragment FpageInfo on PageInfoOffsetBase {
        currentPage
        totalPage
        rowCount
    }
`;

// SMS sender 와 관련된 프레임
export const F_SMS_SENDER = gql`
    fragment FsmsSender on SmsSender {
        phoneNumber
        verified
        registered
    }
`;

// sms History
export const F_SMS_HISTORY = gql`
    fragment FsmsHistory on SmsHistory {
        _id
        msg
        sender
        receivers
        sendResult
        autoSend
        msgType
        createdAt
        updatedAt
    }
`;

// 방타입에 관한 프레임 
export const F_ROOMTYPE = gql`
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
        roomGender
    }
`;

// 예약가능한 인원 프레임
export const F_AVAILABLE_PEOPLE_COUNT = gql`
    fragment FavailablePeopleCount on AvailablePeopleCount {
        countAny
        countFemale
        countMale
    }
`;

// 예약에 관한 정보프레임
export const F_BOOKING = gql`
    fragment Fbooking on Booking {
        _id
        roomTypes {
            ...FroomType
        }
        isNew
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
        isNew
        isConfirm
    }
    ${F_ROOMTYPE}
`;

//  방에대한 정보 프레임
export const F_ROOM = gql`
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

export const F_BLOCK_OP = gql`
    fragment FblockOp on BlockOption {
        color
    }
    `
// 게스트에 관한 정보 프레임(방정보 포함)
export const F_GUEST = gql`
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
        guestType
        createdAt
        updatedAt
    }
    ${F_ROOM}
`;

// 에약가능 인원 관련 프레임
export const F_ROOM_CAPACITY = gql`
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

// 유저 기본적인 정보 프레임
export const F_USER_INFO = gql`
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
        userRoles
        createdAt
        updatedAt
    }
`;


// 모든 방타입을 가져오는 프레임 묶음 
const sharedGetAllRoomType = gql`
    fragment FsharedGetAllRoomType on GetAllRoomTypeResponse {
        ok
        error
        roomTypes {
            _id
            name
            index
            description
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
`;


/* ---------------------------------- query --------------------------------- */


// 하우스 명세서 가져오기
export const GET_HOUSE_SPECIFICATION = gql`
    query getSpecification($houseId: ID!) {
        GetHouse(houseId: $houseId) {
            ok
            error
            house {
                _id
                name
                houseType
                appInfo {
                    url
                }
                product {
                    ...Fprodcut
                    appInfoRequested {
                        ...FappInfoRequest
                    }
                    productType {
                        _id
                        name
                    }
                }
                createdAt
                updatedAt
                user {
                    _id
                    name
                    phoneNumber
                    email
                    isPhoneVerified
                    userRole
                    userRoles
                }
            }
        }
    }
    ${F_PRODUCT}
    ${F_APP_INFO_REQUEST}
`;

// SMS :: 히스토리 가져오기
export const GET_SMS_HISTORY = gql`
    query getSmsHistory($smsInfoId: ID! $page: Int! $count: Int!) {
        GetSmsHistory(smsInfoId: $smsInfoId,  page: $page, count: $count) {
            ok
            error
            smsHistories {
                ...FsmsHistory
            }
            pageInfo {
                ...FpageInfo
            }
        }
    }
    ${F_PAGE_INFO}
    ${F_SMS_HISTORY}
`

// 방타입 :: 아이디로서 조회
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


export const UPDATE_SEASON_PRICES = gql`
    mutation updateSeasonPrices (
        $seasonPricesInputs: [UpdateSeasonPriceInput!]
        $defaultRoomTypePriceInputs: [RoomTypePriceInput!]
    ) {
        UpdateSeasonPrices(seasonPricesInputs:$seasonPricesInputs, defaultRoomTypePriceInputs: $defaultRoomTypePriceInputs) {
            ok
            error
        }
    }
`

// 방타입 :: 모든 방타입을 조회
export const GET_PRODUCTS_TYPES = gql`
    query getAllProductTypes {
        GetAllProductTypes {
            ok
            error
            productTypes {
                ...FprodcutType
            }
        }
    }
    ${F_PRODUCT_TYPE}
`;


// 유저 :: 휴대폰번호 가져오기
export const GET_MY_PHON_NUMBER = gql`
    query getMyProfile {
        GetMyProfile {
            user {
                phoneNumber
            }
        }
    }
`;

// 유저 :: 정보 가져오기
export const GET_USER_INFO = gql`
    query getMyProfile {
        GetMyProfile {
            user {
                ...FieldsUser
                houses {
                    houseConfig {
                        ...FhouseConfig
                    }
                    smsInfo {
                        _id
                    }
                    roomTypes {
                        _id
                    }
                    appInfo {
                        url
                    }
                    product {
                        ...Fprodcut
                        productType {
                            _id
                        }
                        appInfoRequested { 
                            ...FappInfoRequest
                        }
                    }
                    ...Fhouse
                    _id
                    name
                    hostMemo
                    houseType
                    location {
                        address
                        addressDetail
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    }
    ${F_HOUSE}
    ${F_USER_INFO}
    ${F_PRODUCT}
    ${F_APP_INFO_REQUEST}
    ${F_HOUSE_CONFIG}
`;

// 슈퍼계정 :: 모든집 가져오기
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

// 유저 :: 이메일 로그인
export const EMAIL_SIGN_IN = gql`
    query emailSignIn($email: EmailAddress!, $password: Password!) {
        EmailSignIn(email: $email, password: $password) {
            ok
            error
            token
        }
    }
`;

// 하우스 :: 아이디로 정보 가져오기
export const GET_HOUSE = gql`
    query getHouse($houseId: ID!) {
        GetHouse(houseId: $houseId) {
            ok
            error
            house {
                _id
                name
                houseType
                smsInfo {
                    _id
                }
                roomTypes {
                    ...FroomType
                    rooms {
                        ...Froom
                    }
                }
                appInfo {
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
                publicKey
                createdAt
                updatedAt
            }
        }
    }
    ${F_ROOMTYPE}
    ${F_ROOM}
`;

// 게스트 :: 모든 게스트 가져오기
export const GET_GUESTS = gql`
    query getGuests(
        $start: DateTime!
        $end: DateTime!
        $houseId: ID!
        $bookingStatus: BookingStatus
    ) {
        GetGuests(
            start: $start
            end: $end
            houseId: $houseId
            bookingStatus: $bookingStatus
        ) {
            ok
            error
            guests {
                roomType {
                    _id
                }
                booking {
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


// 방타입 :: 모든 방타입 가격 가져오기
export const PRICE_TIMELINE_GET_PRICE = gql`
  query priceTimelineGetPrice(
    $houseId: ID!
    $start: DateTime!
    $end: DateTime!
  ) {
    GetRoomTypeDatePrices(houseId:$houseId, start: $start, end: $end) {
      ok
      error
      roomTypeDatePrices {
        roomType {
          ...FroomType
        }
        datePrices {
          date
          price
        }
      }
    }
    GetAllRoomType(houseId: $houseId) {
      ok
      error
      roomTypes {
        _id
        name
        index
        description
      }
    }
    GetAllDailyPrice(houseId: $houseId, start: $start, end: $end) {
      ok
      error
      dailyPrices {
        _id
        price
        date
        roomType {
          _id
        }
      }
    }
  }
  ${F_ROOMTYPE}
`;

// 👿 Depreacated
// 예약 :: 예약가능한 인원 가져오기 (호스트용)
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


export const GET_CAPACITY_TO_ROOM_TYPE = gql`
    query getCapacityToRoomType(
        $roomTypeId: ID!
        $start: DateTime!
        $end: DateTime!
        $initValue: InitValueGetCapacityToRoomInput
    ) {
    GetCapacityToRoomType(roomTypeId:$roomTypeId, start:$start, end:$end, initValue: $initValue) {
        ok
        error
        capacityRoomType {
            ... on CapacityRoomType {
                count
            }
            ... on CapacityRoomTypeDomitory {
                    availableCount {
                        male
                        female
                        total
                    }
                }
            }
        }
    }
`


// 예약 :: 예약자를 위한 예약인원 가져오기 (인증 토큰때문)
export const GET_ALL_ROOM_TYPE_FOR_BOOKING = gql`
    query getAllRoomTypeForBooker {
        GetAllRoomTypeForBooker {
            ...FsharedGetAllRoomType
        }
    }
    ${sharedGetAllRoomType}
`;

// 예약 ::모든예약 가져오기
export const GET_ALL_ROOMTYPES = gql`
    query getAllRoomType($houseId: ID!) {
        GetAllRoomType(houseId: $houseId) {
            ...FsharedGetAllRoomType
        }
    }
    ${sharedGetAllRoomType}
`;

// 예약 ::예약정보로 예약찾기 (호스트용)
export const FIND_BOOKING = gql`
    query findBooking(
        $name: Name!
        $phoneNumber: PhoneNumber!
        $password: String!
        $houseId: ID
    ) {
        FindBooking(
            name: $name
            phoneNumber: $phoneNumber
            password: $password
            houseId: $houseId
        ) {
            ok
            error
            bookings {
                ...Fbooking
                guests {
                    ...Fguest
                    roomType {
                        _id
                        name
                        index
                        description
                    }
                }
            }
        }
    }
    ${F_GUEST}
    ${F_BOOKING}
`;

// 예약 ::예약정보로 예약찾기 (게스트용)
export const FIND_BOOKING_FOR_BOOKER = gql`
    query findBookingByPublic(
        $name: Name!
        $phoneNumber: PhoneNumber!
        $password: String!
    ) {
        FindBookingForBooker(
            name: $name
            phoneNumber: $phoneNumber
            password: $password
        ) {
            ok
            error
            bookings {
                ...Fbooking
                guests {
                    ...Fguest
                    roomType {
                        _id
                        name
                        index
                        description
                    }
                }
            }
        }
    }
    ${F_GUEST}
    ${F_BOOKING}
`;

export const GET_ROOM_TYPE_DATE_PRICE_FOR_BOOKER = gql`
    query getRoomTypeDatePricesForBooker(
        $start: DateTime!
        $end: DateTime!
        $roomTypeIds: [ID!]
    ) {
        GetRoomTypeDatePricesForBooker(start: $start, end:$end, roomTypeIds:$roomTypeIds) {
            ok
            error
            roomTypeDatePrices {
                roomType {
                    ...FroomType
                }
                datePrices {
                    date
                    price
                }
            }
        }
    }
    ${F_ROOMTYPE}
`

export const GET_ROOM_TYPE_DATE_PRICE = gql`
    query getRoomTypeDatePrices(
        $start: DateTime!
        $end: DateTime!
        $roomTypeIds: [ID!]
        $houseId: ID!
    ) {
        GetRoomTypeDatePrices(start: $start, end:$end, roomTypeIds:$roomTypeIds, houseId: $houseId) {
            ok
            error
            roomTypeDatePrices {
                roomType {
                    ...FroomType
                }
                datePrices {
                    date
                    price
                }
            }
        }
    }
    ${F_ROOMTYPE}
`


// ⭐️방배정!!
// 방배정 :: 모든 방막기 + 모든 방타입 + 모든 게스트 가져오기!!
export const GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM = gql`
    query getAllRoomTypeWithGuest(
        $houseId: ID!
        $start: DateTime!
        $end: DateTime!
        $bookingStatus: BookingStatus
    ) {
        GetAllRoomType(houseId: $houseId) {
            ok
            error
            roomTypes {
                _id
                name
                index
                description
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
        GetGuests(
            start: $start
            end: $end
            houseId: $houseId
            bookingStatus: $bookingStatus
        ) {
            ok
            error
            guests {
                ...Fguest
                blockOption {
                    ...FblockOp
                }
                roomType {
                    _id
                    index
                }
                allocatedRoom {
                    ...Froom
                }
                booking {
                    bookingStatus
                    _id
                    isNew
                    isConfirm
                    checkIn {
                        isIn
                    }
                }
            }
        }

        GetBlocks(start: $start, end: $end, houseId: $houseId) {
            ok
            error
            blocks {
                _id
                bedIndex
                guestType
                createdAt
                start
                end
                updatedAt
                allocatedRoom {
                    ...Froom
                }
            }
        }
    }
    ${F_GUEST}
    ${F_BLOCK_OP}
`;

// 방타입 :: 모든 방타입 가격 가져오기
export const GET_ALL_ROOMTYPES_PRICE = gql`
    query getAllRoomTypePrice(
        $houseId: ID!
        $start: DateTime!
        $end: DateTime!
    ) {
        GetAllRoomType(houseId: $houseId) {
            ok
            error
            roomTypes {
                _id
                name
                index
                description
            }
        }
        GetAllDailyPrice(houseId: $houseId, start: $start, end: $end) {
            ok
            error
            dailyPrices {
                _id
                price
                date
                roomType {
                    _id
                }
            }
        }
    }
`;

// 슈퍼유저 ::모든 유저 가져오기
export const GET_USER_FOR_SU = gql`
    query getUserForSU($userId: ID!) {
        GetUserForSU(userId: $userId) {
            ok
            error
            user {
                ...FieldsUser
                houses {
                    houseConfig {
                        ...FhouseConfig
                    }
                    smsInfo {
                        _id
                    }
                    roomTypes {
                        _id
                    }
                    appInfo {
                        url
                    }
                    product {
                        ...Fprodcut
                        productType {
                            _id
                        }
                        appInfoRequested { 
                            ...FappInfoRequest
                        }
                    }
                    _id
                    name
                    hostMemo
                    houseType
                    location {
                        address
                        addressDetail
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    }
    ${F_USER_INFO}
    ${F_PRODUCT}
    ${F_APP_INFO_REQUEST}
    ${F_HOUSE_CONFIG}
`;

// 배정 ::블록 옵션 설정
export const UPDATE_BLOCK_OPTION = gql`
    mutation updateBlockOption(
        $guestId: ID!
        $blockOption: BlockOptionInput!
        $applyWithBooking: Boolean!
    ) {
        UpdateBlockOption(guestId:$guestId, blockOption: $blockOption, applyWithBooking:$applyWithBooking) {
            ok
            error
        }
    }
`;

// 다큐먼트 ::  모든 README 패스 가져오기
export const GET_ALL_README = gql`
    query getAllReadMe {
        GetAllReadMe {
            ok
            error
            paths
        }
    }
`;

// 다큐먼트 ::  모든 README 패스 가져오기
export const GET_FILE_TXT = gql`
    query getFileTxt($path:String!) {
        GetFileTxt(path: $path) {
            ok
            error
            fileTxt
        }
    }
`;

// 방타입 :: 모든 방타입 인원을 가져오는것 (사용중인곳 없음)
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

// 예약 ::모든 예약을 가져옴
export const GET_BOOKINGS = gql`
    query getBookings(
        $houseId: ID!
        $page: Int!
        $count: Int!
        $filter: GetBookingsFilter
    ) {
        GetBookings(
            houseId: $houseId
            page: $page
            count: $count
            filter: $filter
        ) {
            ok
            error
            bookings {
                ...Fbooking
                guests {
                    ...Fguest
                    roomType {
                        _id
                        name
                        index
                        description                    }
                }
            }
            pageInfo {
                ...FpageInfo
            }
        }
    }
    ${F_GUEST}
    ${F_BOOKING}
    ${F_PAGE_INFO}
`;

// 예약 :: 아이디로서 예약을 조회
export const GET_BOOKING = gql`
    query getBooking($bookingId: ID!) {
        GetBooking(bookingId: $bookingId) {
            ok
            error
            booking {
                ...Fbooking
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
    ${F_BOOKING}
`;



export const GET_SALES_STATISTIC = gql`
    query getSalesStatistic(
        $houseId: ID!
        $start: DateTime!
        $end: DateTime!
        $unit: SalesStatisticsUnit!
    ){ 
        GetSalesStatistic(houseId:$houseId, start:$start, end:$end, unit:$unit) {
            ok
            error
            data {
                dateInfo {
                    year
                    month
                    week
                    date
                    dayOfWeek
                }
                price   
            }
        }
}`;


export const CHANGE_INDEX_FOR_ROOMTYPE = gql`
    mutation changeIndexForRoomType($roomTypeId: ID!, $houseId: ID!, $index: Int!) {
        ChangeIndexForRoomType(
            roomTypeId:$roomTypeId
            houseId: $houseId
            index: $index
        ) {
            ok
            error
        }
    }
`


// START 시즌관련 ────────────────────────────────────────────────────────────────────────────────
// 시즌 :: 시즌 + 방타입 + 시즌가격
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
                _id
                name
                index
                description
                defaultPrice
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
                dayOfWeekPriceList {
                    day
                    price
                    additionalPrice
                }
            }
        }
    }
    ${F_ALL_SEASON}
`;

/* -------------------------------- mutation -------------------------------- */

// START 예약관련 ────────────────────────────────────────────────────────────────────────────────
// 예약 :: 업데이트 예약
export const UPDATE_BOOKING = gql`
    mutation updateBooking(
        $bookingId: ID!
        $params: UpdateBookingMutationParamsInput!
        $sendSmsFlag: Boolean
    ) {
        UpdateBooking(
            bookingId: $bookingId
            params: $params
            sendSmsFlag: $sendSmsFlag
        ) {
            ok
            error
        }
    }
`;

// 게스트 :: 삭제 게스트
export const DELETE_GUEST = gql`
    mutation deleteGuests($guestIds: [ID!]) {
        DeleteGuests(guestIds: $guestIds) {
            ok
            error
        }
    }
`;

// 예약 ::예약생성 (게스트용)
export const CREATE_BOOKING_FOR_BOOKER = gql`
    mutation createBookingForBooker(
        $bookingParams: CreateBookingParams!
        $sendSmsFlag: Boolean!
    ) {
        CreateBookingForBooker(
            bookingParams: $bookingParams
            sendSmsFlag: $sendSmsFlag
        ) {
            ok
            error
            booking {
                _id
            }
        }
    }
`;

// 예약 :: 예약생성 (호스트용)
export const CREATE_BOOKING = gql`
    mutation createBooking(
        $bookingParams: CreateBookingParams!
        $sendSmsFlag: Boolean!
    ) {
        CreateBooking(
            bookingParams: $bookingParams
            sendSmsFlag: $sendSmsFlag
        ) {
            ok
            error
            booking {
                ...Fbooking
                guests {
                    ...Fguest
                }
            }
        }
    }
    ${F_BOOKING}
    ${F_GUEST}
`;

// 방배정 :: 게스트를 방에다 배정
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

// 방타입 :: 방타입 생성
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

// 방 :: 방생성
export const CREATE_ROOM = gql`
    mutation createRoom($name: String!, $roomType: ID!) {
        CreateRoom(name: $name, roomType: $roomType) {
            ok
            error
        }
    }
`;

// 방배정 :: 방막기 해제
export const DELETE_BLOCK = gql`
    mutation deleteBlock($blockId: ID!) {
        DeleteBlock(blockId: $blockId) {
            ok
            error
        }
    }
`;
// 방배정 :: 방막기
export const CREATE_BLOCK = gql`
    mutation createBlock(
        $start: DateTime!
        $end: DateTime!
        $houseId: ID!
        $roomId: ID!
        $bedIndex: Int!
    ) {
        CreateBlock(
            start: $start
            end: $end
            houseId: $houseId
            roomId: $roomId
            bedIndex: $bedIndex
        ) {
            ok
            error
            block {
                _id
                start
                end
                guestType
            }
        }
    }
`;
// 디테일 가격설정 :: 방가격 생성
export const CREATE_DAILY_PRICE = gql`
    mutation createDailyPrice(
        $price: Float!
        $roomTypeId: ID!
        $houseId: ID!
        $date: DateTime!
    ) {
        CreateDailyPrice(
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
// 예약 ::예약삭제
export const DELETE_BOOKING = gql`
    mutation deleteBooking($bookingId: ID!) {
        DeleteBooking(bookingId: $bookingId) {
            ok
            error
        }
    }
`;
// 디테일 가격설정 :: 방가격 삭제
export const DELETE_DAILY_PRICE = gql`
    mutation deleteDailyPrice($roomTypeId: ID!, $date: DateTime!) {
        DeleteDailyPrice(roomTypeId: $roomTypeId, date: $date) {
            ok
            error
        }
    }
`;
// 방타입 :: 방타입 제거
export const DELETE_ROOMTYPE = gql`
    mutation deleteRoomType($houseId: ID!, $roomTypeId: ID!) {
        DeleteRoomType(houseId: $houseId, roomTypeId: $roomTypeId) {
            ok
            error
        }
    }
`;
// 방 :: 방 제거
export const DELETE_ROOM = gql`
    mutation deleteRoom($roomId: ID!) {
        DeleteRoom(roomId: $roomId) {
            ok
            error
        }
    }
`;

// 방 :: 업데이트 방
export const UPDATE_ROOM = gql`
    mutation updateRoom($roomId: ID!, $name: String) {
        UpdateRoom(roomId: $roomId, name: $name) {
            ok
            error
        }
    }
`;
// 방타입 :: 방타입 업데이트
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
// 시즌 :: 시즌가격생성 (현재 사용안함)
export const CREATE_SEASON_PRICE = gql`
    mutation createSeasonPrice(
        $roomTypeId: ID!
        $seasonId: ID!
        $defaultPrice: Float!
        $dayOfWeekPriceList: [DayOfWeekPriceInput!]
    ) {
        CreateSeasonPrice(
            roomTypeId: $roomTypeId
            seasonId: $seasonId
            defaultPrice: $defaultPrice
            dayOfWeekPriceList: $dayOfWeekPriceList
        ) {
            ok
            error
        }
    }
`;

// 시즌 :: 시즌생성
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
            season {
                _id
            }
        }
    }
`;

// 시즌 :: 우선순위를 바꿈
export const CHANGE_PRIORITY = gql`
    mutation changePriority($seasonId: ID!, $houseId: ID!, $priority: Int!) {
        ChangePriority(
            seasonId: $seasonId
            houseId: $houseId
            priority: $priority
        ) {
            ok
            error
            season {
                _id
            }
        }
    }
`;

// 시즌 :: 시즌 삭제
export const DELETE_SEASON = gql`
    mutation deleteSeason($seasonId: ID!, $houseId: ID!) {
        DeleteSeason(seasonId: $seasonId, houseId: $houseId) {
            ok
            error
        }
    }
`;
// 시즌 :: 시즌 업데이트
export const UPDATE_SEASON = gql`
    mutation updateSeason(
        $name: String
        $start: DateTime
        $end: DateTime
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
// 유저 :: 프로필 업데이트
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
// 유저 :: 휴대폰인증 (유저용)
export const PHONE_VERIFICATION = gql`
    mutation startPhoneVerification {
        StartPhoneVerification {
            ok
            error
        }
    }
`;

//  유저 :: 휴대폰인증(발신자용)
export const START_PHONE_VERIFICATION_WITH_PHONE_NUMBER = gql`
    mutation startPhoneVerificationWithPhoneNumber($phoneNumber: PhoneNumber!) {
        StartSenderVerification(phoneNumber: $phoneNumber) {
            ok
            error
        }
    }
`;

// 유저 :: 휴대폰 인증 완료 키를 보냄
export const COMEPLETE_PHONE_VERIFICATION = gql`
    mutation completePhoneVerification($key: String!) {
        CompletePhoneVerification(key: $key) {
            ok
            error
        }
    }
`;
// 유저 :: 회원가입
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
// 하우스 :: 하우스 업데이트
export const UPDATE_HOUSE = gql`
    mutation updateHouse(
        $houseId: ID!
        $name: String
        $houseType: HouseType
        $location: LocationInput
        $refundPolicy: [TermsOfRefundInput!]
        $termsOfBooking: TermsOfBookingInput
        $hostMemo: String
    ) {
        UpdateHouse(
            houseId: $houseId
            name: $name
            houseType: $houseType
            location: $location
            refundPolicy: $refundPolicy
            termsOfBooking: $termsOfBooking
            hostMemo:$hostMemo
        ) {
            ok
            error
        }
    }
`;

// 숙소설정 업데이트
export const UPDATE_HOUSE_CONFIG = gql`
    mutation updateHouseConfig(
        $houseId: ID!
        $UpdateHouseConfigParams: UpdateHouseConfigParams
    ) {
        UpdateHouseConfig(
            houseId: $houseId
            params: $UpdateHouseConfigParams
        ) {
            ok
            error
        }
    }
`;

// 하우스 :: 하우스생성
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
// 하우스 :: 하우스삭제
export const DELETE_HOUSE = gql`
    mutation deleteHouse($id: String!) {
        DeleteHouse(_id: $id) {
            ok
            error
        }
    }
`;
// 상품관련 ────────────────────────────────────────────────────────────────────────────────
// 상품 :: 상품구매
export const BUY_PRODUCTS = gql`
    mutation buyProduct($houseId: ID!, $productTypeId: ID!, $appInfoRequest: AppInfoRequestInput!) {
        BuyProduct(houseId: $houseId, productTypeId: $productTypeId, appInfoRequest: $appInfoRequest) {
            ok
            error
        }
    }
`;
// 상품 :: 상품해지
export const REFUND_PRODUCT = gql`
    mutation refundProduct($houseId: ID!, $productId: ID!) {
        RefundProduct(houseId: $houseId, productId: $productId) {
            ok
            error
        }
    }
`;

/*  sms-------------------------------------------------------------------------- */
// SMS :: SMS 템플릿 생성
export const CREATE_SMS_TEMPLATE = gql`
    mutation createSmsTemplate($houseId: ID!, $params: SmsTemplateInput!) {
        CreateSmsTemplate(houseId: $houseId, params: $params) {
            ok
            error
            smsTemplate {
                ...FsmsTemplate
            }
        }
    }
    ${F_SMS_TEMPLATE}
`;
// SMS :: 템플릿 삭제
export const DELETE_SMS_TEMPLATE = gql`
    mutation deleteSmsTemplate($smsInfoId: ID!, $smsTemplateId: ID!) {
        DeleteSmsTemplate(
            smsInfoId: $smsInfoId
            smsTemplateId: $smsTemplateId
        ) {
            ok
            error
        }
    }
`;

// SMS :: SMS 정보 가져오기
export const GET_SMS_INFO = gql`
    query getSmsInfo($houseId: ID!) {
        GetSmsInfo(houseId: $houseId) {
            ok
            error
            smsInfo {
                _id
                sender {
                    ...FsmsSender
                }
                receivers
                smsTemplates {
                    ...FsmsTemplate
                }
            }
        }
    }
    ${F_SMS_SENDER}
    ${F_SMS_TEMPLATE}
`;

// SMS :: SMS 업데이트
export const UPDATE_SMS_TEMPLATE = gql`
    mutation updateSmsTemplate(
        $smsTemplateId: ID!
        $houseId: ID!
        $params: UpdateSmsTemplateInput!
    ) {
        UpdateSmsTemplate(
            smsTemplateId: $smsTemplateId
            houseId: $houseId
            params: $params
        ) {
            ok
            error
            smsTemplate {
                ...FsmsTemplate
            }
        }
    }
    ${F_SMS_TEMPLATE}
`;

// SMS :: SMS 전송
export const SEND_SMS = gql`
    mutation sendSms(
        $sender: PhoneNumber!
        $receivers: [PhoneNumber!]
        $msg: String!
        $smsInfoId: ID!
    ) {
        SendSms(smsInfoId: $smsInfoId, sender: $sender, receivers: $receivers, msg: $msg) {
            ok
            error
            result {
                resultCode
                message
                msgType
                msgId
                successCnt
                errorCnt
            }
        }
    }
`;

// 발신자 등록 (현재안쓰임)
export const UPDATE_PRODUCT_FOR_SU = gql`
    mutation updateProductForSU(
        $productId: ID!
        $params: UpdateProductParams!
    ) {
        UpdateProductForSU(productId: $productId, params: $params) {
            ok
            error
        }
    }
`;

// 발신자 등록 (현재안쓰임)
export const CONFIRM_BOOKING = gql`
    mutation confirmBooking(
        $bookingId: ID!
    ) {
        ConfirmBooking(
        bookingId: $bookingId
        ) {
            ok
            error
        }
    }
`;

// 발신자 등록 (현재안쓰임)
export const UPDATE_SENDER = gql`
    mutation updateSender($houseId: ID!, $sender: SmsSenderInput!) {
        UpdateSender(houseId: $houseId, sender: $sender) {
            ok
            error
            sender {
                ...FsmsSender
            }
            verified
        }
    }
    ${F_SMS_SENDER}
`;

export const GET_HOUSE_MENUAL = gql`
    query getHManual($houseId: ID!, $lang: Language!) {
            GetHManual(houseId:$houseId, lang: $lang) {
                ok
                error
                houseManual {
                    ...FHM
                    menus {
                        ...FHMM
                    }
                    house {
                        location {
                            address
                            addressDetail
                            lat
                            lng
                        }
                    }
                }
            }
        } 
    ${F_HMM}
    ${F_HM}
`

export const GET_HOUSE_MENUAL_FOR_PUBLIC = gql`
    query getHManualForPublic( $lang: Language!) {
            GetHManualForPublic(lang: $lang) {
                ok
                error
                houseManual {
                    ...FHM
                    menus {
                        ...FHMM
                    }
                    house {
                        location {
                            address
                            addressDetail
                            lat
                            lng
                        }
                    }
                }
            }
        } 
    ${F_HMM}
    ${F_HM}
`

export const UPDATE_HMANUAL = gql`
    mutation updateHManual($houseId: ID!, $lang: Language!, $updateParams: UpdateHManualParams!) {
        UpdateHManual(houseId: $houseId, lang: $lang, updateParams: $updateParams) {
            ok
            error
        }
    } 
`