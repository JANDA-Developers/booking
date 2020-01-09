import gql from "graphql-tag";

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
`;

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
`;

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
`;

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
      collectingInfoFromGuest {
        email
        country
      }
    }
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
`;

// 상품 관련 프레임
export const F_APP_INFO_REQUEST = gql`
  fragment FappInfoRequest on AppInfoRequest {
    url
    layoutType
    requestedDate
    isDone
    useHostApp
  }
`;

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
`;

export const F_BOOKING_TRANSACTION = gql`
  fragment FbookingTransaction on BookingTransaction {
    _id
    transactionId
    createdAt
    updatedAt
  }
`;
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
`;

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

export const F_BILLINFO = gql`
  fragment FbillInfo on BillInfo {
    ok
    billkey
    authDate
    cardCl
    cardName
  }
`;

export const F_BILL_PAY_RESULT = gql`
  fragment FbillpayResult on BillpayResult {
    ok
    msg
    tid
    authDate
    cardCl
    cardName
  }
`;


