import { IuseImageUploaderOption, IUseModal } from '../hooks/hook';
import { GB_booking, IHouseConfigFull, IBlockOp, JdFile, JDpageInfo, IRoomType } from './interface';
import {
	RoomGender,
	PricingType,
	PayMethod,
	PaymentStatus,
	BookingStatus,
	TimePerMs,
	MemoType,
	UserRole,
	PaymentType,
	Gender,
	OptionalItemType
} from './enum';
import {
	getSmsInfo_GetSmsInfo_smsInfo_smsTemplates,
	getSmsInfo_GetSmsInfo_smsInfo,
	getSpecification_GetHouse_house_product,
	getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp,
	getAllRoomType_GetAllRoomType_roomTypes_rooms,
	getMemos_GetMemos_memos,
	getMyProfile_GetMyProfile_user,
	getHM_GetHM_HM,
	getBooking_GetBooking_booking_guests_GuestDomitory,
	getMyProfile_GetMyProfile_user_paymentInfos
} from './api';
import { IAssigItem, IAssigGroup, GuestTypeAdd } from '../pages/bookingHost/assig/components/assigIntrerface';
import { TCardRegistInfo } from '../components/cardModal/declare';
import { IContext } from '../pages/bookingHost/BookingHostRouter';
import { IselectedOption } from '@janda-com/front/build/types/interface';
export const ANY: any = {};

export const DEFAULT_ROOMTYPE_ROOM: getAllRoomType_GetAllRoomType_roomTypes_rooms = {
	__typename: 'Room',
	_id: '',
	name: '222'
};

export const DEFAULT_ROOMTYPE: IRoomType = {
	__typename: 'RoomType',
	name: '',
	pricingType: PricingType.DOMITORY,
	peopleCount: 0,
	peopleCountMax: 0,
	hashTags: [],
	rooms: [],
	code: '',
	roomCount: 0,
	roomGender: RoomGender.SEPARATELY,
	description: null,
	defaultPrice: null,
	updatedAt: null,
	images: [],
	createdAt: undefined,
	tags: [
		{
			__typename: 'Tag',
			key: '',
			value: ''
		}
	],
	_id: '',
	optionalItems: []
};

// 유틸성을 위해 만들어둔 기본 booking
export const DEFAULT_BOOKING: GB_booking = {
	__typename: 'Booking',
	_id: 'default',
	paidByNice: false,
	breakfast: false,
	memo: '',
	bookingNum: '',
	funnels: null,
	createdAt: '',
	updatedAt: '',
	status: BookingStatus.COMPLETED,
	isConfirm: false,
	isNew: false,
	roomTypes: null,
	name: '',
	phoneNumber: '',
	checkInInfo: {
		__typename: 'CheckInInfo',
		isIn: false,
		checkInDateTime: new Date()
	},
	email: '',
	checkOut: null,
	checkIn: null,
	agreePrivacyPolicy: true,
	password: null,
	guests: null,
	payment: {
		__typename: 'Payment',
		payMethod: PayMethod.CARD,
		paymentResultParam: null,
		status: PaymentStatus.COMPLETED,
		totalPrice: 0,
		cardInfo: null,
		goodsVat: 0,
		refundedPrice: 0,
		supplyAmt: 0,
		tid: null,
		type: PaymentType.ONE_TIME
	},
	optionalItemSubmitted: []
};

export const DEFAULT_ASSIG_GROUP: IAssigGroup = {
	id: '-1',
	stackItems: false,
	title: '',
	roomTypeId: '-1',
	roomTypeIndex: -1,
	roomIndex: -1,
	room: {
		_id: '',
		name: ''
	},
	roomType: { ...DEFAULT_ROOMTYPE, rooms: [] },
	roomId: '-1',
	bedIndex: -1,
	placeIndex: -1,
	isLastOfRoom: false,
	isLastOfRoomType: false,
	roomGender: null,
	pricingType: PricingType.ROOM
};

export const DEFAULT_SMS_TEMPLATE: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates = {
	_id: '-1',
	__typename: 'SmsTemplate',
	formatName: '',
	smsFormat: '',
	smsSendCase: null
};

export const DEFAULT_SMS_INFO: getSmsInfo_GetSmsInfo_smsInfo = {
	__typename: 'SmsInfo',
	_id: '-1',
	receivers: null,
	sender: null,
	smsTemplates: null
};

export const FAKE_MODAL_HOOK: IUseModal = {
	closeModal: () => {},
	isOpen: true,
	info: {},
	openModal: () => {}
};

export const FAKE_CONTEXT: IContext = {
	JDlang: ANY,
	applyedProduct: ANY,
	history: ANY,
	house: ANY,
	houseConfig: ANY,
	houses: [],
	isLogIn: true,
	location: ANY,
	match: ANY,
	user: ANY
};

// specification에서 사용
export const DEFAULT_PRODUCT: getSpecification_GetHouse_house_product = {
	__typename: 'Product',
	_id: '0',
	status: {
		__typename: 'ProductStatus',
		discontinueDate: '',
		isContinue: false
	},
	billKey: null,
	expireDate: new Date(),
	isExpired: false,
	roomCount: 0,
	roomCountExtraCharge: 0,
	bookingCount: 0,
	bookingCountExtraCharge: 0,
	createdAt: '',
	description: '',
	discountedPrice: 0,
	daysLeftToExpire: 0,
	name: '',
	price: 0,
	productType: {
		__typename: 'ProductType',
		_id: '',
		name: ''
	},
	updatedAt: ''
};

