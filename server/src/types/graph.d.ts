export const typeDefs = ["type CreateBookerResponse {\n  ok: Boolean!\n  error: String\n  booker: Booker\n}\n\ntype Mutation {\n  CreateBooker(houseId: ID!, name: Name!, password: Password!, phoneNumber: PhoneNumber!, email: EmailAddress, agreePrivacyPolicy: Boolean!): CreateBookerResponse!\n  DeleteBooker(bookerId: ID!): DeleteBookerResponse!\n  CreateBooking(bookingParams: BookingInput!): CreateBookingResponse!\n  DeleteBooking(bookerId: ID!, bookingId: ID!): DeleteBookingResponse!\n  UpdateBooking(bookingId: ID!, bookingStatus: BookingStatus, start: DateTime, end: DateTime, price: Float): UpdateBookingResponse!\n  AllocateGuestToRoom(roomId: ID!, guestId: ID!): AllocateGuestToRoomResponse!\n  CreateGuest(houseId: ID!, bookerId: ID!, roomTypeId: ID!, roomId: ID, start: DateTime!, end: DateTime!, gender: Gender!, pricingType: PricingType!): CreateGuestResponse!\n  # 게스트 생성\n  CreateGuests(houseId: ID!, bookerId: ID!, roomTypeId: ID!, roomIds: [ID!], start: DateTime!, end: DateTime!, pricingType: PricingType!): CreateGuestsResponse!\n  ToggleIsTempAllocated(guestId: ID!, isTempAllocation: Boolean!): ToggleIsTempAllocatedResponse!\n  CreateHostApplication(houseId: ID!, applicationType: ApplicationType, url: URL, description: String): CreateHostApplicationResponse!\n  CreateIntergration(houseId: ID!): CreateIntergrationResponse!\n  UpdateHouseToHostApp(name: String, houseType: HouseType, location: LocationInput, refundPolicy: [TermsOfRefundInput!], termsOfBooking: TermsOfBookingInput): UpdateHouseToHostAppResponse!\n  # 로그인 token 필요함!\n  CreateRoomTypeToHostApp(name: String!, roomTemplateSrl: Int!, pricingType: PricingType!, peopleCount: Int!, peopleCountMax: Int, description: String, roomGender: RoomGender, img: URL, tags: [TagInput!]): CreateRoomTypeToHostAppResponse!\n  UpdateRoomTypeToHostApp(roomTemplateSrl: Int!, name: String, peopleCount: Int, peopleCountMax: Int, img: String, roomGender: Int, description: String): UpdateRoomTypeToHostAppResponse!\n  ChangePriorityToHostApp(seasonId: ID!, houseId: ID!, priority: Int!): ChangePriorityToHostAppResponse!\n  CreateSeasonToHostApp(name: String!, start: DateTime!, end: DateTime!, color: String, description: String): CreateSeasonToHostAppResponse!\n  UpdateSeasonToHostApp(seasonId: ID!, name: String, start: DateTime, end: DateTime, color: String, description: String): UpdateSeasonToHostAppResponse!\n  CreateSeasonPriceToHostApp(roomTypeId: ID!, seasonId: ID!, price: Float!, applyDays: Int): CreateSeasonPriceToHostAppResponse!\n  UpdateSeasonPriceToHostApp(seasonPriceId: ID!, price: Float, applyDays: Int!): UpdateSeasonPriceToHostAppResponse!\n  CreateHouse(name: String!, houseType: HouseType!, location: LocationInput!): CreateHouseResponse!\n  DeleteHouse(_id: String!): DeleteHouseResponse!\n  UpdateHouse(houseId: ID!, name: String, houseType: HouseType, location: LocationInput, refundPolicy: [TermsOfRefundInput!], termsOfBooking: TermsOfBookingInput): UpdateHouseResponse!\n  CreateProduct(name: String!, price: Int, discountedPrice: Int, roomCount: Int, roomCountExtraCharge: Int, bookingCount: Int, bookingCountExtraCharge: Int, description: String, canHaveHostApp: Boolean): CreateProductResponse!\n  BuyProduct(houseId: ID!, productTypeId: ID!): BuyProductResponse!\n  CreateProductType(name: String!, price: Int!, roomCount: Int, roomCountExtraCharge: Int, bookingCount: Int, bookingCountExtraCharge: Int, description: String, canHaveHostApp: Boolean): CreateProductTypeResponse!\n  DeleteProductType(productTypeId: ID!): DeleteProductTypeResponse!\n  RefundProduct(houseId: ID!, productId: ID!): RefundProductResponse!\n  UpdateProductType(productTypeId: ID!, name: String!, price: Int!, roomCount: Int!, roomCountExtraCharge: Int!, bookingCount: Int!, bookingCountExtraCharge: Int!, description: String): UpdateProductTypeResponse!\n  # 만약 RoomTypeId로 조회한 방타입이 해당 날짜에 RoomPrice가 존재한다면 가격 덮어 씌움\n  CreateRoomPrice(price: Float!, roomTypeId: ID!, houseId: ID!, date: DateTime!): CreateRoomPriceResponse!\n  CreateSeasonPrice(roomTypeId: ID!, seasonId: ID!, defaultPrice: Float!, dayOfWeekPrices: [DayOfWeekPriceInput!]): CreateSeasonPriceResponse!\n  CreateSeasonPrices(seasonId: ID!, seasonPrices: [SeasonPriceInput!]): CreateSeasonPricesResponse!\n  DeleteRoomPrice(date: DateTime!, roomTypeId: ID!): DeleteRoomPriceResponse!\n  UpdateSeasonPrice(seasonPriceId: ID!, price: Float, applyDays: Int!): UpdateSeasonPriceResponse!\n  CreateRoom(name: String!, roomType: ID!): CreateRoomResponse!\n  # 로그인 token 필요함!\n  CreateRoomType(name: String!, houseId: ID!, pricingType: PricingType!, roomGender: RoomGender, img: URL, peopleCount: Int!, peopleCountMax: Int, defaultPrice: Float, description: String, tags: [TagInput!]): CreateRoomTypeResponse!\n  DeleteRoom(roomId: ID!): DeleteRoomResponse!\n  DeleteRoomType(roomTypeId: ID!, houseId: ID!): DeleteRoomTypeResponse!\n  TestFunction(roomTypeId: ID!, start: DateTime!, end: DateTime!, gender: Gender!, paddingOtherGenderCount: Int!): TestFunctionResponse!\n  UpdateRoom(roomId: ID!, name: String): UpdateRoomResponse!\n  ChangeIndex(roomTypeId: ID!, houseId: ID!, index: Int!): ChangeIndexResponse!\n  UpdateRoomType(roomTypeId: ID!, houseId: ID!, name: String, peopleCount: Int, peopleCountMax: Int, img: URL, description: String): UpdateRoomTypeResponse!\n  ChangePriority(seasonId: ID!, houseId: ID!, priority: Int!): ChangePriorityResponse!\n  CreateSeason(name: String!, start: DateTime!, end: DateTime!, houseId: ID!, color: String, description: String, seasonPrices: [SeasonPriceInput!]): CreateSeasonResponse!\n  DeleteSeason(seasonId: ID!, houseId: ID!): DeleteSeasonResponse!\n  UpdateSeason(seasonId: ID!, name: String, start: DateTime, end: DateTime, color: String, description: String, seasonPrices: [SeasonPriceInput!]): UpdateSeasonResponse!\n  CompletePhoneVerification(key: String!): CompletePhoneVerificationResponse!\n  EmailSignUp(name: Name!, email: EmailAddress!, password: Password!, phoneNumber: PhoneNumber!): EmailSignUpResponse!\n  GmailConnect(firstName: String!, lastName: String!, gmail: String!): GmailConnectionResponse!\n  StartPhoneVerification: StartPhoneVerificationResponse!\n  UpdateMyProfile(name: Name!, password: Password!, profileImg: URL, phoneNumber: PhoneNumber, email: EmailAddress): UpdateMyProfileResponse!\n  ChangePassword(currentPassword: Password!, newPassword: Password!, newPasswordRepeat: Password!): ChangePasswordResponse!\n}\n\ntype DeleteBookerResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetBookerResponse {\n  ok: Boolean!\n  error: String\n  booker: Booker\n}\n\ntype Query {\n  GetBooker(bookerId: ID!): GetBookerResponse!\n  GetBookers(houseId: ID!, page: Int!, count: Int!): GetBookersResponse!\n  GetBookings(page: Int!, count: Int!, houseId: ID!): GetBookingsResponse!\n  GetGuests(start: DateTime!, end: DateTime!, houseId: ID!): GetGuestsResponse!\n  IsAbleToAllocate(guestId: ID!, roomId: ID!): IsAbleToAllocateResponse!\n  GetAllHouseToHostApp(email: EmailAddress!, password: Password!): GetAllHouseToHostAppResponse!\n  GetHouse(houseId: ID!): GetHouseResponse!\n  # 슈퍼계정으로 모든 집들을 가져옴.\n  GetHousesForSU(page: Int!, count: Int!): GetHousesForSUResponse!\n  GetAllProducts: GetAllProductsResponse!\n  GetAllProductTypes: GetAllProductTypesResponse!\n  GetAllRoomPrice(houseId: ID!, start: DateTime!, end: DateTime!): GetAllRoomPriceResponse!\n  GetAppliedPriceWithDateRange(roomTypeId: ID!, start: DateTime!, end: DateTime!): GetAppliedPriceWithDateRangeResponse!\n  GetRoomPrice(roomTypeId: ID!, start: DateTime!, end: DateTime!): GetRoomPriceResponse!\n  # houseId에 해당하는 전체 방 타입 시즌 가격 가져오기\n  GetSeasonPrice(houseId: ID!): GetSeasonPriceResponse!\n  CheckRoomAbleToAllocate(roomId: ID!, start: DateTime!, end: DateTime!): CheckRoomAbleToAllocateResponse!\n  GetallocatedRoomList(houseId: ID!, start: DateTime!, end: DateTime!): GetallocatedRoomListResponse!\n  GetAllRoomType(houseId: ID!): GetAllRoomTypeResponse!\n  GetAvailableGuestCount(roomTypeId: ID!, start: DateTime!, end: DateTime!, gender: Gender!, paddingOtherGenderCount: Int!): GetAvailableGuestCountResponse!\n  GetRoomGuestsCapacity(roomId: ID!, start: DateTime!, end: DateTime!): GetRoomGuestsCapacityResponse!\n  GetRoomTypeById(roomTypeId: ID!): GetRoomTypeByIdResponse!\n  GetRoomTypeGuestCapacity(roomTypeId: ID!, start: DateTime, end: DateTime): GetRoomTypeGuestCapacityResponse!\n  GetAllSeason(houseId: ID!): GetAllSeasonResponse!\n  GetSeasonWithDate(houseId: ID!, date: DateTime!): GetSeasonWithDateResponse!\n  # DateRange안에 해당하는 Season을 구함\n  GetSeasonWithDateRange(houseId: ID!, start: DateTime!, end: DateTime!): GetSeasonWithDateRangeResponse!\n  EmailSignIn(email: EmailAddress!, password: Password!): EmailSignInResponse!\n  # 로그인 token 필요!\n  GetMyProfile: GetMyProfileResponse!\n  GetUserForSU(userId: ID!): GetUserForSUResponse!\n}\n\ntype GetBookersResponse {\n  ok: Boolean!\n  error: String\n  bookers: [Booker!]\n  pageInfo: PageInfoOffsetBase\n}\n\ntype Booker {\n  _id: ID!\n  house: House!\n  bookings: [Booking!]\n  name: Name!\n  password: String\n  phoneNumber: PhoneNumber!\n  email: EmailAddress\n  agreePrivacyPolicy: Boolean!\n  isCheckIn: DateTime\n  memo: String\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ninput BookerInput {\n  house: ID!\n  booking: ID\n  name: Name!\n  password: String!\n  phoneNumber: PhoneNumber!\n  email: EmailAddress\n  agreePrivacyPolicy: Boolean!\n  memo: String\n}\n\ntype CreateBookingResponse {\n  ok: Boolean!\n  error: String\n  # 리턴타입 검토중.\n  bookings: [Booking!]\n}\n\ntype DeleteBookingResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetBookingsResponse {\n  ok: Boolean!\n  error: String\n  bookings: [Booking!]\n  pageInfo: PageInfoOffsetBase\n}\n\ntype Booking {\n  _id: ID!\n  # 예약 ID\n  bookingId: String!\n  house: House!\n  roomType: RoomType!\n  booker: Booker!\n  guests: [Guest!]\n  guestCount: Int!\n  # 가격\n  price: Float!\n  # 시작 날짜\n  start: DateTime!\n  # 끝 날짜\n  end: DateTime!\n  discountedPrice: Float!\n  bookingStatus: BookingStatus!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum BookingStatus {\n  # 예약 완료\n  COMPLETE\n  # 예약 취소\n  CANCEL\n}\n\ninput BookingInput {\n  booker: BookerInput!\n  start: DateTime!\n  end: DateTime!\n  guestInputs: [GuestPartInput!]!\n}\n\ninput GuestPartInput {\n  roomTypeId: ID!\n  price: Float!\n  discountedPrice: Float\n  pricingType: PricingType!\n  countFemaleGuest: Int!\n  countMaleGuest: Int!\n  countRoom: Int!\n}\n\ninput BookingSortInput {\n  key: BookingSortKeyEnum!\n  order: Int!\n}\n\ninput BookingFilter {\n  roomTypeId: ID!\n  booker: ID!\n}\n\nenum BookingSortKeyEnum {\n  _id\n  updatedAt\n  createdAt\n}\n\ntype UpdateBookingResponse {\n  ok: Boolean!\n  error: String\n  bookings: [Booking!]\n}\n\nscalar DateTime\n\nscalar EmailAddress\n\nscalar Name\n\nscalar Password\n\nscalar PhoneNumber\n\nscalar URL\n\n# DB에 저장할 떄는 0101010의 형태로 저장하도록 Resolver에서 처리한다.\nenum Day {\n  SUN\n  MON\n  TUE\n  WED\n  THU\n  FRI\n  SAT\n}\n\ntype Tag {\n  name: String!\n  content: String!\n  icon: String!\n}\n\ninput TagInput {\n  name: String!\n  content: String!\n  icon: String\n}\n\n# 이하 프론트에서 필요한 input 요청\ninput SelectOption {\n  value: String!\n  label: String!\n}\n\ntype PageInfo {\n  startCursor: String\n  endCursor: String\n  hasPreviousPage: Boolean!\n  hasNextPage: Boolean!\n}\n\ntype PageInfoOffsetBase {\n  currentPage: Int!\n  totalPage: Int!\n  rowCount: Int!\n}\n\nenum DateRangeStatus {\n  PAST\n  PRESENT\n  FUTURE\n}\n\ntype DateRange {\n  hashCode: Int!\n  startDate: DateTime\n  endDate: DateTime\n}\n\ninput DateRangeInput {\n  startDate: DateTime\n  endDate: DateTime\n}\n\ntype DisableRange {\n  hashCode: Int!\n  startDate: DateTime\n  endDate: DateTime\n  description: String\n}\n\ninput DisableRangeInput {\n  startDate: DateTime\n  endDate: DateTime\n  description: String\n}\n\ntype Location {\n  address: String!\n  addressDetail: String\n  lat: Float!\n  lng: Float!\n}\n\ninput LocationInput {\n  address: String!\n  addressDetail: String\n  lat: Float!\n  lng: Float!\n}\n\ntype AllocateGuestToRoomResponse {\n  ok: Boolean!\n  error: String\n  guest: Guest\n}\n\ntype CreateGuestResponse {\n  ok: Boolean!\n  error: String\n  guest: Guest\n}\n\ntype CreateGuestsResponse {\n  ok: Boolean!\n  error: String\n  guests: [Guest!]\n}\n\ntype GetGuestsResponse {\n  ok: Boolean!\n  error: String\n  guests: [Guest!]\n}\n\ntype IsAbleToAllocateResponse {\n  ok: Boolean!\n  error: String\n  guest: Guest\n}\n\ntype Guest {\n  _id: ID!\n  # roomType,\n  guestId: String!\n  house: House!\n  # roomType 은 처음 예약하고나서 절대로 변경되지 않음.\n  roomType: RoomType\n  # 현재 묵는 방으로 변경될수 있음.\n  allocatedRoom: Room\n  booking: Booking\n  name: Name\n  start: DateTime!\n  end: DateTime!\n  # 도미토리, 룸, 블록 구분\n  pricingType: PricingType!\n  isTempAllocation: Boolean!\n  bedIndex: Int!\n  gender: Gender\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\n# 도미토리 방식으로 예약한 게스트만 적용됨\nenum Gender {\n  # 도미토리 남\n  MALE\n  # 도미토리 여\n  FEMALE\n}\n\ninput GuestInput {\n  houseId: ID!\n  bookerId: ID!\n  roomTypeId: ID!\n  roomId: ID\n  bookingId: ID!\n  start: DateTime!\n  end: DateTime!\n  pricingType: PricingType!\n  gender: Gender\n}\n\ninput GuestsInput {\n  houseId: ID!\n  bookerId: ID!\n  bookingId: ID\n  roomTypeId: ID!\n  start: DateTime!\n  end: DateTime!\n  pricingType: [PricingType!]!\n  gender: [Gender!]\n  roomId: [ID!]\n}\n\ntype ToggleIsTempAllocatedResponse {\n  ok: Boolean!\n  error: String\n  guest: Guest\n}\n\ntype CreateHostApplicationResponse {\n  ok: Boolean!\n  error: String\n  hostApp: HostApplication\n}\n\ntype CreateIntergrationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetAllHouseToHostAppResponse {\n  ok: Boolean!\n  error: String\n  houses: [House!]\n}\n\ntype UpdateHouseToHostAppResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype CreateRoomTypeToHostAppResponse {\n  ok: Boolean!\n  error: String\n  roomType: RoomType\n}\n\ntype UpdateRoomTypeToHostAppResponse {\n  ok: Boolean!\n  error: String\n  roomType: RoomType\n}\n\ntype ChangePriorityToHostAppResponse {\n  ok: Boolean!\n  error: String\n  season: Season\n}\n\ntype CreateSeasonToHostAppResponse {\n  ok: Boolean!\n  error: String\n  season: Season\n}\n\ntype UpdateSeasonToHostAppResponse {\n  ok: Boolean\n  error: String\n  season: Season\n}\n\ntype CreateSeasonPriceToHostAppResponse {\n  ok: Boolean!\n  error: String\n  seasonPrice: SeasonPrice\n}\n\ntype UpdateSeasonPriceToHostAppResponse {\n  ok: Boolean!\n  error: String\n  seasonPrice: SeasonPrice\n}\n\ntype HostApplication {\n  _id: ID!\n  applicationType: ApplicationType!\n  house: House!\n  user: User!\n  url: URL!\n  description: String\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum ApplicationType {\n  BOOKING_WEB\n}\n\ntype CreateHouseResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype DeleteHouseResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetHouseResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype GetHousesForSUResponse {\n  ok: Boolean!\n  error: String\n  houses: [House!]\n  pageInfo: PageInfoOffsetBase\n}\n\ntype House {\n  _id: ID!\n  name: String!\n  houseType: HouseType!\n  product: Product\n  hostApplication: HostApplication\n  hostAppCreated: Boolean!\n  user: User!\n  location: Location!\n  refundPolicy: [TermsOfRefund!]!\n  termsOfBooking: TermsOfBooking!\n  roomTypes: [RoomType!]\n  # Legarcy 연동을 위한 module_srl...\n  module_srl: Int\n  createdAt: DateTime!\n  updatedAt: DateTime\n  # Legarcy\n  moduleSrl: Int\n}\n\nenum HouseType {\n  GUEST_HOUSE\n  HOSTEL\n  HOTEL\n  MOTEL\n  PENSION\n  YOUTH_HOSTEL\n}\n\n# 예약 가능한 조건.\ntype TermsOfBooking {\n  # 선택 가능한 가장 멀리있는 날짜(today 를 기준으로 ~일 뒤)\n  farthestSelectableDate: Int!\n  # 선택 가능한 가장 가까히 있는 날짜(today 를 기준으로 ~일 뒤)\n  nearestSelectableDate: Int!\n  # 선택 가능 날짜 범위\n  selectableDateRange: Int!\n}\n\ntype TermsOfRefund {\n  # 환불 가능 기간: 숙박일로부터 ~일 전\n  beforeDays: Int!\n  rate: Float!\n  description: String\n}\n\ninput TermsOfRefundInput {\n  beforeDays: Int!\n  rate: Float!\n  description: String\n}\n\ninput TermsOfBookingInput {\n  # 선택 가능한 가장 멀리있는 날짜(today 를 기준으로 ~일 뒤)\n  farthestSelectableDate: Int!\n  # 선택 가능한 가장 가까히 있는 날짜(today 를 기준으로 ~일 뒤)\n  nearestSelectableDate: Int!\n  # 선택 가능 날짜 범위\n  selectableDateRange: Int!\n}\n\ninput HouseSortInput {\n  key: HouseSortKeyEnum!\n  order: Int!\n}\n\ninput HouseFilter {\n  houseType: HouseType\n}\n\nenum HouseSortKeyEnum {\n  _id\n  updatedAt\n  createdAt\n}\n\ntype UpdateHouseResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype CreateProductResponse {\n  ok: Boolean!\n  error: String\n  product: Product\n}\n\ntype GetAllProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product!]\n}\n\ntype Product {\n  _id: ID!\n  # 제품 이름\n  name: String!\n  # 제품 가격(월)\n  price: Int\n  # 할인된 가격\n  discountedPrice: Int\n  # 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한\n  roomCount: Int\n  # 방 수 추가시 추가 가격  => default: 0\n  roomCountExtraCharge: Int\n  # 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한\n  bookingCount: Int\n  # 예약 초과시 부과되는 금액 => defualt: 0\n  bookingCountExtraCharge: Int\n  # 상세 설명\n  house: House!\n  productType: ProductType!\n  canHaveHostApp: Boolean!\n  description: String\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype BuyProductResponse {\n  ok: Boolean!\n  error: String\n  product: Product\n}\n\ntype CreateProductTypeResponse {\n  ok: Boolean!\n  error: String\n  productType: ProductType\n}\n\ntype DeleteProductTypeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllProductTypesResponse {\n  ok: Boolean!\n  error: String\n  productTypes: [ProductType!]\n}\n\ntype RefundProductResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype ProductType {\n  _id: ID!\n  # 제품 이름\n  name: String!\n  # 제품 가격(월)\n  price: Int!\n  # 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한\n  roomCount: Int!\n  # 방 수 추가시 추가 가격  => default: 0\n  roomCountExtraCharge: Int!\n  # 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한\n  bookingCount: Int!\n  # 예약 초과시 부과되는 금액 => defualt: 0\n  bookingCountExtraCharge: Int!\n  # 상세 설명\n  description: String\n  canHaveHostApp: Boolean!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype UpdateProductTypeResponse {\n  ok: Boolean!\n  error: String\n  productType: ProductType\n}\n\ntype CreateRoomPriceResponse {\n  ok: Boolean!\n  error: String\n  roomPrice: RoomPrice\n}\n\ntype CreateSeasonPriceResponse {\n  ok: Boolean!\n  error: String\n  seasonPrice: SeasonPrice\n}\n\ntype CreateSeasonPricesResponse {\n  ok: Boolean!\n  error: String\n  seasonPrices: [SeasonPrice!]\n}\n\ninput SeasonPriceInput {\n  roomTypeId: ID!\n  defaultPrice: Float!\n  dayOfWeekPrices: [DayOfWeekPriceInput!]\n}\n\ntype DeleteRoomPriceResponse {\n  ok: Boolean!\n  error: String\n  roomPrice: RoomPrice\n}\n\ntype GetAllRoomPriceResponse {\n  ok: Boolean!\n  error: String\n  roomPrices: [RoomPrice!]\n}\n\ntype GetAppliedPriceWithDateRangeResponse {\n  ok: Boolean!\n  error: String\n  seasonPrices: [SeasonPrice!]\n}\n\ntype GetRoomPriceResponse {\n  ok: Boolean!\n  error: String\n  roomPrices: [RoomPrice!]\n}\n\ntype GetSeasonPriceResponse {\n  ok: Boolean!\n  error: String\n  seasonPrices: [SeasonPrice!]\n}\n\ntype RoomPrice {\n  _id: ID!\n  roomType: RoomType!\n  house: House!\n  price: Float!\n  date: DateTime!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype SeasonPrice {\n  _id: ID!\n  roomType: RoomType!\n  season: Season!\n  defaultPrice: Float!\n  dayOfWeekPrices: [DayOfWeekPrice!]\n}\n\ntype DayOfWeekPrice {\n  price: Float!\n  applyDays: Int!\n}\n\ninput DayOfWeekPriceInput {\n  price: Float!\n  applyDays: Int!\n}\n\ntype UpdateSeasonPriceResponse {\n  ok: Boolean!\n  error: String\n  seasonPrice: SeasonPrice\n}\n\ntype CheckRoomAbleToAllocateResponse {\n  ok: Boolean!\n  error: String\n  roomStatusList: [RoomStatus!]\n}\n\n# 방 상태 객체 => 어떤 날짜에 어떤 방에 어떤 사람이 배정되어 있는지\ntype RoomStatus {\n  room: Room!\n  date: DateTime!\n  maxAllocating: Int!\n  guests: [Guest!]\n}\n\ntype CreateRoomResponse {\n  ok: Boolean\n  error: String\n  room: Room\n}\n\ntype CreateRoomTypeResponse {\n  ok: Boolean!\n  error: String\n  roomType: RoomType\n}\n\ntype DeleteRoomResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteRoomTypeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetallocatedRoomListResponse {\n  ok: Boolean!\n  error: String\n  allocatedRoomList: [AllocatedRoom!]\n}\n\ntype AllocatedRoom {\n  room: Room!\n  date: DateTime!\n  guests: [Guest!]\n}\n\ntype GetAllRoomTypeResponse {\n  ok: Boolean\n  error: String\n  roomTypes: [RoomType!]\n}\n\ntype GetAvailableGuestCountResponse {\n  ok: Boolean!\n  error: String\n  roomCapacity: RoomCapacity\n}\n\ntype GetRoomGuestsCapacityResponse {\n  ok: Boolean!\n  error: String\n  capacity: RoomCapacity\n}\n\ntype GetRoomTypeByIdResponse {\n  ok: Boolean!\n  error: String\n  roomType: RoomType\n}\n\ntype GetRoomTypeGuestCapacityResponse {\n  ok: Boolean!\n  error: String\n  roomTypeCapacity: RoomTypeCapacity\n}\n\ntype RoomTypeCapacity {\n  start: DateTime!\n  end: DateTime!\n  roomGender: RoomGender!\n  male: Int!\n  female: Int!\n  mixed: Int!\n}\n\ntype Room {\n  _id: ID!\n  name: String!\n  roomType: RoomType!\n  pricingType: PricingType!\n  peopleCount: Int!\n  peopleCountMax: Int!\n  index: Int!\n  createdAt: DateTime!\n  updatedAt: DateTime\n  # Legarcy\n  roomSrl: Int\n}\n\ntype RoomCapacity {\n  roomId: ID!\n  roomGender: RoomGender!\n  # guestGender === null 이면 배정된 게스트 없는거...\n  guestGender: GuestGender\n  availableCount: Int!\n}\n\ntype RoomCapacityWithEmptyBed {\n  roomId: ID!\n  roomGender: RoomGender!\n  guestGender: GuestGender\n  availableCount: Int!\n  emptyBeds: [Int!]!\n}\n\nenum GuestGender {\n  MALE\n  FEMALE\n  MIXED\n}\n\n# roomTyoe...\ntype RoomType {\n  _id: ID!\n  name: String!\n  house: House!\n  pricingType: PricingType!\n  peopleCount: Int!\n  peopleCountMax: Int!\n  index: Int!\n  roomCount: Int!\n  roomGender: RoomGender!\n  img: URL\n  description: String\n  # 일괄적으로 적용되는 기본 방 가격... RoomPrice, SeasonPrice가 없는 경우 이 가격을 적용함.\n  defaultPrice: Float\n  # 예전에 Facilities 랑 같은 아이임...\n  tags: [Tag!]!\n  rooms: [Room!]!\n  createdAt: DateTime!\n  updatedAt: DateTime\n  # Legarcy\n  roomTemplateSrl: Int\n}\n\nenum PricingType {\n  DOMITORY\n  ROOM\n}\n\nenum RoomGender {\n  MALE\n  FEMALE\n  MIXED\n  SEPARATELY\n}\n\ntype TestFunctionResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateRoomResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ChangeIndexResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateRoomTypeResponse {\n  ok: Boolean!\n  error: String\n  roomType: RoomType\n}\n\ntype ChangePriorityResponse {\n  ok: Boolean!\n  error: String\n  season: Season\n}\n\ntype CreateSeasonResponse {\n  ok: Boolean!\n  error: String\n  season: Season\n}\n\ntype DeleteSeasonResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllSeasonResponse {\n  ok: Boolean!\n  error: String\n  seasons: [Season!]\n}\n\ntype GetSeasonWithDateResponse {\n  ok: Boolean!\n  error: String\n  season: Season\n}\n\ntype GetSeasonWithDateRangeResponse {\n  ok: Boolean!\n  error: String\n  seasons: [Season!]\n}\n\n# 날짜 범위에 Season을 포함.\ntype DateRangeWithSeason {\n  # 시작 날짜\n  start: DateTime!\n  # 끝 날짜\n  end: DateTime!\n  # 해당되는 시즌\n  season: Season!\n}\n\ntype Season {\n  _id: ID!\n  house: House!\n  name: String!\n  start: DateTime!\n  end: DateTime!\n  priority: Int!\n  color: String\n  description: String\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype UpdateSeasonResponse {\n  ok: Boolean\n  error: String\n  season: Season\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserForSUResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GmailConnectionResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  _id: ID!\n  name: Name!\n  phoneNumber: PhoneNumber!\n  password: Password\n  email: EmailAddress!\n  profileImg: URL\n  isPhoneVerified: Boolean!\n  isEmailVerified: Boolean!\n  userRole: UserRole!\n  checkPrivacyPolicy: Boolean!\n  houses: [House!]!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum UserRole {\n  ADMIN\n  HOST\n  GUEST\n  # 비회원 => name, phoneNumber, password, email, createdAt, updatedAt 데이터 만을 가짐\n  GHOST\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype ChangePasswordResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  _id: ID!\n  target: VerificationTarget!\n  payload: String!\n  verified: Boolean!\n  key: String!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\nenum VerificationTarget {\n  PHONE\n  EMAIL\n}\n"];
/* tslint:disable */

