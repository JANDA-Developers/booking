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

export const F_IMG = gql`
    fragment Fimg on JdFile {
        url
        filename
        mimeType
        tags {
            Key
            Value
        }
    }
`;

export const F_MEMO = gql`
    fragment Fmemo on Memo {
        _id
        title
        text
        memoType
        enableAlert
        createdAt
        updatedAt
    }
`;

export const F_NOTI = gql`
    fragment FNoti on Noti {
        _id
        msg
        validPeriod
        title
        notiType
        notiLevel
        createdAt
        isConfirm
        updatedAt
    }
`;

export const F_HOUSE = gql`
    fragment Fhouse on House {
        _id
        name
        houseType
        status
        publicKey
        createdAt
        updatedAt
    }
`


export const F_HM = gql`
    fragment FHM on HM {
        _id
        langList
        backgroundImg {
            ...Fimg
        }
        profileImg {
            ...Fimg
        }
        phoneNumber
        createdAt
        email
        updatedAt
        title
    }
    ${F_IMG}
`

// 하우스메뉴얼 메뉴
export const F_HMM = gql`
    fragment FHMmenu on HMmenu {
        id
        name
        type
        icon
        img {
          ...Fimg
        }
        content
        isEnable
    }
    ${F_IMG}
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
            },
            collectingInfoFromGuest {
                email
                country
            }
        },
        baseConfig {
                pricingTypes
        }
    }
`;

// 상품 관련 프레임
export const F_PRODUCT_TYPE = gql`
    fragment FproductType on ProductType {
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
    fragment Fproduct on Product {
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
        expireDate
        daysLeftToExpire
        isExpired
        canHaveHostApp
        existingHostApp
        description
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

// 모든 시즌에 관한 프레임
export const F_PAYMENT = gql`
    fragment Fpayment on Payment {
        type
        payMethod
        totalPrice
        status
        paymentResultParam
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
        img {
            ...Fimg
        }
        description
        defaultPrice
        createdAt
        updatedAt
        roomTemplateSrl
        roomGender
    }
    ${F_IMG}
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
        checkInInfo {
            isIn
            checkInDateTime
        }
        memo
        agreePrivacyPolicy
        checkIn
        checkOut
        payment {
            ...Fpayment
        }
        funnels
        status
        createdAt
        updatedAt
        isNew
        isConfirm
    }
    ${F_ROOMTYPE}
    ${F_PAYMENT}
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

export const F_BOOKING_TRANSACTION = gql`
    fragment FbookingTransaction on BookingTransaction {
        _id
        transactionId
        createdAt
        updatedAt
    }
`
export const F_BOOKING_TRANSACTION_PROGRESS = gql`
    fragment FbookingTransactionProgress on BookingTransactionProgress {
        startBooking {
            status
            updatedAt
        }
        payment {
            status
            updatedAt   
        }
        completeBooking {
            status
            updatedAt
        }
    }
`

// 게스트에 관한 정보 프레임(방정보 포함)
export const F_BLOCK = gql`
    fragment Fblock on Block {
        _id
        bedIndex
        checkIn
        checkOut
        createdAt
        updatedAt
    }
`;

// 게스트에 관한 정보 프레임(방정보 포함)
export const F_GUEST = gql`
    fragment Fguest on GuestGQLInterface {
        _id
        pricingType
        checkIn
        checkOut
    }
`;
export const F_GUEST_DOMITORY = gql`
    fragment FguestDomitory on GuestDomitory {
        _id
        gender
        bedIndex
        ...Fguest
    }
    ${F_GUEST}
`;
export const F_GUEST_ROOM = gql`
    fragment FguestRoom on GuestRoom {
        ...Fguest
    }
    ${F_GUEST}
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
        profileImg {
            ...Fimg
        }
        isPhoneVerified
        checkPrivacyPolicy
        userRole
        userRoles
        createdAt
        updatedAt
    }
    ${F_IMG}
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
            img {
                ...Fimg
            }
            rooms {
                _id
                name
                index
                createdAt
                updatedAt
            }
        }
    }
    ${F_IMG}
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
                status
                appInfo {
                    url
                }
                product {
                    ...Fproduct
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
                HM {
                    publicKey
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
                img {
                    ...Fimg
                }
                description
                defaultPrice
                createdAt
                updatedAt
            }
        }
    }
    ${F_IMG}
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
                ...FproductType
            }
        }
    }
    ${F_PRODUCT_TYPE}
`;