export const DEFAULT_NONE_GOUP: IAssigGroup = {
	...DEFAULT_ASSIG_GROUP,
	id: 'noneGroup'
};

export const DEFAULT_BLOCK_OP: IBlockOp = {
	__typename: 'BlockOption',
	color: null
};

export const DEFAULT_ASSIG_ITEM: IAssigItem = {
	bedIndex: -1,
	bookingId: '',
	breakfast: false,
	end: 0,
	gender: null,
	group: '',
	itemIndex: -1,
	id: '',
	checkInInfo: false,
	name: '',
	status: BookingStatus.COMPLETED,
	roomId: '',
	temp: false,
	roomTypeId: '',
	loading: false,
	start: 0,
	type: GuestTypeAdd.BLOCK,
	canMove: true,
	blockOption: DEFAULT_BLOCK_OP,
	showEffect: false,
	showNewBadge: false
};

export const DEFAULT_ADDITION_BLOCKOP: getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp = {
	__typename: 'ItemBlockOp',
	itemBlockOpEnable: false,
	useColor: false
};

export const DEFAULT_HM: getHM_GetHM_HM = {
	__typename: 'HM',
	_id: '',
	title: {},
	backgroundImg: null,
	createdAt: '',
	location: {
		__typename: 'Location',
		address: '',
		addressDetail: '',
		lat: 0,
		lng: 0
	},
	email: '',
	langList: [],
	menus: [],
	phoneNumber: '',
	profileImg: null,
	updatedAt: ''
};

export const DEFAULT_MEMO: getMemos_GetMemos_memos = {
	__typename: 'Memo',
	_id: 'default__memo',
	createdAt: '',
	memoType: MemoType.HOST,
	text: '',
	enableAlert: false,
	title: '',
	updatedAt: ''
};

export const DEFAULT_IMAGEUP_LOADER_OPTION: IuseImageUploaderOption = {
	quality: 100,
	resizeMaxHeight: 500,
	resizeMaxWidth: 500
};

// 서버 모델에서 가져옴
// @ts-ignore
export const DEFAULT_HOUSE_CONFIG: IHouseConfigFull = {
	__typename: 'HouseConfig',
	pollingPeriod: {
		__typename: 'PollingPeriod',
		enable: false,
		period: 50000
	},
	assigTimeline: {
		__typename: 'AssigTimeline',
		roomTypeTabEnable: false,
		itemBlockOp: {
			__typename: 'ItemBlockOp',
			itemBlockOpEnable: false,
			useColor: false
		}
	},
	bookingConfig: {
		__typename: 'BookingConfig',
		maxStayDate: 100,
		newBookingMark: {
			__typename: 'NewBookingMark',
			enable: false,
			newGuestTime: TimePerMs.DAY
		},
		bookOnlySingleDay: false,
		collectingInfoFromGuest: {
			__typename: 'CollectingInfoFromGuest',
			email: false,
			country: false
		}
	},
	baseConfig: {
		__typename: 'BaseConfig',
		pricingTypes: []
	}
};

export const DEFAULT_GUEST: getBooking_GetBooking_booking_guests_GuestDomitory = {
	__typename: 'GuestDomitory',
	_id: '',
	bedIndex: 0,
	checkIn: '',
	checkOut: '',
	gender: Gender.MALE,
	pricingType: PricingType.DOMITORY,
	room: null,
	roomType: DEFAULT_ROOMTYPE
};

export const DEFAULT_FILE: JdFile = {
	filename: '',
	mimeType: '',
	url: '',
	__typename: 'JdFile'
};

export const DEFAULT_USER: getMyProfile_GetMyProfile_user = {
	__typename: 'User',
	_id: '',
	createdAt: '',
	checkPrivacyPolicy: false,
	paymentInfos: [],
	updatedAt: '',
	bankAccountInfo: null,
	name: '',
	phoneNumber: '',
	email: '',
	password: '',
	userRole: UserRole.GHOST,
	isPhoneVerified: false,
	profileImg: null,
	houses: []
};

export const DEFAULT_PAYMENT_INFO: getMyProfile_GetMyProfile_user_paymentInfos = {
	__typename: 'PaymentInfo',
	authDate: new Date(),
	billKey: '',
	cardCl: 0,
	cardCode: 0,
	cardNoHashed: '',
	cardName: '',
	card: null,
	cardNo: '',
	isLive: false
};

export const DEFAULT_CARD_INFO: TCardRegistInfo = {
	cardNo: '',
	cardPw: '',
	expMonth: '',
	expYear: '',
	idNo: ''
};

export const DEFAULT_PAGE_INFO: JDpageInfo = {
	currentPage: 0,
	rowCount: 0,
	totalPage: 0
};

export const DEFAULT_BANK_INFO = {
	bankName: '',
	accountNum: '',
	accountHolder: ''
};

export const DEFAULT_OPTION_ITEM = {
	__typename: 'OptionalItem',
	_id: '',
	description: '',
	label: '',
	maxCount: 0,
	multiplyDate: false,
	price: 0,
	type: OptionalItemType.INPUT
};

export const PAGE_COUNT_SELECT: IselectedOption[] = [
	{
		label: '20개씩 보기',
		value: 20
	},
	{
		label: '40개씩 보기',
		value: 40
	},
	{
		label: '60개씩 보기',
		value: 60
	},
	{
		label: '80개씩 보기',
		value: 80
	},
	{
		label: '100개씩 보기',
		value: 100
	}
];