export interface Query {
  GetBooker: GetBookerResponse;
  GetBookers: GetBookersResponse;
  GetBookings: GetBookingsResponse;
  GetGuests: GetGuestsResponse;
  IsAbleToAllocate: IsAbleToAllocateResponse;
  GetAllHouseToHostApp: GetAllHouseToHostAppResponse;
  GetHouse: GetHouseResponse;
  GetHousesForSU: GetHousesForSUResponse;
  GetAllProducts: GetAllProductsResponse;
  GetAllProductTypes: GetAllProductTypesResponse;
  GetAllRoomPrice: GetAllRoomPriceResponse;
  GetAppliedPriceWithDateRange: GetAppliedPriceWithDateRangeResponse;
  GetRoomPrice: GetRoomPriceResponse;
  GetSeasonPrice: GetSeasonPriceResponse;
  CheckRoomAbleToAllocate: CheckRoomAbleToAllocateResponse;
  GetallocatedRoomList: GetallocatedRoomListResponse;
  GetAllRoomType: GetAllRoomTypeResponse;
  GetAvailableGuestCount: GetAvailableGuestCountResponse;
  GetRoomGuestsCapacity: GetRoomGuestsCapacityResponse;
  GetRoomTypeById: GetRoomTypeByIdResponse;
  GetRoomTypeGuestCapacity: GetRoomTypeGuestCapacityResponse;
  GetAllSeason: GetAllSeasonResponse;
  GetSeasonWithDate: GetSeasonWithDateResponse;
  GetSeasonWithDateRange: GetSeasonWithDateRangeResponse;
  EmailSignIn: EmailSignInResponse;
  GetMyProfile: GetMyProfileResponse;
  GetUserForSU: GetUserForSUResponse;
}