// 유저 :: 정보 가져오기
export const GET_USER_INFO = gql`
    query getMyProfile {
        GetMyProfile {
            user {
                ...FieldsUser
                houses {
                    # HM {
                    #     publicKey
                    # }
                    houseConfig {
                        ...FhouseConfig
                    }
                    smsInfo {
                        _id
                    }
                    roomTypes {
                        _id
                        roomCount
                    }
                    appInfo {
                        url
                    }
                    product {
                        ...Fproduct
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
                    completeDefaultSetting
                    houseType
                    publicKey
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
                    profileImg {
                        ...Fimg
                    }
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
    ${F_IMG}
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
                HM {
                    publicKey
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

// 방타입 :: 모든 방타입 가격 가져오기
export const PRICE_TIMELINE_GET_PRICE = gql`
  query dailyPriceGetPrice(
    $houseId: ID!
    $checkIn: DateTime!
    $checkOut: DateTime!
  ) {
    GetRoomTypeDatePrices(houseId:$houseId, checkIn: $checkIn, checkOut: $checkOut) {
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
    GetAllDailyPrice(houseId: $houseId, checkIn: $checkIn, checkOut: $checkOut) {
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


export const GET_CAPACITY_TO_ROOM_TYPE = gql`
    query getCapacityToRoomType(
        $roomTypeId: ID!
        $checkIn: DateTime!
        $checkOut: DateTime!
        $initValue: InitValueGetCapacityToRoomInput
    ) {
    GetCapacityToRoomType(roomTypeId:$roomTypeId, checkIn:$checkIn, checkOut:$checkOut, initValue: $initValue) {
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

export const GET_CAPACITY_TO_ROOM_TYPE_FOR_BOOKER = gql`
    query getCapacityToRoomTypeForBooker(
        $roomTypeId: ID!
        $checkIn: DateTime!
        $checkOut: DateTime!
        $initValue: InitValueGetCapacityToRoomInput
    ) {
    GetCapacityToRoomTypeForBooker(roomTypeId:$roomTypeId, checkIn: $checkIn, checkOut:$checkOut, initValue: $initValue) {
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
    query findBookingForBooker(
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
                payment {
                    ...Fpayment
                }
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
    ${F_PAYMENT}
    ${F_GUEST}
    ${F_BOOKING}
`;



export const F_ROOM_TYPE_DATE_PRICE_RESULT = gql`
    fragment FroomTypePriceResult on GetRoomTypeDatePricesResponse {
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
    ${F_ROOMTYPE}
`;

export const GET_ROOM_TYPE_DATE_PRICE = gql`
    query getRoomTypeDatePrices(
        $checkIn: DateTime!
        $checkOut: DateTime!
        $roomTypeIds: [ID!]
        $houseId: ID
    ) {
        GetRoomTypeDatePrices(checkIn: $checkIn, checkOut:$checkOut, roomTypeIds:$roomTypeIds, houseId: $houseId) {
            ...FroomTypePriceResult
        }
    }
    ${F_ROOM_TYPE_DATE_PRICE_RESULT}
`


// ⭐️방배정!!
// 방배정 :: 모든 방막기 + 모든 방타입 + 모든 게스트 가져오기!!
export const GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM = gql`
    query getAllRoomTypeWithGuest(
        $houseId: ID!
        $checkIn: DateTime!
        $checkOut: DateTime!
        $bookingStatuses: [BookingStatus]
    ) {
        GetAllRoomType(houseId: $houseId) {
            ok
            error
            roomTypes {
                ...FroomType
                rooms {
                    ...Froom
                }
            }
        }
        GetGuests(
            checkIn: $checkIn
            checkOut: $checkOut
            houseId: $houseId
            bookingStatuses: $bookingStatuses
        ) {
            ok
            error
            guests {
                ...on GuestDomitory {
                    ...FguestDomitory
                    room {
                        ...Froom
                    }
                    roomType {
                        _id
                    }
                    booking {
                        ...Fbooking
                    }
                    blockOption {
                        ...FblockOp
                    }
                }
                ...on GuestRoom {
                    ...FguestRoom
                    roomType {
                        _id
                    }
                    room {
                        ...Froom
                    }
                    booking {
                        ...Fbooking
                    }
                    blockOption {
                        ...FblockOp
                    }
                }
            }
        }

        GetBlocks(checkIn: $checkIn, checkOut: $checkOut, houseId: $houseId) {
            ok
            error
            blocks {
                ...Fblock
                room {
                    ...Froom
                }
            }
        }
    }
    ${F_ROOMTYPE}
    ${F_BLOCK}
    ${F_GUEST}
    ${F_GUEST_DOMITORY}
    ${F_GUEST_ROOM}
    ${F_ROOM}
    ${F_BLOCK_OP}
    ${F_BOOKING}
`;

// 방타입 :: 모든 방타입 가격 가져오기
export const GET_ALL_ROOMTYPES_PRICE = gql`
    query getAllRoomTypePrice(
        $houseId: ID!
        $checkIn: DateTime!
        $checkOut: DateTime!
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
        GetAllDailyPrice(houseId: $houseId, checkIn: $checkIn, checkOut: $checkOut) {
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
                        ...Fproduct
                        productType {
                            _id
                        }
                        appInfoRequested { 
                            ...FappInfoRequest
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

// BOOKING_FOR_PUBLIC 가져오기
export const GET_BOOKING_FOR_PUBLIC = gql`
    query getBookingForPublic(
        $transactionId: String
        $getBookingParam: GetBookingParams
        $skip: Boolean!
    ) {
        GetBookingForPublic(transactionId: $transactionId, getBookingParam:$getBookingParam) @skip(if: $skip) {
            ok
            error
            booking {
                ...Fbooking
                guests {
                    ...Fguest
                    roomType {
                        _id
                    }
                }
            }
        }
    }
${F_GUEST}
${F_BOOKING}
`


// 예약 ::모든 예약을 가져옴

export const GET_BOOKINGS_PHONE_NUMBERS = gql`
    query getPhoneNumbers(
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
                _id
                phoneNumber
            }
        }
    }`;



export const GET_CHECKINS = gql`
    query getCheckIns(
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
                checkInInfo {
            isIn
            checkInDateTime
            }
            }
        }
    }`

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
                    ... on GuestDomitory {
                        ...FguestDomitory
                        roomType {
                            _id
                            name
                        }
                    }
                    ... on GuestRoom {
                        ...FguestRoom
                        roomType {
                            _id
                        }
                    }
                }
                roomTypes {
                    _id
                    name
                    pricingType
                }
                createdAt
                updatedAt
            }
            pageInfo {
                ...FpageInfo
            }
        }
    }
    ${F_PAYMENT}
    ${F_GUEST}
    ${F_GUEST_DOMITORY}
    ${F_GUEST_ROOM}
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
                    ... on GuestDomitory {
                        ...FguestDomitory
                        roomType {
                            _id
                            name
                        }
                        room {
                            _id
                            name
                        }
                    }
                    ... on GuestRoom {
                        ...FguestRoom
                        roomType {
                            _id
                            name
                        }
                        room {
                            _id
                            name
                        }
                    }
                }
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
    ${F_GUEST_ROOM}
    ${F_GUEST_DOMITORY}
    ${F_GUEST}
    ${F_BOOKING}
`;



export const GET_SALES_STATISTIC = gql`
    query getSalesStatistic(
        $houseId: ID!
        $checkIn: DateTime!
        $checkOut: DateTime!
        $unit: SalesStatisticsUnit!
        $groupByPayMethod: Boolean
    ){ 
        GetSalesStatistic(houseId:$houseId, checkIn:$checkIn, checkOut:$checkOut, unit:$unit, groupByPayMethod: $groupByPayMethod) {
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
                payMethod
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
export const START_BOOKING_FOR_PUBLIC = gql`
    mutation startBookingForPublic(
        $bookerParams: StartBookingBookerInput!
        $checkInOut: CheckInOutInput!
        $guestDomitoryParams: [StartBookingDomitoryGuestInput!]
        $guestRoomParams: [StartBookingRoomGuestInput!]
        $paymentParams: StartBookingPaymentInput!
    ) {
        StartBookingForPublic(
            bookerParams: $bookerParams
            checkInOut: $checkInOut
            guestDomitoryParams: $guestDomitoryParams
            guestRoomParams: $guestRoomParams
            paymentParams: $paymentParams
        ) {
            ok
            error
            bookingTransaction {
              ...FbookingTransaction
            }
        }
    }
    ${F_BOOKING_TRANSACTION}
`;

export const START_BOOKING = gql`
    mutation startBooking(
        $houseId: ID!
        $bookerParams: StartBookingBookerInput!
        $checkInOut: CheckInOutInput!
        $guestDomitoryParams: [StartBookingDomitoryGuestInput!]
        $guestRoomParams: [StartBookingRoomGuestInput!]
        $paymentParams: StartBookingPaymentInput!
        $allocationParams: [AllocationInput!]
        $forceToAllocate: Boolean
    ) {
        StartBooking(
            houseId: $houseId
            bookerParams: $bookerParams
            checkInOut: $checkInOut
            guestDomitoryParams: $guestDomitoryParams
            guestRoomParams: $guestRoomParams
            paymentParams: $paymentParams
            allocationParams: $allocationParams
            forceToAllocate: $forceToAllocate
        ) {
            ok
            error
            bookingTransaction {
              ...FbookingTransaction
              booking {
                  _id
              }
            }
        }
    }
    ${F_BOOKING_TRANSACTION}
`;

// // 예약 :: 예약생성 (호스트용)
// export const START_BOOKING = gql`
//     mutation startBooking(
//         $bookingParams: CreateBookingParams!
//         $sendSmsFlag: Boolean!
//     ) {
//         CreateBooking(
//             bookingParams: $bookingParams
//             sendSmsFlag: $sendSmsFlag
//         ) {
//             ok
//             error
//             booking {
//                 ...Fbooking
//                 guests {
//                     ...Fguest
//                 }
//             }
//         }
//     }
//     ${F_BOOKING}
//     ${F_GUEST}
// `;

// 방배정 :: 게스트를 방에다 배정
export const ALLOCATE_GUEST_TO_ROOM = gql`
    mutation allocateGuestToRoom($guestId: ID!, $allocateInfo: AllocateInfoInput!, $options: AllocateOptions) {
        AllocateGuestToRoom(
            guestId: $guestId
            allocateInfo: $allocateInfo
            options: $options
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

export const GET_PAYMENT_AUTH = gql`
    query getPaymentAuth(
        $price: Float!
    ){
        GetPaymentAuth(
            price: $price
        ){
            ok
            error
            auth {
                merchantId
                mid
                hash
            }
            houseName
            date
        }
    }
`


// 방타입 :: 방타입 생성
export const CREATE_ROOMTYPE = gql`
    mutation createRoomType(
        $params: CreateRoomTypeInput!
    ) {
        CreateRoomType(
            params: $params
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
        $checkIn: DateTime!
        $checkOut: DateTime!
        $houseId: ID!
        $roomId: ID!
        $bedIndex: Int!
    ) {
        CreateBlock(
            checkIn: $checkIn
            checkOut: $checkOut
            houseId: $houseId
            roomId: $roomId
            bedIndex: $bedIndex
        ) {
            ok
            error
            block {
                ...Fblock
                room {
                    ...Froom
                }
            }
        }
    }
    ${F_ROOM}
    ${F_BLOCK}
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
        $params: UpdateRoomTypeInput!
    ) {
        UpdateRoomType(
            roomTypeId: $roomTypeId
            params: $params
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
        $profileImg: JdFileInput
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


export const START_PASSWORD_RESET = gql`
    mutation startPasswordReset($email: EmailAddress!, $phoneNumber: String!) {
        StartPasswordReset(email:$email, phoneNumber:$phoneNumber) {
            ok
            error
        }
    }
`;

export const COMPLETE_PASSWORD_RESET = gql`
    mutation completePasswordReset(
        $email: EmailAddress!
        $phoneNumber: PhoneNumber!
        $key: String!
    ) {
        CompletePasswordReset(email:$email, phoneNumber:$phoneNumber, key:$key) {
            ok
            error
            newPassword
        }
    }
`

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
        $completeDefaultSetting: Boolean
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
            completeDefaultSetting: $completeDefaultSetting
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
        $receivers: [PhoneNumber!]
        $msg: String!
        $smsInfoId: ID!
        $bookingIds: [ID!]
    ) {
        SendSms(bookingIds:$bookingIds, smsInfoId: $smsInfoId, receivers: $receivers, msg: $msg) {
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

export const UPDATE_USER_FOR_SU = gql`
    mutation updateUserForSU(
        $productId: ID!
        $productParams: UpdateProductParams!
        $houseId: ID!
        $status: HouseStatus!
    ) {
        UpdateProductForSU(productId: $productId, params: $productParams) {
            ok
            error
        }
        UpdateHouse(houseId: $houseId, status: $status) {
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


// 게스트용
export const GET_HOUSE_MENUAL = gql`
    query getHM($houseId: ID!) {
            GetHM(houseId:$houseId) {
                ok
                error
                HM {
                    ...FHM
                    menus {
                        ...FHMmenu
                    }
                    location {
                        address
                        addressDetail
                        lat
                        lng
                    }
                }
            }
        } 
    ${F_IMG}
    ${F_HMM}
    ${F_HM}
`

// // 호스트용
// export const GET_HOUSE_MENUAL_CONFIG = gql`
//     query getHM($houseId: ID!) {
//             GetHM(houseId:$houseId) {
//                 ok
//                 error
//                 HM {
//                     ...FHM
//                     menus {
//                         ...FHMmenu
//                     }
//                     location {
//                         address
//                         addressDetail
//                         lat
//                         lng
//                     }
//                 }
//             }
//         } 
//     ${F_HMM}
//     ${F_HM}
// `

export const GET_HOUSE_MENUAL_FOR_PUBLIC = gql`
    query getHMforPublic {
            GetHMforPublic {
                ok
                error
                HM {
                    ...FHM
                    menus {
                        ...FHMmenu
                    }
                    location {
                        address
                        addressDetail
                        lat
                        lng
                    }
                }
            }
        } 
    ${F_HMM}
    ${F_HM}
`

export const UPDATE_HM = gql`
    mutation updateHM($houseId: ID!, $updateParams: UpdateHMparams!) {
        UpdateHM(houseId: $houseId, updateParams: $updateParams) {
            ok
            error
        }
    } 
`
// MEMO 가져오기
export const GET_MEMO = gql`
    query getMemos($houseId: ID!, $memoType: MemoType) {
        GetMemos(houseId: $houseId, memoType: $memoType) {
            ok
            error
            memos {
                ...Fmemo
            }
        }
    }
${F_MEMO}
`

export const UPDATE_MEMO = gql`
    mutation updateMemo($memoId: ID!, $updateMemoParams: UpdateMemoParams!) {
        UpdateMemo(memoId: $memoId, updateMemoParams: $updateMemoParams) {
            ok
            error
        }
    } 
`

export const CREATE_MEMO = gql`
    mutation createMemo($houseId: ID!, $createMemoParams: CreateMemoParams!) {
        CreateMemo(houseId: $houseId, createMemoParams: $createMemoParams) {
            ok
            error
        }
    } 
`

export const DELETE_MEMO = gql`
    mutation deleteMemo($memoId: ID!) {
        DeleteMemo(memoId: $memoId) {
            ok
            error
        }
    } 
`
// MEMO 가져오기
export const GET_NOTI = gql`
    query getNotis($houseId: ID!, $count: Int!) {
        GetNotis(houseId: $houseId count: $count) {
            ok
            error
            notis {
                ...FNoti
            }
        }
    }
${F_NOTI}
`

export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    SingleUpload(file: $file) {
      ok
      error
      jdFile {
          ...Fimg
      }
    }
  }
  ${F_IMG}
`;


export const CHANGE_PASSWORD = gql`
    mutation changePassword(
        $currentPassword: Password!,
        $newPassword: Password!,
        $newPasswordRepeat: Password!
    ) {
        ChangePassword(currentPassword: $currentPassword, newPassword: $newPassword, newPasswordRepeat: $newPasswordRepeat){
            ok
            error
        }
    }
`

export const FIND_MY_EMAIL = gql`
    mutation findMyEmail($phoneNumber:String!) {
        FindMyEmail(phoneNumber: $phoneNumber){
            ok
            error
        }
    }
`

export const CONFIRM_NOTI = gql`
    mutation confirmNoti($houseId: ID!, $notiIds: [ID!]!) {
        ConfirmNoti(houseId: $houseId, notiIds:$notiIds) {
            ok
            error
        }
    } 
`

export const CREATE_NOTI = gql`
    mutation createNoti($houseIds: [ID]!, $createNotiParams: CreateNotiParams!) {
        CreateNoti(houseIds: $houseIds, createNotiParams: $createNotiParams) {
            ok
            error
        }
    } 
`