export interface GetBookerQueryArgs {
  bookerId: string;
}

export interface GetBookersQueryArgs {
  houseId: string;
  page: number;
  count: number;
}

export interface GetBookingsQueryArgs {
  page: number;
  count: number;
  houseId: string;
}

export interface GetGuestsQueryArgs {
  start: DateTime;
  end: DateTime;
  houseId: string;
}

export interface IsAbleToAllocateQueryArgs {
  guestId: string;
  roomId: string;
}

export interface GetAllHouseToHostAppQueryArgs {
  email: EmailAddress;
  password: Password;
}

export interface GetHouseQueryArgs {
  houseId: string;
}

export interface GetHousesForSuQueryArgs {
  page: number;
  count: number;
}

export interface GetAllRoomPriceQueryArgs {
  houseId: string;
  start: DateTime;
  end: DateTime;
}

export interface GetAppliedPriceWithDateRangeQueryArgs {
  roomTypeId: string;
  start: DateTime;
  end: DateTime;
}

export interface GetRoomPriceQueryArgs {
  roomTypeId: string;
  start: DateTime;
  end: DateTime;
}

export interface GetSeasonPriceQueryArgs {
  houseId: string;
}

export interface CheckRoomAbleToAllocateQueryArgs {
  roomId: string;
  start: DateTime;
  end: DateTime;
}

export interface GetallocatedRoomListQueryArgs {
  houseId: string;
  start: DateTime;
  end: DateTime;
}

export interface GetAllRoomTypeQueryArgs {
  houseId: string;
}

export interface GetAvailableGuestCountQueryArgs {
  roomTypeId: string;
  start: DateTime;
  end: DateTime;
  gender: Gender;
  paddingOtherGenderCount: number;
}

export interface GetRoomGuestsCapacityQueryArgs {
  roomId: string;
  start: DateTime;
  end: DateTime;
}

export interface GetRoomTypeByIdQueryArgs {
  roomTypeId: string;
}

export interface GetRoomTypeGuestCapacityQueryArgs {
  roomTypeId: string;
  start: DateTime | null;
  end: DateTime | null;
}

export interface GetAllSeasonQueryArgs {
  houseId: string;
}

export interface GetSeasonWithDateQueryArgs {
  houseId: string;
  date: DateTime;
}

export interface GetSeasonWithDateRangeQueryArgs {
  houseId: string;
  start: DateTime;
  end: DateTime;
}

export interface EmailSignInQueryArgs {
  email: EmailAddress;
  password: Password;
}

export interface GetUserForSuQueryArgs {
  userId: string;
}

export interface GetBookerResponse {
  ok: boolean;
  error: string | null;
  booker: Booker | null;
}

export interface Booker {
  _id: string;
  house: House;
  bookings: Array<Booking>;
  name: Name;
  password: string | null;
  phoneNumber: PhoneNumber;
  email: EmailAddress | null;
  agreePrivacyPolicy: boolean;
  isCheckIn: DateTime | null;
  memo: string | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface House {
  _id: string;
  name: string;
  houseType: HouseType;
  product: Product | null;
  hostApplication: HostApplication | null;
  hostAppCreated: boolean;
  user: User;
  location: Location;
  refundPolicy: Array<TermsOfRefund>;
  termsOfBooking: TermsOfBooking;
  roomTypes: Array<RoomType>;
  module_srl: number | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
  moduleSrl: number | null;
}

export type HouseType = "GUEST_HOUSE" | "HOSTEL" | "HOTEL" | "MOTEL" | "PENSION" | "YOUTH_HOSTEL";

export interface Product {
  _id: string;
  name: string;
  price: number | null;
  discountedPrice: number | null;
  roomCount: number | null;
  roomCountExtraCharge: number | null;
  bookingCount: number | null;
  bookingCountExtraCharge: number | null;
  house: House;
  productType: ProductType;
  canHaveHostApp: boolean;
  description: string | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  roomCount: number;
  roomCountExtraCharge: number;
  bookingCount: number;
  bookingCountExtraCharge: number;
  description: string | null;
  canHaveHostApp: boolean;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type DateTime = any;

export interface HostApplication {
  _id: string;
  applicationType: ApplicationType;
  house: House;
  user: User;
  url: URL;
  description: string | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type ApplicationType = "BOOKING_WEB";

export interface User {
  _id: string;
  name: Name;
  phoneNumber: PhoneNumber;
  password: Password | null;
  email: EmailAddress;
  profileImg: URL | null;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  userRole: UserRole;
  checkPrivacyPolicy: boolean;
  houses: Array<House>;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type Name = any;

export type PhoneNumber = any;

export type Password = any;

export type EmailAddress = any;

export type URL = any;

export type UserRole = "ADMIN" | "HOST" | "GUEST" | "GHOST";

export interface Location {
  address: string;
  addressDetail: string | null;
  lat: number;
  lng: number;
}

export interface TermsOfRefund {
  beforeDays: number;
  rate: number;
  description: string | null;
}

export interface TermsOfBooking {
  farthestSelectableDate: number;
  nearestSelectableDate: number;
  selectableDateRange: number;
}

export interface RoomType {
  _id: string;
  name: string;
  house: House;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: URL | null;
  description: string | null;
  defaultPrice: number | null;
  tags: Array<Tag>;
  rooms: Array<Room>;
  createdAt: DateTime;
  updatedAt: DateTime | null;
  roomTemplateSrl: number | null;
}

export type PricingType = "DOMITORY" | "ROOM";

export type RoomGender = "MALE" | "FEMALE" | "MIXED" | "SEPARATELY";

export interface Tag {
  name: string;
  content: string;
  icon: string;
}

export interface Room {
  _id: string;
  name: string;
  roomType: RoomType;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: DateTime;
  updatedAt: DateTime | null;
  roomSrl: number | null;
}

export interface Booking {
  _id: string;
  bookingId: string;
  house: House;
  roomType: RoomType;
  booker: Booker;
  guests: Array<Guest>;
  guestCount: number;
  price: number;
  start: DateTime;
  end: DateTime;
  discountedPrice: number;
  bookingStatus: BookingStatus;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface Guest {
  _id: string;
  guestId: string;
  house: House;
  roomType: RoomType | null;
  allocatedRoom: Room | null;
  booking: Booking | null;
  name: Name | null;
  start: DateTime;
  end: DateTime;
  pricingType: PricingType;
  isTempAllocation: boolean;
  bedIndex: number;
  gender: Gender | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type Gender = "MALE" | "FEMALE";

export type BookingStatus = "COMPLETE" | "CANCEL";

export interface GetBookersResponse {
  ok: boolean;
  error: string | null;
  bookers: Array<Booker>;
  pageInfo: PageInfoOffsetBase | null;
}

export interface PageInfoOffsetBase {
  currentPage: number;
  totalPage: number;
  rowCount: number;
}

export interface GetBookingsResponse {
  ok: boolean;
  error: string | null;
  bookings: Array<Booking>;
  pageInfo: PageInfoOffsetBase | null;
}

export interface GetGuestsResponse {
  ok: boolean;
  error: string | null;
  guests: Array<Guest>;
}

export interface IsAbleToAllocateResponse {
  ok: boolean;
  error: string | null;
  guest: Guest | null;
}

export interface GetAllHouseToHostAppResponse {
  ok: boolean;
  error: string | null;
  houses: Array<House>;
}

export interface GetHouseResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface GetHousesForSUResponse {
  ok: boolean;
  error: string | null;
  houses: Array<House>;
  pageInfo: PageInfoOffsetBase | null;
}

export interface GetAllProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product>;
}

export interface GetAllProductTypesResponse {
  ok: boolean;
  error: string | null;
  productTypes: Array<ProductType>;
}

export interface GetAllRoomPriceResponse {
  ok: boolean;
  error: string | null;
  roomPrices: Array<RoomPrice>;
}

export interface RoomPrice {
  _id: string;
  roomType: RoomType;
  house: House;
  price: number;
  date: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface GetAppliedPriceWithDateRangeResponse {
  ok: boolean;
  error: string | null;
  seasonPrices: Array<SeasonPrice>;
}

export interface SeasonPrice {
  _id: string;
  roomType: RoomType;
  season: Season;
  defaultPrice: number;
  dayOfWeekPrices: Array<DayOfWeekPrice>;
}

export interface Season {
  _id: string;
  house: House;
  name: string;
  start: DateTime;
  end: DateTime;
  priority: number;
  color: string | null;
  description: string | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface DayOfWeekPrice {
  price: number;
  applyDays: number;
}

export interface GetRoomPriceResponse {
  ok: boolean;
  error: string | null;
  roomPrices: Array<RoomPrice>;
}

export interface GetSeasonPriceResponse {
  ok: boolean;
  error: string | null;
  seasonPrices: Array<SeasonPrice>;
}

export interface CheckRoomAbleToAllocateResponse {
  ok: boolean;
  error: string | null;
  roomStatusList: Array<RoomStatus>;
}

export interface RoomStatus {
  room: Room;
  date: DateTime;
  maxAllocating: number;
  guests: Array<Guest>;
}

export interface GetallocatedRoomListResponse {
  ok: boolean;
  error: string | null;
  allocatedRoomList: Array<AllocatedRoom>;
}

export interface AllocatedRoom {
  room: Room;
  date: DateTime;
  guests: Array<Guest>;
}

export interface GetAllRoomTypeResponse {
  ok: boolean | null;
  error: string | null;
  roomTypes: Array<RoomType>;
}

export interface GetAvailableGuestCountResponse {
  ok: boolean;
  error: string | null;
  roomCapacity: RoomCapacity | null;
}

export interface RoomCapacity {
  roomId: string;
  roomGender: RoomGender;
  guestGender: GuestGender | null;
  availableCount: number;
}

export type GuestGender = "MALE" | "FEMALE" | "MIXED";

export interface GetRoomGuestsCapacityResponse {
  ok: boolean;
  error: string | null;
  capacity: RoomCapacity | null;
}

export interface GetRoomTypeByIdResponse {
  ok: boolean;
  error: string | null;
  roomType: RoomType | null;
}

export interface GetRoomTypeGuestCapacityResponse {
  ok: boolean;
  error: string | null;
  roomTypeCapacity: RoomTypeCapacity | null;
}

export interface RoomTypeCapacity {
  start: DateTime;
  end: DateTime;
  roomGender: RoomGender;
  male: number;
  female: number;
  mixed: number;
}

export interface GetAllSeasonResponse {
  ok: boolean;
  error: string | null;
  seasons: Array<Season>;
}

export interface GetSeasonWithDateResponse {
  ok: boolean;
  error: string | null;
  season: Season | null;
}

export interface GetSeasonWithDateRangeResponse {
  ok: boolean;
  error: string | null;
  seasons: Array<Season>;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetUserForSUResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateBooker: CreateBookerResponse;
  DeleteBooker: DeleteBookerResponse;
  CreateBooking: CreateBookingResponse;
  DeleteBooking: DeleteBookingResponse;
  UpdateBooking: UpdateBookingResponse;
  AllocateGuestToRoom: AllocateGuestToRoomResponse;
  CreateGuest: CreateGuestResponse;
  CreateGuests: CreateGuestsResponse;
  ToggleIsTempAllocated: ToggleIsTempAllocatedResponse;
  CreateHostApplication: CreateHostApplicationResponse;
  CreateIntergration: CreateIntergrationResponse;
  UpdateHouseToHostApp: UpdateHouseToHostAppResponse;
  CreateRoomTypeToHostApp: CreateRoomTypeToHostAppResponse;
  UpdateRoomTypeToHostApp: UpdateRoomTypeToHostAppResponse;
  ChangePriorityToHostApp: ChangePriorityToHostAppResponse;
  CreateSeasonToHostApp: CreateSeasonToHostAppResponse;
  UpdateSeasonToHostApp: UpdateSeasonToHostAppResponse;
  CreateSeasonPriceToHostApp: CreateSeasonPriceToHostAppResponse;
  UpdateSeasonPriceToHostApp: UpdateSeasonPriceToHostAppResponse;
  CreateHouse: CreateHouseResponse;
  DeleteHouse: DeleteHouseResponse;
  UpdateHouse: UpdateHouseResponse;
  CreateProduct: CreateProductResponse;
  BuyProduct: BuyProductResponse;
  CreateProductType: CreateProductTypeResponse;
  DeleteProductType: DeleteProductTypeResponse;
  RefundProduct: RefundProductResponse;
  UpdateProductType: UpdateProductTypeResponse;
  CreateRoomPrice: CreateRoomPriceResponse;
  CreateSeasonPrice: CreateSeasonPriceResponse;
  CreateSeasonPrices: CreateSeasonPricesResponse;
  DeleteRoomPrice: DeleteRoomPriceResponse;
  UpdateSeasonPrice: UpdateSeasonPriceResponse;
  CreateRoom: CreateRoomResponse;
  CreateRoomType: CreateRoomTypeResponse;
  DeleteRoom: DeleteRoomResponse;
  DeleteRoomType: DeleteRoomTypeResponse;
  TestFunction: TestFunctionResponse;
  UpdateRoom: UpdateRoomResponse;
  ChangeIndex: ChangeIndexResponse;
  UpdateRoomType: UpdateRoomTypeResponse;
  ChangePriority: ChangePriorityResponse;
  CreateSeason: CreateSeasonResponse;
  DeleteSeason: DeleteSeasonResponse;
  UpdateSeason: UpdateSeasonResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignUp: EmailSignUpResponse;
  GmailConnect: GmailConnectionResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
  ChangePassword: ChangePasswordResponse;
}

export interface CreateBookerMutationArgs {
  houseId: string;
  name: Name;
  password: Password;
  phoneNumber: PhoneNumber;
  email: EmailAddress | null;
  agreePrivacyPolicy: boolean;
}

export interface DeleteBookerMutationArgs {
  bookerId: string;
}

export interface CreateBookingMutationArgs {
  bookingParams: BookingInput;
}

export interface DeleteBookingMutationArgs {
  bookerId: string;
  bookingId: string;
}

export interface UpdateBookingMutationArgs {
  bookingId: string;
  bookingStatus: BookingStatus | null;
  start: DateTime | null;
  end: DateTime | null;
  price: number | null;
}

export interface AllocateGuestToRoomMutationArgs {
  roomId: string;
  guestId: string;
}

export interface CreateGuestMutationArgs {
  houseId: string;
  bookerId: string;
  roomTypeId: string;
  roomId: string | null;
  start: DateTime;
  end: DateTime;
  gender: Gender;
  pricingType: PricingType;
}

export interface CreateGuestsMutationArgs {
  houseId: string;
  bookerId: string;
  roomTypeId: string;
  roomIds: Array<string>;
  start: DateTime;
  end: DateTime;
  pricingType: PricingType;
}

export interface ToggleIsTempAllocatedMutationArgs {
  guestId: string;
  isTempAllocation: boolean;
}

export interface CreateHostApplicationMutationArgs {
  houseId: string;
  applicationType: ApplicationType | null;
  url: URL | null;
  description: string | null;
}

export interface CreateIntergrationMutationArgs {
  houseId: string;
}

export interface UpdateHouseToHostAppMutationArgs {
  name: string | null;
  houseType: HouseType | null;
  location: LocationInput | null;
  refundPolicy: Array<TermsOfRefundInput>;
  termsOfBooking: TermsOfBookingInput | null;
}

export interface CreateRoomTypeToHostAppMutationArgs {
  name: string;
  roomTemplateSrl: number;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number | null;
  description: string | null;
  roomGender: RoomGender | null;
  img: URL | null;
  tags: Array<TagInput>;
}

export interface UpdateRoomTypeToHostAppMutationArgs {
  roomTemplateSrl: number;
  name: string | null;
  peopleCount: number | null;
  peopleCountMax: number | null;
  img: string | null;
  roomGender: number | null;
  description: string | null;
}

export interface ChangePriorityToHostAppMutationArgs {
  seasonId: string;
  houseId: string;
  priority: number;
}

export interface CreateSeasonToHostAppMutationArgs {
  name: string;
  start: DateTime;
  end: DateTime;
  color: string | null;
  description: string | null;
}

export interface UpdateSeasonToHostAppMutationArgs {
  seasonId: string;
  name: string | null;
  start: DateTime | null;
  end: DateTime | null;
  color: string | null;
  description: string | null;
}

export interface CreateSeasonPriceToHostAppMutationArgs {
  roomTypeId: string;
  seasonId: string;
  price: number;
  applyDays: number | null;
}

export interface UpdateSeasonPriceToHostAppMutationArgs {
  seasonPriceId: string;
  price: number | null;
  applyDays: number;
}

export interface CreateHouseMutationArgs {
  name: string;
  houseType: HouseType;
  location: LocationInput;
}

export interface DeleteHouseMutationArgs {
  _id: string;
}

export interface UpdateHouseMutationArgs {
  houseId: string;
  name: string | null;
  houseType: HouseType | null;
  location: LocationInput | null;
  refundPolicy: Array<TermsOfRefundInput>;
  termsOfBooking: TermsOfBookingInput | null;
}

export interface CreateProductMutationArgs {
  name: string;
  price: number | null;
  discountedPrice: number | null;
  roomCount: number | null;
  roomCountExtraCharge: number | null;
  bookingCount: number | null;
  bookingCountExtraCharge: number | null;
  description: string | null;
  canHaveHostApp: boolean | null;
}

export interface BuyProductMutationArgs {
  houseId: string;
  productTypeId: string;
}

export interface CreateProductTypeMutationArgs {
  name: string;
  price: number;
  roomCount: number | null;
  roomCountExtraCharge: number | null;
  bookingCount: number | null;
  bookingCountExtraCharge: number | null;
  description: string | null;
  canHaveHostApp: boolean | null;
}

export interface DeleteProductTypeMutationArgs {
  productTypeId: string;
}

export interface RefundProductMutationArgs {
  houseId: string;
  productId: string;
}

export interface UpdateProductTypeMutationArgs {
  productTypeId: string;
  name: string;
  price: number;
  roomCount: number;
  roomCountExtraCharge: number;
  bookingCount: number;
  bookingCountExtraCharge: number;
  description: string | null;
}

export interface CreateRoomPriceMutationArgs {
  price: number;
  roomTypeId: string;
  houseId: string;
  date: DateTime;
}

export interface CreateSeasonPriceMutationArgs {
  roomTypeId: string;
  seasonId: string;
  defaultPrice: number;
  dayOfWeekPrices: Array<DayOfWeekPriceInput>;
}

export interface CreateSeasonPricesMutationArgs {
  seasonId: string;
  seasonPrices: Array<SeasonPriceInput>;
}

export interface DeleteRoomPriceMutationArgs {
  date: DateTime;
  roomTypeId: string;
}

export interface UpdateSeasonPriceMutationArgs {
  seasonPriceId: string;
  price: number | null;
  applyDays: number;
}

export interface CreateRoomMutationArgs {
  name: string;
  roomType: string;
}

export interface CreateRoomTypeMutationArgs {
  name: string;
  houseId: string;
  pricingType: PricingType;
  roomGender: RoomGender | null;
  img: URL | null;
  peopleCount: number;
  peopleCountMax: number | null;
  defaultPrice: number | null;
  description: string | null;
  tags: Array<TagInput>;
}

export interface DeleteRoomMutationArgs {
  roomId: string;
}

export interface DeleteRoomTypeMutationArgs {
  roomTypeId: string;
  houseId: string;
}

export interface TestFunctionMutationArgs {
  roomTypeId: string;
  start: DateTime;
  end: DateTime;
  gender: Gender;
  paddingOtherGenderCount: number;
}

export interface UpdateRoomMutationArgs {
  roomId: string;
  name: string | null;
}

export interface ChangeIndexMutationArgs {
  roomTypeId: string;
  houseId: string;
  index: number;
}

export interface UpdateRoomTypeMutationArgs {
  roomTypeId: string;
  houseId: string;
  name: string | null;
  peopleCount: number | null;
  peopleCountMax: number | null;
  img: URL | null;
  description: string | null;
}

export interface ChangePriorityMutationArgs {
  seasonId: string;
  houseId: string;
  priority: number;
}

export interface CreateSeasonMutationArgs {
  name: string;
  start: DateTime;
  end: DateTime;
  houseId: string;
  color: string | null;
  description: string | null;
  seasonPrices: Array<SeasonPriceInput>;
}

export interface DeleteSeasonMutationArgs {
  seasonId: string;
  houseId: string;
}

export interface UpdateSeasonMutationArgs {
  seasonId: string;
  name: string | null;
  start: DateTime | null;
  end: DateTime | null;
  color: string | null;
  description: string | null;
  seasonPrices: Array<SeasonPriceInput>;
}

export interface CompletePhoneVerificationMutationArgs {
  key: string;
}

export interface EmailSignUpMutationArgs {
  name: Name;
  email: EmailAddress;
  password: Password;
  phoneNumber: PhoneNumber;
}

export interface GmailConnectMutationArgs {
  firstName: string;
  lastName: string;
  gmail: string;
}

export interface UpdateMyProfileMutationArgs {
  name: Name;
  password: Password;
  profileImg: URL | null;
  phoneNumber: PhoneNumber | null;
  email: EmailAddress | null;
}

export interface ChangePasswordMutationArgs {
  currentPassword: Password;
  newPassword: Password;
  newPasswordRepeat: Password;
}

export interface CreateBookerResponse {
  ok: boolean;
  error: string | null;
  booker: Booker | null;
}

export interface DeleteBookerResponse {
  ok: boolean;
  error: string | null;
}

export interface BookingInput {
  booker: BookerInput;
  start: DateTime;
  end: DateTime;
  guestInputs: Array<GuestPartInput>;
}

export interface BookerInput {
  house: string;
  booking: string | null;
  name: Name;
  password: string;
  phoneNumber: PhoneNumber;
  email: EmailAddress | null;
  agreePrivacyPolicy: boolean;
  memo: string | null;
}

export interface GuestPartInput {
  roomTypeId: string;
  price: number;
  discountedPrice: number | null;
  pricingType: PricingType;
  countFemaleGuest: number;
  countMaleGuest: number;
  countRoom: number;
}

export interface CreateBookingResponse {
  ok: boolean;
  error: string | null;
  bookings: Array<Booking>;
}

export interface DeleteBookingResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateBookingResponse {
  ok: boolean;
  error: string | null;
  bookings: Array<Booking>;
}

export interface AllocateGuestToRoomResponse {
  ok: boolean;
  error: string | null;
  guest: Guest | null;
}

export interface CreateGuestResponse {
  ok: boolean;
  error: string | null;
  guest: Guest | null;
}

export interface CreateGuestsResponse {
  ok: boolean;
  error: string | null;
  guests: Array<Guest>;
}

export interface ToggleIsTempAllocatedResponse {
  ok: boolean;
  error: string | null;
  guest: Guest | null;
}

export interface CreateHostApplicationResponse {
  ok: boolean;
  error: string | null;
  hostApp: HostApplication | null;
}

export interface CreateIntergrationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface LocationInput {
  address: string;
  addressDetail: string | null;
  lat: number;
  lng: number;
}

export interface TermsOfRefundInput {
  beforeDays: number;
  rate: number;
  description: string | null;
}

export interface TermsOfBookingInput {
  farthestSelectableDate: number;
  nearestSelectableDate: number;
  selectableDateRange: number;
}

export interface UpdateHouseToHostAppResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface TagInput {
  name: string;
  content: string;
  icon: string | null;
}

export interface CreateRoomTypeToHostAppResponse {
  ok: boolean;
  error: string | null;
  roomType: RoomType | null;
}

export interface UpdateRoomTypeToHostAppResponse {
  ok: boolean;
  error: string | null;
  roomType: RoomType | null;
}

export interface ChangePriorityToHostAppResponse {
  ok: boolean;
  error: string | null;
  season: Season | null;
}

export interface CreateSeasonToHostAppResponse {
  ok: boolean;
  error: string | null;
  season: Season | null;
}

export interface UpdateSeasonToHostAppResponse {
  ok: boolean | null;
  error: string | null;
  season: Season | null;
}

export interface CreateSeasonPriceToHostAppResponse {
  ok: boolean;
  error: string | null;
  seasonPrice: SeasonPrice | null;
}

export interface UpdateSeasonPriceToHostAppResponse {
  ok: boolean;
  error: string | null;
  seasonPrice: SeasonPrice | null;
}

export interface CreateHouseResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface DeleteHouseResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateHouseResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface CreateProductResponse {
  ok: boolean;
  error: string | null;
  product: Product | null;
}

export interface BuyProductResponse {
  ok: boolean;
  error: string | null;
  product: Product | null;
}

export interface CreateProductTypeResponse {
  ok: boolean;
  error: string | null;
  productType: ProductType | null;
}

export interface DeleteProductTypeResponse {
  ok: boolean;
  error: string | null;
}

export interface RefundProductResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface UpdateProductTypeResponse {
  ok: boolean;
  error: string | null;
  productType: ProductType | null;
}

export interface CreateRoomPriceResponse {
  ok: boolean;
  error: string | null;
  roomPrice: RoomPrice | null;
}

export interface DayOfWeekPriceInput {
  price: number;
  applyDays: number;
}

export interface CreateSeasonPriceResponse {
  ok: boolean;
  error: string | null;
  seasonPrice: SeasonPrice | null;
}

export interface SeasonPriceInput {
  roomTypeId: string;
  defaultPrice: number;
  dayOfWeekPrices: Array<DayOfWeekPriceInput>;
}

export interface CreateSeasonPricesResponse {
  ok: boolean;
  error: string | null;
  seasonPrices: Array<SeasonPrice>;
}

export interface DeleteRoomPriceResponse {
  ok: boolean;
  error: string | null;
  roomPrice: RoomPrice | null;
}

export interface UpdateSeasonPriceResponse {
  ok: boolean;
  error: string | null;
  seasonPrice: SeasonPrice | null;
}

export interface CreateRoomResponse {
  ok: boolean | null;
  error: string | null;
  room: Room | null;
}

export interface CreateRoomTypeResponse {
  ok: boolean;
  error: string | null;
  roomType: RoomType | null;
}

export interface DeleteRoomResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteRoomTypeResponse {
  ok: boolean;
  error: string | null;
}

export interface TestFunctionResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateRoomResponse {
  ok: boolean;
  error: string | null;
}

export interface ChangeIndexResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateRoomTypeResponse {
  ok: boolean;
  error: string | null;
  roomType: RoomType | null;
}

export interface ChangePriorityResponse {
  ok: boolean;
  error: string | null;
  season: Season | null;
}

export interface CreateSeasonResponse {
  ok: boolean;
  error: string | null;
  season: Season | null;
}

export interface DeleteSeasonResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateSeasonResponse {
  ok: boolean | null;
  error: string | null;
  season: Season | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GmailConnectionResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface ChangePasswordResponse {
  ok: boolean;
  error: string | null;
}

export interface BookingSortInput {
  key: BookingSortKeyEnum;
  order: number;
}

export type BookingSortKeyEnum = "_id" | "updatedAt" | "createdAt";

export interface BookingFilter {
  roomTypeId: string;
  booker: string;
}

export type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export interface SelectOption {
  value: string;
  label: string;
}

export interface PageInfo {
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type DateRangeStatus = "PAST" | "PRESENT" | "FUTURE";

export interface DateRange {
  hashCode: number;
  startDate: DateTime | null;
  endDate: DateTime | null;
}

export interface DateRangeInput {
  startDate: DateTime | null;
  endDate: DateTime | null;
}

export interface DisableRange {
  hashCode: number;
  startDate: DateTime | null;
  endDate: DateTime | null;
  description: string | null;
}

export interface DisableRangeInput {
  startDate: DateTime | null;
  endDate: DateTime | null;
  description: string | null;
}

export interface GuestInput {
  houseId: string;
  bookerId: string;
  roomTypeId: string;
  roomId: string | null;
  bookingId: string;
  start: DateTime;
  end: DateTime;
  pricingType: PricingType;
  gender: Gender | null;
}

export interface GuestsInput {
  houseId: string;
  bookerId: string;
  bookingId: string | null;
  roomTypeId: string;
  start: DateTime;
  end: DateTime;
  pricingType: Array<PricingType>;
  gender: Array<Gender>;
  roomId: Array<string>;
}

export interface HouseSortInput {
  key: HouseSortKeyEnum;
  order: number;
}

export type HouseSortKeyEnum = "_id" | "updatedAt" | "createdAt";

export interface HouseFilter {
  houseType: HouseType | null;
}

export interface RoomCapacityWithEmptyBed {
  roomId: string;
  roomGender: RoomGender;
  guestGender: GuestGender | null;
  availableCount: number;
  emptyBeds: Array<number>;
}

export interface DateRangeWithSeason {
  start: DateTime;
  end: DateTime;
  season: Season;
}

export interface Verification {
  _id: string;
  target: VerificationTarget;
  payload: string;
  verified: boolean;
  key: string;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export type VerificationTarget = "PHONE" | "EMAIL";
