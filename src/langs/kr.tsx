import React from 'react';
import Mbr from '../atoms/mbr/Mbr';
import TextButton from '../atoms/textButton/TextButton';
import JDlist from '../atoms/list/List';
import PhotoFrame from '../atoms/photoFrame/PhotoFrame';
import { autoComma } from '../utils/utils';
import JDtypho from '../atoms/typho/Typho';
import Align from '../atoms/align/Align';
import { JDalign } from '@janda-com/front';

export const kr = {
	Apply: '적용',
	BOTH: '게스트,호스트',
	BY_DATE: '날짜별',
	BY_DAY_OF_WEEK: '요일별',
	CANCEL: '예약취소',
	CARD: '카드결제',
	CASH: '현금결제',
	BANK_TRANSFER: ' 무통장입금',
	CHANNEL_PAY: '채널페이',
	CHINESE: '중국어',
	COMPLETE: '예약완료',
	DISALBE: '정지',
	ENABLE: '정상',
	ENGLISH: '영어',
	FAIL: '예약실패',
	GUEST: '게스트',
	HM: 'AI 무인 솔루션',
	HM_set: 'AI 무인 솔루션 설정',
	HM_title: 'AI 무인 솔루션 타이틀',
	HOST: '호스트',
	Headcount: '인원수',
	JANDA_provide_free_homepage_for_guest: '잔다 고객분 들에게 무료 홈페이지를 제공합니다.',
	JAPANESE: '일본어',
	KOREAN: '한국어',
	MALE: '남',
	FEMALE: '여',
	MONTHLY: '월별',
	NOT_YET: '예약진행중',
	Pricing: '가격설정',
	Rooms: '객실',
	DOMITORY: '도미토리',
	ROOM: '룸',
	SmsReplaceKey: {
		STAYDATE: `[숙박일자(년/일)]`,
		STAYDATE_YMD: `[숙박일자(년/월/일)]`,
		ROOMTYPE_N_COUNT: `[숙박정보(방/명)]`,
		BOOKERNAME: `[예약자명]`,
		TOTALPRICE: `[가격]`,
		PAYMETHOD: `[결제방법]`,
		PAYMENTSTATUS: `[결제상태]`,
		HM: `[AI 무인 솔루션URL]`
	},
	Use_room_specific_tabs: '방타입별 탭을 사용합니다.',
	VBANK: '무통장입금',
	WAIT: '대기',
	WEEKLY: '주별',
	WEHN_BOOKING_CANCEL: '예약 취소시',
	WHEN_BOOKING_CREATED: '예약 생성시',
	WHEN_BOOKING_CREATED_PAYMENT_NOT_YET: '예약생성시(미결제)',
	WHEN_BOOKING_UPDATE: '예약업데이트시',
	YEARLY: '년별',
	accommodation_info: '숙박정보',
	add_room: '방추가',
	add_roomType: '방타입추가',
	additional_cost: '추가비용',
	admin_screen: '관리자 화면',
	agree: '동의',
	agree_to_privacy_policy: '개인정보 이용동의',
	alarm: '알림',
	alarm_transmission_completed: '알람 전송 성공',
	alarm_transmission_failed: '알람 전송 실패',
	allocation_calendar: '배정달력',
	applicant: '신청자',
	applicant_contact: '신청자 연락처',
	applied_product_type: '상품타입',
	applied_url: '적용URL',
	appliedby_default_in_periods_with_no_price_set: '가격이 설정되어 있지 않은 기간 에서 기본으로 적용됨',
	applies_to_all_reservations_booked_together: '함께 예약된 예약에 모두 적용',
	apply: '신청하기',
	apply_color: '적용색상',
	apply_layout: '신청레이아웃',
	apply_this_product_to_house: '이 상품을 숙소에 적용하기',
	are_you_sure_you_want_to_delete_the_reservation: '정말 예약을 삭제 하시겠습니까?',
	are_you_sure_you_want_to_delete_this_guest: '해당 게스트를 삭제하시겠습니까?',
	assig_completed: '배정완료',
	assig_failed: '배정실패',
	assig_guest_specific_setting: '배정 게스트에 대한 상세설정기능',
	auth: '인증',
	authenticate: '인증하기',
	auto_send: '자동발신',
	auto_send_condition: '자동발신 상황',
	auto_send_enable: '자동발신 활성화',
	auto_send_target: '자동발신 대상',
	auto_send_whether: '자동발신 여부',
	available: '사용가능',
	basic_offer: '기본제공',
	basic_price: '기본가격',
	basic_price_is_used_when_season_is_un_setted: '시즌이 적용되지 않는 기간 동안 "기본가격"을 사용합니다.',
	basic_room_price: '기본 방 가격',
	bedIndex: '침대번호',
	block: '자리막음',
	block_highlights: '블록 하일라이트',
	block_place: '자리막기',
	block_room: '방막기',
	block_room_completed: '방막기 완료',
	block_room_failed: '방막기 실패',
	booker: '예약자',
	booker_info: '예약자정보',
	booker_name: '예약자명',
	bookingList: '예약목록',
	booking_status: '예약상태',
	calender_date: '달력날짜',
	can_use_after_phone_auth: '휴대폰 인증후 사용가능',
	cancel: '취소',
	cancelBooking: '예약취소',
	cant_find_this_email: 'ID/PW 확인 바랍니다.',
	capacity: '수용인원',
	capacity_must_be_at_least_1_person: '수용인원은 1명 이상이여야 합니다.',
	caution: '주의',
	certification_number: '인증번호',
	certification_number_sent: '인증번호 발송완료',
	certification_number_sent_fail: '인증번호 발송실패',
	change: '변경',
	change_complited: '변경완료',
	change_date: '날짜변경',
	change_failed: '변경실패',
	change_house: '숙소변경',
	change_house_fail: '숙소 변경 실패',
	change_profile: '프로필 변경',
	change_statistics: '통계변경',
	changed_current_house: '현재숙소 변경',
	checkCheckInDate: '체크인 날짜를 선택해 주세요.',
	checkDelete: '개를 삭제하시겠습니까?',
	checkIn: '체크인',
	checkOut: '체크아웃',
	check_location_with_google_map: '구글맵으로 위치 확인하기',
	check_net_status: '인터넷 연결을 확인해주세요.',
	check_our_samples: '샘플들을 살펴보세요.',
	check_password: '비밀번호 확인',
	check_selection: '선택 확인',
	checkin_change_fail: '체크인 변경 실패',
	checkin_date: '체크인 날짜',
	checkin_status: '체크인 현황',
	checkout_date: '체크아웃 날짜',
	chnage_priority: '순위변경',
	choose_product: '상품선택',
	choosen_person: '선택 인원',
	choseCheckInDate: '체크인 날짜를 선택해 주세요.',
	choseCheckOutDate: '체크아웃 날짜를 선택해 주세요.',
	close: '닫기',
	close_today: '하루동안 알림 중지',
	color_set: '색상설정',
	complete_pay: '결제완료',
	complete_the_reservation_creation: '예약생성을 완료합니다.',
	completed: '완료',
	config: '설정',
	confirm: '확인',
	connected_email: '연결이메일',
	connected_number: '연결번호',
	consent_to_collection_of_personal_information: '개인정보 수집 동의',
	contact: '연락처',
	copy_reservation_page_URL: '예약페이지 URL 복사',
	create_a_new_template: '새로운 양식을 생성하세요.',
	create_booking: '예약생성',
	create_house: '숙소생성',
	create_house_completed: '숙소생성',
	create_memo_completed: '메모 생성완료',
	create_memo_fail: '메모 생성실패',
	create_new_memo: '새로운 메모 쓰기',
	create_room: '방생성',
	create_roomType_completed: '방타입 생성성공',
	create_roomType_fail: '방타입 생성실패',
	create_season: '시즌생성',
	create_season_complete: '시즌 생성완료',
	create_season_fail: '시즌 생성실패',
	create_template: '양식 생성',
	create_template_complited: '양식 생성완료',
	create_template_failed: '양식 생성실패',
	created_house: '생성한 숙소',
	current_set_number: '현재 설정된 번호',
	current_status: '현재상태',
	currently_applied_service: '현재 적용된 서비스',
	customer_inquiry: '고객문의',
	daily_refine_price: '상세가격 수정',
	date: '일',
	date_of_creation: '생성일시',
	date_of_statistics: '통계날짜',
	date_of_stay: '숙박일자',
	day_of_week: '요일',
	day_of_week_price: '요일별가격',
	day_sales: '일매출',
	default_Setting_complted: '기본 설정완료',
	default_system_setting: '기본 시스템 설정',
	delete: '삭제',
	delete_booking: '예약삭제',
	delete_completed: '삭제완료',
	delete_failed: '삭제실패',
	delete_season_complete: '시즌 삭제완료',
	delete_season_fail: '시즌 삭제실패',
	delete_template_completed: '양식 삭제완료',
	delete_template_failed: '양식 삭제실패',
	deleted_note_completed: '메모 삭제 완료',
	deleted_note_failed: '메모 삭제 실패',
	detail: '상세',
	detail_address: '상세주소',
	display_deadline: '표시가한',
	display_related_setting: '배정관련 설정',
	displays_a_new_reservation_within_the_set_time: '설정된 시간 내의 새로운 예약을 표시합니다.',
	division: '구분',
	do_copy: '복제하기',
	do_create: '생성하기',
	do_delete: '삭제하기',
	do_modify: '수정하기',
	do_question: '문의하기',
	do_you_want_request_making_homepage: '홈페이지 제작을 신청하시겠습니까?',
	domitory: '도미토리',
	dont_send: '발송안함',
	download: '다운로드',
	eamil: '이메일',
	enter_room_type_name: '방타입명을 입력해주세요.',
	exit_room_settings: '방설정 끝내기',
	expire_date: '만료일',
	failt_to_change_house: '숙소변경 실패',
	female: '여',
	female_gender: '여성',
	file: '파일',
	find_destination: '대상찾기',
	free_experience: '무료체험',
	fri: '금',
	fullRoom: '만실',
	gender: '성별',
	go_back: '돌아가기',
	go_back_to_home: '홈으로 돌아가기',
	go_to_set: '설정하러 가기',
	good_status: '정상',
	goto_create_roomType: '방타입 생성하러가기',
	goto_reservation_list: '예약목록 보기',
	graph_shape: '그래프 형태',
	group_notification: '단체알림',
	guest: '게스트',
	guestHouse: '게스트하우스',
	have_a_bright_day_sir: '오늘도 밝은 하루 보내세요',
	heavy_type_layout: 'heavy 타입 레이아웃',
	home: '홈',
	homepage_application_date: '홈페이지 신청일시',
	homepage_complete_estimated_date: '홈페이지 신청일시',
	homepage_develope_status: '홈페이지 작업 현황',
	homepage_manual: '홈페이지 메뉴얼',
	host: '호스트',
	hostel: '호스텔',
	hotel: '호텔',
	houseName: '숙소명',
	house_address: '숙소주소',
	house_delete_completed: '숙소삭제 완료',
	house_delete_failed: '숙소삭제 실패',
	house_info: '숙소정보',
	house_reservation: '숙소 예약',
	house_setting_completed: '숙소설정 완료',
	house_setting_failed: '숙소 설정 실패',
	house_type: '숙소타입',
	if_there_is_a_new_reservation_the_new_reservation_will_be_displayed_without_refreshing_the_screen:
		'새로운 예약이 있다면 새로운 예약을 화면에 새로고침 없이 나타냅니다.',
	if_tou_enable_auto_send_msg_msg_will_send_autoMetically: '자동 발신을 해두시면해당 메세지는 설정된 상황에 맞게 자동으로 발송됨니다.',
	if_you_choose_wrong_size_product_to_house_service_can_be_stop: '규모에 맞지 않는 숙소를 선택하실 경우에 서비스가 중지 될수 있습니다.',
	if_you_have_problems_with_computer_performance_and_frequent_screen_updates_try_setting_a_higher_pooling_frequency:
		'컴퓨터 성능 및 잦은 화면 업데이트에 문제가 있을경우 풀링주기를 높게 설정해보세요.',
	if_you_violate_the_accommodation_policy_your_personal_information_will_be_saved_with_the_violation:
		'숙박 규정을 위반할 시 위반내용과 함께 개인정보가 저장됩니다.',
	index: '번호',
	information_does_not_exist: '정보가 존재하지 않습니다...',
	input_your_name_please: '이름을 입력해주세요.',
	input_your_password_please: '비밀번호를 입력해주세요.',
	inquire_separately: '별도문의',
	invalid_password: '잘못된 패스워드입니다.',
	is_apply_homepage: '홈페이지 신청여부',
	is_auto_send_enable: '자동발신 활성화 여부',
	is_layout_paied: '레이아웃 비용 지불여부',
	is_selected_info_collect: '선택 정보가 맞나요?',
	item: '항목',
	keep_noti: '계속 알림',
	lang_set: '언어설정',
	language_setting: '언어설정',
	layout_cost: '레이아웃 비용',
	left_days: '남은일수',
	light_type_layout: 'light 타입 레이아웃',
	logOut: '로그아웃',
	logOut_complete: '로그아웃 완료',
	login: '로그인',
	login_complete: '로그인 완료',
	make_payment: '결제하기',
	make_reservation: '예약하기',
	male: '남',
	male_gender: '남성',
	manual: '메뉴얼',
	manual_download_complete: '메뉴얼 다운로드 완료',
	mark_new_reservation: '새로운 예약을 표시합니다.',
	memo: '메모',
	memo_content: '메모내용',
	memo_save_completed: '메모 저장완료',
	memo_save_failed: '메모 저장실패',
	menu_enable_set: '메뉴 사용 설정',
	menu_set: '메뉴설정',
	method_of_payment: '결제수단',
	minute: '분',
	mobile_phone_verification_completed: '휴대폰 인증완료',
	mobile_phone_verification_failed: '휴대폰 인증실패',
	mobile_phone_verification_number: '휴대폰 인증번호',
	modify: '수정',
	mon: '월',
	money_unit: '원',
	month: '월',
	month_sales: '월매출',
	motel: '모텔',
	msg: '메세지',
	msg_content: '문자내용',
	name: '이름',
	name_is_not_valid: '올바른 이름이 아닙니다.',
	new: 'new',
	new_booking: '새로운예약',
	next: '다음',
	nextResv: '다음 예약 ',
	no: '아니요',
	no_choosen_option: '선택사항이 없습니다.',
	no_house_currently_created: '현재 생성된 숙소가 없습니다.',
	no_notes_are_currently_created: '현재 작성된 메모가 없습니다.',
	no_notifications: '알람이 없습니다.',
	no_room_selected: '선택된방이 없습니다.',
	non_members: '비회원',
	none: '없음',
	none_limit_gender: '제한없음(혼숙O)',
	none_product: '상품없음',
	normal_price: '정상가',
	not_a_valid_email: '올바른 이메일이 아닙니다.',
	not_a_valid_mobile_number: '올바른 휴대폰 번호가 아닙니다.',
	not_a_valid_name: '올바른 이름이 아닙니다.',
	not_a_valid_password: '올바른 비밀번호가 아닙니다.',
	not_a_valid_phoneNumber: '올바른 휴대폰 번호가 아닙니다',
	not_agree: '동의안함',
	not_use: '사용안함',
	note_updated: '메모 업데이트 완료',
	note_updated_failed: '메모 업데이트 실패',
	noti_level: '알람 중요도',
	noti_msg: '알림내용',
	noti_period: '알람 기간',
	noti_setting: '알람 설정',
	noti_target: '알림 대상',
	noti_title: '알림 제목',
	nth: '순위',
	only_on_first_purchase: '첫구매시에만 발생',
	// delete 1.0.1: only_remove_that_guest: "해당 게스트만 제거",
	opps_something_problem_happend: '이런! 문제가 발생했습니다.',
	others_booked_by_the_reservation_will_not_be_erased: '해당 예약자가 예약한 다른 인원들은 지워지지 않습니다.',
	outgoing_destination: '발신대상',
	page: '페이지',
	page_does_not_exist: '페이지가 존재하지 않습니다.',
	password: '비밀번호',
	password_condition: (special: any, length: any, enAndNumber: any) => (
		<span>
			* <span className={special ? 'JDtextColor--point' : ''}>특수문자 1개이상</span>
			,<span className={length ? 'JDtextColor--point' : ''}>7~15자리</span>,
			<span className={enAndNumber ? 'JDtextColor--point' : ''}>영문 숫자 조합</span>
		</span>
	),
	password_is_not_matched: '패스워드 확인이 일치하지 않습니다.',
	passwords_do_not_match: '패스워드가 일치하지 않습니다.',
	pay_cancel: '결제취소',
	payment_canceled: '결제가 취소 되었습니다.',
	payment_info: '결제정보',
	payment_status: '결제상태',
	paymethod: '결제방법',
	pension: '펜션',
	person_unit: '명',
	personnel: '인원/객실',
	phoneNum_is_not_valid: '올바른 이름이 아닙니다.',
	phoneNumber: '전화번호',
	phone_authenticate: '휴대폰 인증하기',
	please_agree_collect_personal_info: '개인정보 수집에 동의해주세요',
	please_aree_to_info_offer: '정보제공 동의를 해주세요',
	please_cancel_the_product_first: '상품을 먼저 해지 해주세요.',
	please_create_house: ' 숙소를 생성해주세요.',
	please_enter_a_base_price: '기본가격을 입력바랍니다.',
	please_enter_booker_name: '예약자명을 입력해주세요',
	please_enter_phone_number: '전화번호를 입력해주세요.',
	please_enter_the_name_of_the_house: '숙소명을 입력해주세요.',
	please_enter_your_phone_number: '전화번호를 입력해주세요.',
	please_input_HM_title: 'AI 무인 솔루션 타이틀을 입력해주세요',
	please_inquire_separately: '별도 문의 바랍니다.',
	please_request_through_helpline: '상담전화를 통해 요청바람니다.',
	please_search_house_location: '숙소위치를 검색해주세요.',
	please_select_a_payment_method: '결제방법을 선택해주세요.',
	please_select_a_payment_status: '결제상태를 선택해주세요.',
	please_select_checkOut_date: '체크아웃 날짜를 선택해주세요.',
	please_select_date: '날짜를 선택해 주세요',
	please_select_reservation_status: '예약상태를 선택해주세요.',
	please_select_the_accommodation_type: '숙소타입을 선택 해주세요.',
	please_select_the_number_of_people: '객실/인원을 선택해주세요.',
	please_slect_date_at_calender: '달력에서 날짜를 선택해주세요.',
	please_specify_the_date: '날짜를 지정해주세요.',
	polling_period: '풀링주기',
	polling_period_setting: '풀링주기 설정',
	preferences: '환경설정',
	prev: '이전',
	preview: '미리보기',
	price: '가격',
	price_setting: '가격설정',
	price_setting_complited: '가격설정 완료',
	price_setting_delete: '가격설정 삭제',
	price_setting_delete_fail: '가격설정 삭제 실패',
	price_setting_failed: '가격설정 실패',
	priority: '우선순위',
	priority_change_fail: '순위 변경 실패',
	priority_changed: '순위 변경',
	privacy_item: '개인정보 항목',
	proceeding: '진행중',
	product1_detail1: '상품을 구매하기전에 체험하기를 통해서 미리 체험해보세요.',
	product1_detail2: '본상품은 구매전 체험을 위한 용도로 사용됩니다.',
	product1_detail3: '잔다에서 무료로 제공하는 홈페이지를 제공받으실수 없습니다.',
	product1_detail4: '대부분의 서비스를 사용가능하며 이주일후에는 사용이 불가능 합니다.',
	product1_detail5: '기한이 끝난후에 새로운 상품을 적용하시면 계속 사용이 가능합니다.',
	product1_short1: '이주일간 테스트가능',
	product1_short2: '사용해보고 결정하세요',
	product1_short3: '지금 바로 시작할 수 있습니다.',
	product2_detail1: '게스트 하우스 및 중소숙박에 최적화된 상품입니다.',
	product2_detail3: '잔다에서 무료로 제공하는 홈페이지를 제공받으실수 있습니다.',
	product2_detail4: '사용기한은 한달이며 한달후 재결제가 이루어집니다.',
	product2_short1: '중소숙박 최적화 서비스',
	product2_short2: '필요한 서비스만 쉽고',
	product2_short3: '간단하게 사용하세요.',
	product3_detail1: '호텔 같은 큰규모에 적합한 상품.',
	product3_detail3: '잔다에서 무료로 제공하는 홈페이지를 제공받으실수 있습니다.',
	product3_detail4: '홈페이지 커스텀 제작을 요청하실수 있으며, 별도 비용이 발생할수 있습니다.',
	product3_detail5: '사용기한은 한달이며 한달후 재결제가 이루어집니다.',
	product3_short1: '호텔 대규모 솔루션 최적화',
	product3_short2: '호텔관리자가 관여하여',
	product3_short3: '다양한 서비스를 제공합니다.',
	product4_short1: '숙박외 서비스 예약 및',
	product4_short2: '다른 예약관리가 필요하신가요?',
	product4_short3: '이상품을 선택하세요.',
	product_application_completed: '상품 적용 완료',
	product_application_failed: '상품 적용 실패',
	product_has_expired: '상품이 만료되었습니다.',
	product_memo: '상품 메모',
	product_price: '상품금액',
	provides_a_tab_that_can_be_divided_by_status_in_the_assignment_calendar: '배정달력에서 방태입별로 나누어볼수있는 탭을 제공',
	purpose_of_collection: '수집 목적',
	receiver: '수신자',
	release_service: '서비스 해제',
	remove_all_reservations_booked_together: '함께 예약된 모든 예약 인원 제거',
	remove_roomType_completed: '방타입 삭제성공',
	remove_roomType_fail: '방타입 삭제실패',
	rep_color: '대표색상',
	request_url: '요청URL',
	reservation_confirm: '예약확인',
	reservation_creation_complete: '예약 생성 완료',
	reservation_creation_fail: '예약 생성 실패',
	reservation_date: '예약일자',
	reservation_delete_complete: '예약 삭제 완료',
	reservation_delete_fail: '예약 삭제 실패',
	reservation_did_date: '예약일시',
	reservation_information: '예약정보',
	reservation_is_completed: '예약이 완료되었습니다',
	reservation_lookup: '예약조회',
	reservation_mark: '예약표시',
	reservation_memo: '예약메모',
	reservation_setting: '예약 설정',
	reservation_update: '예약 업데이트',
	reservation_update_fail: '예약 업데이트 실패',
	reservations_booked_directly_by_the_administrator_are_not_displayed: '관리자가 직접 예약한 예약은 표시되지 않습니다.',
	retention_period: '보유 기간',
	room: '방',
	roomForm: '방형태',
	roomPic: '방사진',
	roomType: '방타입',
	room_block_release: '방막기 해제',
	room_block_release_fail: '방막기 해제 실패',
	room_config: '방 설정',
	room_count: '객실수',
	room_create_completed: '방 생성완료',
	room_create_fail: '방 생성실패',
	room_delete_completed: '방 삭제완료',
	room_delete_fail: '방 삭제실패',
	room_gender: '방성별',
	room_info: '객실정보',
	room_name: '방이름',
	room_name_must_be_10_characters_or_less: '방이름은 10자 이하여야합니다.',
	room_select: '방 선택',
	room_setting: '방설정',
	room_type_basic_price: '방 기본가격',
	room_type_desc: '방타입 추가설명',
	room_type_name: '방타입 이름',
	room_type_tab: '방타입별 탭',
	room_update: '방 업데이트',
	room_update_fail: '방 업데잍 실패',
	row: '열',
	sales: '매출',
	sales_statistics: '매출통계',
	sat: '토',
	save: '저장하기',
	search: '검색',
	search_reservation: '예약 검색하기',
	season: '시즌',
	season_basic_price: '시즌 기본 가격',
	season_name: '시즌명',
	season_period: '시즌기간',
	second: '초',
	select: '선택',
	select_date: '날짜선택',
	select_house_type: '숙소타입 선택',
	select_roomGender: '방성별 선택',
	select_roomType: '방타입 선택',
	select_service: '서비스 선택',
	select_support_language: '지원 언어 선택',
	select_the_desired_setting_item: '원하는 설정 항목을 선택하세요.',
	selection_information_is_correct: '선택 정보가 맞습니다.',
	send: '전송',
	sendSMS: '문자전송',
	send_complete: '송신완료',
	send_fail: '송신실패',
	send_notification: '알림 보내기',
	send_sms: '문자발신',
	send_sms_complited: 'SMS 발송완료',
	send_sms_failed: 'SMS 발송실패',
	send_status: '발신상태',
	send_target: '발신대상',
	host_slash_guest: '호스트/게스트',
	send_text_to_host: '호스트에게 문자 보내기',
	send_type: '발신타입',
	seperatle_gender: '제한없음(혼숙X)',
	server_will_check_if_there_is_a_new_reservation_once_every_set_number_by_ms:
		'설정한 숫자/ms 마다 한번씩 새로운 예약이 있는지 서버로부터 확인받습니다.',
	service_request_is_completed: '서비스 신청이 완료되었습니다',
	set_daily_price: '일별가격 설정',
	set_product_type: '상품 형태 설정',
	setting_fail: '설정실패',
	signUp: '회원가입',
	signup_complted: '회원가입 완료',
	signup_submit: '가입완료',
	six_months_after_stay: '숙박후 6개월',
	smooth_reservation_management: '원활한 예약 관리',
	sms_history: 'SMS 내역',
	sms_setting: 'SMS설정',
	sms_template: '문자 양식',
	someone_is_making_a_reservation: '누군가 예약을 진행중 입니다.',
	start_experience: '체험시작',
	statistical_transformation: '통계 변환',
	statistics: '통계',
	status: '상태',
	stop: '정지',
	sun: '일',
	support: '지원함',
	system_config: '시스템 설정',
	system_related_settings: '시스템 관련 설정',
	take_a_look: '살펴보기',
	template_msg: '양식 메세지',
	template_title: '양식 타이틀',
	template_setting: '양식 설정',
	test_on_two_weeks: '이주일간 테스트 가능',
	thank_you: '감사합니다.',
	the_current_product_has_expired_normal_service_is_not_possible_Please_proceed_with_the_payment:
		'현재 상품이 만료되었습니다. 정상적인 서비스가 불가능합니다. 결제를 진행 해주세요.',
	the_email_set_is_not_valid: '설정된 이메일이 유효하지 않습니다.',
	the_max_count_of_houseName_is_20: '숙소명은 최대 20글자 입니다.',
	the_memo_gives_an_alarm_on_the_next_connection: '해당 메모는 다음 접속시 알람을 줍니다.',
	the_minimum_personal_information_required_to_provide_the_service_is_required_to_use_the_service:
		'서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실수 있습니다',
	the_phone_number_set_is_not_valid: '설정된 전화번호가 유효하지 않습니다.',
	there_is_an_alarm_set_note: '알람 설정된 메모가 있습니다.',
	there_is_no_room_in_selected_date: '해당날짜에 예약가능한 방이 없습니다',
	this_month_sales: '이번달매출',
	this_price_modification_will_be_the_highest_priority_of_all_pricing: '해당 가격 수정은 모든 가격설정 중 최우선 적용 됩니다.',
	thu: '목',
	till: '까지',
	time: '시간',
	timeout_please_request_again: '시간초과 다시 요청 해주세요.',
	todat_sleep_people: '오늘 숙박 인원',
	today: '오늘',
	today_checkIn_people: '오늘 체크인 인원',
	today_sales: '오늘매출',
	tomorrow_checkIn_people: '내일 체크인 인원',
	total_price: '총가격',
	transmission_time: '전송시간',
	try_to_create_in_SMS_settings: 'SMS 설정에서 생성 해보세요.',
	tue: '화',
	turn_off_alarm: '알림해제',
	unPaid: '미결제',
	unSupport: '지원안함',
	un_choosen: '선택안함',
	un_send_Sms: '발신안함',
	unapplied: '적용안됨',
	unappliy: '적용해제',
	update_complete: '업데이트 완료',
	update_fail: '업데이트 실패',
	update_profile: '프로필 업데이트',
	update_profile_fail: '프로필 업데이트 실패',
	update_roomType_completed: '방타입 업데이트 성공',
	update_roomType_fail: '방타입 업데이트 실패',
	update_template_completed: '양식 업데이트 완료',
	update_template_failed: '양식 업데이트 실패',
	update_to_recommended_browser_chrome: '권장 브라우저(Chrome)로 업데이트',
	upgrade: '업그레이드',
	url_is_copied: 'URL이 복사되었습니다.',
	usage_amount: '이용금액',
	use: '사용하기',
	use_color_setting_function: '색상 설정 기능',
	useing: '사용중',
	username_must_be_email: '아이디는 이메일 이여야합니다.',
	using: '사용중',
	view_SMS_history: 'SMS 내역보기',
	view_info: '정보보기',
	view_terms: '약관보기',
	waiting: '대기',
	we_collect_your_personal_information_to_provide_the_service: '서비스 제공을 위해 귀하의 개인정보를 수집합니다.',
	we_recommend_using_the_Chrome_browser_before_using_the_app: '앱사용 이전에 크롬 브라우저 사용을 권장합니다.',
	we_will_contect_you_in_3_days: '3일 내로 담당자가 연락드릴 예정입니다.',
	wed: '수',
	when_day_of_week_price_is_not_setted_basic_season_price_will_be_used: '"요일별 가격"이 적용되어 있지 않은 요일에는 시즌 기본가격을 따릅니다.',
	when_season_multiple_applyed_use_left_side_value_will_be_used: '시즌이 중첩된 있는 동안에는 좌측 시즌 가격을 사용합니다',
	which_unit_would_you_like_to_see: '어떤 단위로 보여 드릴까요?',
	will_only_use_the_reservation_system: '예약시스템만 사용하겠습니다.',
	witch_statistics_do_you_want: '어떤 통계를 원하시나요?',
	write_a_description_of_the_menu: '해당 메뉴의 설명을 적어보세요.',
	year: '년',
	year_sales: '년매출',
	yes: '예',
	you_can_clear_the_display_by_clicking: ' 클릭하여 해당 표시를 지울 수 있습니다',
	your_request_cannot_be_fulfilled_right_now: '지금은 요청사항을 수행수 없습니다.',
	youth_hostel: '유스호스텔',
	please_verify_your_mobile_phone_to_ensure_smooth_service: (
		<span>
			원활한 서비스진행을 위해 <br /> 핸드폰 인증을 해주세요.
		</span>
	),
	F_selected_product_apply_to_house: (houseName: any) => (
		<span>
			* 선택하신 서비스는 숙소
			<span className="JDtextColor--point">{` ${houseName} `}</span>에 적용됩니다.
		</span>
	),
	F_well_come_text: '환영합니다.',
	F_have_x_days_left_to_try_for_free: (daysLeftToExpire: string) => `서비스 종료 까지 ${daysLeftToExpire} 남았습니다.`,
	F_user_name_hello: (userName: any) => `${userName}님 안녕하세요.`,
	F_user_name_good_luck: (userName: any) => `${userName}님 좋은 일 가득하길 기원합니다.`,
	F_user_name_have_a_bright_day: (userName: any) => `${userName}님 오늘도 힘찬 하루 되세요.`,
	F_have_house_count_n: (n: any) => `숙소 ${n}개 보유중`,
	F_you_have_x_free_trial_left_y__is_about_to_expire: (daysLeftToExpire: any, expireDate: any) =>
		`무료 테스트 기간이 ${daysLeftToExpire} 남았습니다. ${expireDate} 만료예정.`,
	F_product2_detail2: (n: any) => `해당 상품은 방갯수가 ${n}개 이하인 숙소에 적합합니다.`,
	F_product3_detail2: (n: any) => `해당 상품은 방갯수가 ${n}개 이하인 숙소에 적합합니다.`,
	the_price_is_too_low_are_you_sure_to_set_this_price: (
		<span>
			가격이 1000원 이하입니다. <br />
			정말설정하실려는 가격이 맞나요?
		</span>
	),
	house_create: (
		<span>
			숙소
			<Mbr />
			생성
		</span>
	),
	product_registration: (
		<span>
			상품
			<Mbr />
			등록
		</span>
	),
	this_is_an_old_browser_Problems_may_occur_while_using_the_service_Please_update_your_browser: (
		<span>
			오래된 브라우저 입니다. 서비스 이용중 문제가 발생할수 있습니다. <br /> 브라우저를 업데이트 해주세요.
		</span>
	),
	automatically_send_prompts_to_your_guests: (
		<span>
			게스트에게 안내문자를
			<Mbr />
			자동 발송해 보세요.
		</span>
	),
	roomType_dose_not_exsist: (
		<span>
			방타입이 <Mbr /> 존재하지 않습니다.
		</span>
	),
	additionaly_setting_to_will_good_for_manage_ment: (
		<span>
			추가로 다음과 같은 설정을 해두시면 <Mbr /> 숙소운영에 도움이 될거에요!
		</span>
	),
	default_setting_is_compelted: (
		<span>
			기본설정이
			<Mbr /> 완료 되었습니다.
		</span>
	),
	make_it_easy_to_guide_accommodation_for_guests: (
		<span>
			게스트에게 숙소 이용 <Mbr />
			안내를 편리하게 해보세요.
		</span>
	),
	try_setting_it_up_different_prices_by_date: (
		<span>
			날짜별로 가격을 다르게
			<Mbr /> 설정해보세요.
		</span>
	),
	// 🔻 new
	monthly_fee: '월요금',
	TODAY_STAY: '오늘 머무르는 인원',
	TODAY_CHECKIN: '오늘 체크인하는 인원',
	TOMORROW_CHECKIN: '내일 체크인하는 인원',
	EXSIST_INFO: '선택한 인원',
	service_expire: '서비스 만료',
	RoomGender: {
		FEMALE: '여성전용',
		MALE: '남성전용',
		ANY: '성별 제한 없음',
		SEPARATELY: '혼숙방지'
	},
	december: '12월',
	november: '11월',
	october: '10월',
	september: '9월',
	august: '8월',
	july: '7월',
	june: '6월',
	may: '5월',
	april: '4월',
	march: '3월',
	february: '2월',
	january: '1월',

	copy_hm_page_URL: 'AI 무인 솔루션 URL 복사',
	HM_update: 'AI 무인 솔루션 업데이트',
	HM_update_fail: 'AI 무인 솔루션 업데이트 실패',
	// 1.0.1 add
	un_checkIn: '미입실',
	PaymentStatus: {
		CANCELED: '결제취소',
		NOT_YET: '미결제',
		COMPLETED: '결제완료'
	},
	SendTarget: {
		BOTH: '게스트&호스트',
		GUEST: '게스트',
		HOST: '호스트'
	},
	please_select_pay_status: '결제 상태를 선택해 주세요.',
	exit_house_settings: '숙소설정 끝내기',
	none_data: 'no data',
	dontSMS: '전송안함',
	hm_page_URL: 'AI 무인 솔루션 URL',
	move_hm_page: 'AI 무인 솔루션 페이지로 이동',
	reservation_page_URL: '예약페이지 URL',
	move_reservation_page: '예약페이지 이동',
	reservation_creation_complete_for_guest: '예약이 완료 되었습니다.',
	reservation_creation_fail_for_guest: '예약 생성 실패',
	price_priority: '*우선 적용순위: 방타입 기본가격 < 시즌기본가격 < 시즌 요일별가격 < 일별 가격',
	reference_fail: '조회실패',
	reference_success: '조회성공',
	funnels: '유입경로',
	see_all: '전체보기',
	Funnels: {
		AGODA: '아고다',
		AIRBNB: '에어비앤비',
		BOOKING_COM: '부킹닷컴',
		COOPANG: '쿠팡',
		ELSE_CHANNEL: '기타채널',
		FREINDS: '지인예약',
		HOMEPAGE: '홈페이지',
		NAVER: '네이버',
		PHONE_CALL: '전화예약',
		WALK_IN: '현장예약',
		YANOLJA: '야놀자',
		YEOGIEOTTAE: '여기어때'
	},
	goto_today: '오늘 날짜로',
	// 1.1.0 패치
	email: '이메일',
	find_email: '이메일 찾기',
	get_temporary_password: '임시 비밀번호 받기',
	temp_password: '임시 비밀번호',
	copied_to_clipboard: '클립보드에 복사됨',
	current_password: '기존 패스워드',
	password_resset: '비밀번호 재발급',
	password_rewrite: '비밀번호 재설정',
	password_resset_completed: '임시 비밀번호로 변경 되었습니다.',
	password_resset_failed: '비밀번호 발급이 실패했습니다.',
	get_email_bt_msg: '문자로 이메일 받기',
	change_password_complete: '비밀번호 변경 완료',
	change_password_failed: '비밀번호 변경 실패',
	new_password: '새로운 패스워드',
	card_resist: '카드등록',
	card_number: '카드번호',
	check_product: '상품 확인',
	register: '등록 하기',
	exp_year: '기한/년',
	exp_month: '기한/월',
	card_regist_complete_fail: '카드 등록 실패',
	card_regist_complete: '카드 등록 완료',
	payment_regist_complete: '결제 등록 완료',
	registration_confirmation: '등록 확인',
	input_information: '정보 입력',
	input_card_information: '카드정보 입력하기',
	idnumber_6front: '주민등록번호 앞(6자리)',
	idnumber_or_business_number: '주민번호/사업자번호',
	card_pasword_front_two_digits: '비밀번호 앞 2자리',
	completing_this_card_registration_you_agree_to_the: '이 카드정보를 등록함으로서 당신은 다음에 동의합니다.',
	please_rewrite_your_new_password: (
		<span>
			비밀번호를 재발급 받으셨군요
			<br />
			새로운 비밀번호를 설정 해주세요.
		</span>
	),
	use_conditions: '이용 조건',
	privacy_policy: '가격 정책',
	and: '그리고',
	member_ship: '멤버쉽',
	create_memo: '메모쓰기',
	host_memo: '호스트 메모',
	guest_memo: '게스트 메모',
	write: '작성',
	no_guest_notes_after_today: '오늘자 이후로 작성된 게스트 메모가 없습니다.',
	update: '업데이트',
	create: '생성하기',
	house_front_img: '하우스 대표 이미지',
	house_title: '하우스 타이틀',
	info_img: '안내 이미지',
	info_txt: '안내 텍스트',
	current_config_lang: '현재 설정 언어',
	solution_usage_guide: '솔루션 이용안내',
	payment_information: '납부정보',
	member_name: '회원명',
	regi_date: '등록일자',
	product_info: '상품정보',
	deposit_card_owner: '예금(카드)주명',
	pay_regist_complete_title: (
		<span>
			JANDA SOLUTION <br />
			정기결제가 등록되었습니다.
		</span>
	),
	pay_regist_complete_text:
		'정기결제 정보가 다르거나 결제정보를 변경을 원하시면 잔다솔루션에 Mypage에서 변경을 하시면 됩니다. 만약 해당 결제를 본인이 하신게 아니시면 고객센터(support@stayjanda.com)로 이메일을 보내주세요.',
	card_regist_complete_message: (
		<span>
			카드 정보가 등록 되었습니다.
			<TextButton color="primary">MYPage</TextButton> 에서 그 내용을 확인하실수 있습니다"
		</span>
	),
	pay_with_this_card: '이카드로 정기결제 등록',
	static_page_desc: '매출에 관한 통계를 확인할수 있습니다. 표기할 날짜와 기한을 설정하여 그사이에 매출을 확인할 수 있습니다.',
	assigTimeline__decs: '배정달력에서 게스트들을 원하는 방에 배정할수 있습니다.',
	JANDA_home: 'JANDA 홈',
	JANDA_home_desc: '현 대쉬보드에서 오늘날짜에 관한 배정 현황을 확인할수 있습니다.',
	bookingList__desc: '예약에 관한 내용을 날짜순으로 나타냅니다.',
	price_setting__desc: '날짜별 가격 혹은 기간별 가격을 설정할수 있습니다. 해당날짜에 해당가격이 되도록 조정해보세요.',
	lang_use_set: '언어 사용설정',
	HM_set__desc: (
		<span>
			AI 무인 솔루션은 게스트가 쉽고 편하게 숙소를 이용할 수 있도록 안내 페이지를 송신합니다. <br />
			AI 무인 솔루션이 게스트의 숙소 이용법을 설명하는 수고를 덜어 줄겁니다.
		</span>
	),
	user_info: '회원정보',
	periodicalPay_manage: '정기결제 관리',
	product_change: '상품변경',
	periodical_pay_regist_complete: '정기결제 등록 완료',
	periodical_pay_regist_fail: '정기결제 등록 실패',
	sign_date: '등록 일자',
	change_periodical_change: '정기결제 정보 변경',
	payment_fee: '납부요금',
	approved: '승인완료',
	excel_express: '엑셀출력',
	express_info: '출력정보',
	express_count: '출력갯수',
	bill_pay_cancle: '정기 결제 취소',
	bill_pay_cancle_complete: '정기 결제 취소 완료',
	bill_pay_cancle_fail: '정기 결제 취소 실패',
	on_testing: '테스트 사용중',
	un_registed: '적용안됨',
	uploade_compelte: '업로드 완료',
	uploade_fail: '업로드 실패',
	HM_detail_info: 'AI 무인 솔루션 상세정보',
	ExcelExpress: {
		SELECT_OP: '현재 선택한 내용으로 출력',
		COUNT_OP: '최근 생성 갯수로 출력',
		DATE_OP: '날짜로 출력'
	},
	unit: '개',
	pay_date: '납부일자',
	bill: '영수증',
	need_regist: (
		<TextButton className="JDstandard-margin0" color="error">
			등록필요
		</TextButton>
	),
	go_to_sms_template: 'SMS 양식 바로가기',
	how_to_save_sms_template_title: 'SMS양식 저장하는 방법',
	how_to_save_sms_template_doc: (
		<JDlist
			marginBottom="long"
			contents={[
				<div>
					1. <b>SMS양식</b> 메뉴에서 <b>[양식생성]</b>을 클릭합니다.
				</div>,
				<div>
					2. 양식생성 화면에서 타이틀과, 메시지를 입력하시고 메시지화면에서 중간 중간에 생성할
					<b>숙박일자/숙박정보/예약자명/가격/결제방법/결제상태/AI 무인 솔루션URL</b>
					문구를 아래에 <b>양식메시지</b>에서 클릭하시면 메시지 발송시에 자동으로 정보가 입력됩니다.
				</div>,
				<div>
					<PhotoFrame
						src={`https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/booking_app/describe/smsinfo_img_01.png`}
					/>
				</div>,
				<div>
					3. 자동발신 상태를 <b>예약취소시/예약생성시/예약생성시(미결제)/예약업데이트시</b> 별로 선택하여 설정하고
				</div>,
				<div>
					4. 발신대상을 <b>게스트/호스트/게스트+호스트</b> 별로 지정을 해주시고 우측에 <b>자동발신 활설화</b> 여부를 on / oFF 설정해주시면 언제든지 고객에게 알림 문자가 발송되게 설정됩니다
				</div>
			]}
		/>
	),
	how_to_send_sms_for_all_title: '단체SMS 보내는 방법',
	how_to_send_sms_for_all_doc: (
		<JDlist
			marginBottom="long"
			contents={[
				<span>
					1. 단체SMS는 솔루션 메인화면과 예약목록 화면에서 가능합니다.
					<b>메인화면</b>에서는 오늘의 예약리스트 상단에 <b>‘단체메시지’</b> 버튼을 클릭하셔야 보낼 수 있고, <b>예약목록</b> 화면에서는 내가 원하는 예약자를 선택하여 리스트 상단에{' '}
					<b>‘문자전송’</b>버튼을 클릭해서 여러명에게 단체문자를 보낼 수 있습니다.
				</span>,
				<div>
					2. 그러나 단체SMS를 보내기 위해서는 <b>SMS양식</b>화면에서 미리 만들어 둔 SMS양식이 있어야 합니다. 개성있고 재밌는 SMS양식을 만들어주세요. 예시 : 조식알림문자, 저녁 파티이벤트 안내
					문자, 공사안내, 분실물안내, 긴급대피안내문자
				</div>
			]}
		/>
	),
	sms_usage: 'SMS 이용법',
	sms_service: 'SMS 서비스',
	credit: '신용',
	expiration_date: '유효기한',
	add_card: '카드추가',
	please_input_card_info: '카드정보를 입력해 주세요.',
	add_card_dec: '빠르고 간편한 결제를 위해 카드를 등록해주세요.',
	card_info: '카드정보',
	card_delte_complete: '카드 삭제 성공',
	card_info_complete_fail: '카드 삭제 실패',
	periodical_cancel_complete: '정기결제 취소 완료',
	periodical_cancel_complete_fail: '정기결제 취소 실패',
	card_regist: '카드 등록',
	card_delete: '카드 삭제',
	bill_pay_regist: '정기 결제 등록',
	bill_pay_regist_width_this_card: '이 카드로 정기결제 등록',
	bill_pay_regist_change_width_this_card: '이 카드로 정기결제 변경',
	un_exsist_page: '존재 하지않는 페이지',
	sms_info: 'SMS 안내',
	sms_info_decs: 'SMS 이용에대한 안내 드립니다.',
	un_exsist_page_decs: (
		<span>
			존재 하지않는 페이지 입니다.
			<br /> 뒤로가기를 눌러주세요.
		</span>
	),
	mypage: 'MY PAGE',
	solution_specification: '솔루션 명세서',
	noti_config: '알람설정',
	memo_manage: '메모관리',
	house_detail_config: '하우스 세부설정',
	frequent_questions: '자주하는 질문',
	mypage_profile_desc: '회원정보를 수정할수 있습니다.',
	mypage_houses_desc: '보유중인 숙소를 관리할수 있습니다.',
	show_detail: '자세히보기',
	basic_config: '기본설정',
	guestStatus_mark: '게스트 상태 마크',
	shortkey_config: '키보드 설정',
	change_pay_method: '결제수단변경',
	un_validate_card_number: '유효하지 않은 카드번호 입니다.',
	un_validate_card_expire: '유효 하지 않은 카드 기한입니다.',
	periodical_paying: '정기결제중',
	creadit_card_change: '결제 카드 변경',
	select_this_card: '이 카드로 진행하기',
	pay_history: '결제 내역',
	there_is_no_card: '등록된 카드가 존재하지 않습니다.',
	no_card: '카드 없음',
	HouseType: {
		GUEST_HOUSE: '게스트하우스',
		HOTEL: '호텔',
		MOTEL: '모텔',
		PENSION: '펜션',
		HOSTEL: '호스텔',
		YOUTH_HOSTEL: '유스호스텔'
	},
	please_select_room_gender: '방성별을 선택 해주세요.',
	please_select_room_type: '방타입을 선택 해주세요.',
	please_input_max_people_count: '최대인원수를 입력 해주세요.',
	room_assig_info: '방/배정 정보',
	else: '기타',
	check_init: '생성확인',
	timeline_config: '타임라인설정',
	mypage_desc: '정기결제에 대한 관리 및 생성한 숙소와 유저 프로필을 확인할 수 있습니다.',
	room_config_desc: '숙소를 운영하는데 필요한 방타입 및 방을 생성 및 수정하세요.',
	HouseStatus: {
		DISALBE: '중지',
		WAIT: '대기',
		ENABLE: '사용가능'
	},
	update_user_info_complete: '슈퍼 관리자 업데이트 완료',
	update_user_info_fail: '슈퍼 관리자 업데이트 실패',
	server_dose_not_respond: '서버가 응답하지 않습니다.',
	network_connected: '네트워크에 연결되었습니다.',
	periodical_payment_is_changed: (houseName: string, flag?: boolean) =>
		`${houseName}의 정기결제가 ${flag ? '등록' : '중지'}되었습니다.`,
	request_is_failed: '요청이 실패했습니다.',
	product_regist_complete_message: '상품등록이 완료 되었습니다.',
	select_product_desc: '상품을 등록할때 카드정보를 입력받습니다. 만료기간이 끝나면 자동적으로 결제를 진행합니다.',
	please_check_file_has_special_char: '파일에 특수문자가 있는지 검사 해주세요.',
	room_start_number: '방시작 번호.',
	assig_info: '배정정보',
	people_and_room_info: '인원 및 방정보',
	to_next: '다음으로',
	payment_completed: '결제가 완료 되었습니다.',
	payer: '결제자',
	payment_amt: '결제금액',
	payment_date: '결제일자',
	move_to_check_page: '예약 확인 페이지로 이동합니다.',
	please_upload_image: '이미지를 업로드 해주세요.',
	check_in_slash_check_out: '체크인/체크아웃',
	finish: '설정 끝마치기',
	prev_step: '이전단계',
	next_step: '다음단계',
	house_config: '숙소설정',
	house_config_desc: '선택한 숙소에대한 정보를 한눈에 관리가 가능합니다. 여기에서 입력되는 정보는 홈페이지와 e-mail 등등 여러가지로 발송됩니다.',
	basic_info: '기본정보',
	basic_info_desc: '숙소의 기본정보를 수정 하실 수 있습니다.',
	deposit_info: '입금정보',
	deposit_info_desc: '숙소의 입금정보를 수정 하실 수 있습니다.',
	account_number: '계좌번호',
	depositor: '예금주',
	bank_name: '은행명',
	support_payment_method: '지원 결제수단',
	update_house_completed: '숙소 업데이트 완료',
	update_house_failed: '숙소 업데이트 실패',
	sms__decs: 'SMS 양식을 설정해두시면 메세지를 보낼때 해당 양식을 편리하게 보낼 수 있습니다.',
	do_you_want_to_change_periodical_pay: '현재 정기결제가 이루어지고 있습니다. 변경 하시겠습니까?',
	auto_pay_stop: '해지',
	auto_pay_continue: '정기결재 재사용 하기',
	BookingStatus: {
		COMPLETED: '예약완료',
		CANCELED: '예약취소'
	},
	booking_number: '예약번호',
	bill_print: '영수증 출력',
	refund_price: '환불금액',
	refund_complete: '환불완료',
	refund_fail: '환불실패',
	refund: '환불하기',
	do_you_really_want_to_cancel_our_service: '앗 정기결제를 정말로 해지 하시나요?',
	if_you_cancel_service_please_notice_below_things: (
		<span>
			만약 정기결제를 해지하신다면 서비스 기간이 만료되면 더이상 서비스를 이용하실수 없습니다. <br />
			다음과 같은 유의사항이 있습니다.
		</span>
	),
	service_termination_warn1: '더이상 신규 예약을 받을 수 없습니다.',
	service_termination_warn2: 'SMS 서비스를 이용하실수 없습니다.',
	service_termination_warn3: '기존 예약을 변경하거나 수정하는 것이 불가능 합니다.',
	service_termination_warn4: '이용하고 계신 홈페이지에 접속이 불가능 합니다.',
	basic_info_insert: '기본정보 입력하기.',
	design_select: '디자인 선택하기',
	select_addtional_ui: '추가옵션 선택하기',
	option_select: '옵션선택',
	free: '무료',
	homepage: '홈페이지',
	complete: '완료',
	un_complete: '미완료',
	room_type_create: '방타입생성',
	room_create: '방생성',
	sms_config: 'SMS 설정',
	homepage_request: '홈페이지 신청하기',
	homepage_request_desc: '홈페이지 무료 개설이 가능합니다. 직접 커스터마이징 가능한 홈페이지를 제공합니다.',
	breakfast: '조식',
	paidByNice: '잔다페이',
	PayMethod: {
		BILL: '잔다페이',
		VBANK: '가상계좌',
		CASH: '현금결제',
		CARD: '카드결제',
		CHANNEL_PAY: '채널결제',
		BANK_TRANSFER: '무통장 입금'
	},
	pay_check_1dollor: '카드정보 확인을 위해 1달러 결제를 진행합니다.',
	dollor1_will_be_refund_immediatly: '1달러는 결제후 곧바로 환불 처리 됩니다.',
	pay_regist_pay_notice1: '이용을 원하지 않으시면 14일 이전에 정기결제를 취소 하셔야 합니다.',
	pay_regist_pay_notice2: '[마이페이지 > 정기결제관리] 페이지에서 현재상태를 변경하시면 정기결제가 되지 않습니다.',
	pay_regist_pay_notice3: '정기결제를 취소하는 시점부터 잔다부킹시스템 이용이 힘드니 이점 유념하시길 바랍니다.',
	check_new_password: '새로운 패스워드 확인 입력',
	detail_info: '상세정보',
	roomType_count: '방타입 수',
	createHouse_desc: (
		<span>
			한계정에 추가적인 숙소를 생성 하실 수 있습니다. <span className="JDtextColor--error">* 월별 요금은 숙소당 개별 지불 되니 이점 유의하시길 바랍니다. </span>
		</span>
	),
	solution_usage_guide_desc: '잔다부킹시스템 이용안내를 드립니다.',
	pay_doc_title1: '정기결제란?',
	pay_doc_desc1: (price: number) =>
		`잔다부킹시스템은 '정기결제'는 회원가입과 동시에 14일간의 무료체험 이후에 회원가입시 입력한 카드로 정기적으로 '상품타입 금액 ${autoComma(price)} 만큼 결제를 합니다'`,
	pay_doc_title2: '정기결제 변경',
	pay_doc_desc2: "[MY PAGE > 정기결제 관리]에서 '결제카드변경'를 눌러서 카드정보를 변경하시면 됩니다.",
	pay_doc_title3: '정기결제 취소',
	pay_doc_desc3: '정기결제 취소를 원하시면 [MYPAGE > 정기결제 관리 > 현재상태]를 변경하시면 정기결제가 되지 않습니다.',
	product_type_help_txt: () => (
		<span>
			방 20개 이상은 JANDA-H (110,000/월) <br /> 그외 JANDA-G (55,000/월) 권장
		</span>
	),
	product_type_desc: (productTypePrice: number) => `${autoComma(productTypePrice)} / 월 (14일 무료 취소가능)`,
	house_init_done_fisrt: '환영합니다. 숙소 생성이 완료 되었습니다.',
	house_init_done: '숙소가 추가 되었습니다.',
	house_init_failed: '숙소 생성에 실패했습니다. 별도 문의 바랍니다.',
	drag_failed_msg: '선택된 구간은 사용 할 수 없습니다.',
	room_index: '방순서',
	index_unit: '번',
	user_request_create: '유저 요청 생성 완료',
	user_request_failed: '유저 요청 생성 실패',
	HomepageOptions: {
		CS_PAGE: 'CS페이지',
		CUSTOM_DESIGN: '커스텀 디자인',
		CUSTOM_DEV: '커스텀 개발',
		INSTA_PAGE: '인스타 여동 페이지',
		NOTI_PAGE: '알림 페이지',
		PHOTO_PAGE: '사진 페이지',
		PRICE_PAGE: '가격 페이지',
		RESV_API: '예약 API',
		RESV_PAGE: '예약 페이지',
		ROOM_INFO_PAGE: '방 정보 페이지'
	},
	add: '추가',
	request_domain: '신청 도메인',
	site_name: '사이트명',
	request_urls: '신청 URLS',
	manage_name: '관리자명',
	else_fill: '기타사항',
	sum_price: '합계금액',
	homepage_request_info1: '맞춤제작을 원하시면 채널톡으로 문의 부탁드립니다.',
	homepage_request_info2: '보통 홈페이지 작업기간은 신청일로부터 +3일 정도 소요되며 완료시 안내를 드립니다.',
	there_is_no_selected_card: '선택된 카드가 없습니다.',
	card_name: '카드명',
	connected_house: '연결된 하우스',
	request_date: '신청일자',
	request_design: '신청 디자인',
	homepage_is_processing: '홈페이지 생성중 입니다.',
	cannot_move_item_now: '배정 잠금 상태입니다.',
	assig_lock: '배정잠금',
	Validation: (fillCount: number) => {
		if (fillCount === 0) {
			return '아주약함';
		}
		if (fillCount === 1) {
			return '약함';
		}
		if (fillCount === 2) {
			return '사용가능';
		}
		if (fillCount === 3) {
			return '안전';
		}
	},
	it_is_wrong_number: '잘못된 전화번호입니다.',
	auth_complete: '인증완료',
	auth_failed: '인증실패',
	save_room_done: '방저장 완료',
	save_room_failed: '방저장 실패',
	resv_search: '예약검색',
	how_search: '검색방법',
	search_helper: (
		<JDlist
			style={{
				paddingTop: '1rem'
			}}
			marginBottom="long"
			contents={[ '날짜로 검색가능 EX) 2020-04-02', '전화번호로 검색가능', '이름으로 검색가능' ]}
		/>
	),
	room_type_config: '룸타입 설정',
	edit: '편집',
	summaryEdit: '보기 요약편집',
	summaryCreateEdit: (
		<Align flex>
			<JDtypho mr="small">생성</JDtypho>요약편집
		</Align>
	),
	Summary: {
		name: '이름',
		phoneNumber: '전화번호',
		checkInOut: '체크인/아웃',
		funnel: '유입경로',
		memo: '메모',
		payMethod: '결제방법',
		phone: '전화번호',
		resvDate: '예약일',
		roomSelectInfo: '방정보',
		bookingStatus: '예약상태',
		breakfast: '조삭',
		paymentStatus: '결제수단'
	},
	your_conifg_is_saved: '설정이 저장되었습니다.',
	save_failed: '저장이 실패했습니다.',
	plz_insert_required: '필수 설정을 포함해주세요.',
	sir: (name: string) => `${name}님`,
	password_rewrite_error: '패스워드 확인과 일치하지 않습니다.',
	email_sended: '이메일 전송완료',
	email_sended_failed: '이메일 전송실패',
	static_list: <JDlist linePoint="·" contents={[ '매출은 숙박일 기준으로 생성됩니다.', '통계는 통계날자의 범위안에서 단위별로 보여집니다.' ]} />,
	today_mark: '오늘 마크',
	cursor_mark: '커서 마크',
	zoom_range: '확대 범위',
	adress_search: '주소검색',
	pay_stopped: '결제중단',
	janda_price_policy: '잔다 요금제',
	janda33: [
		<JDtypho component="span">시간제 공간 예약 시스템</JDtypho>,
		'공유공간 예약',
		'온라인 티켓 판매',
		<span>
			AI 자동 문자 서비스 <JDtypho color="point">*사용량 만큼 청구</JDtypho>
		</span>,
		'통합 전자 결제 솔루션 탑재',
		'수익 수수료 없음',
		'매출 수수료 없음'
	],
	janda55: [
		'숙소운영 및 예약관리 솔루션',
		<span>
			국내·외{' '}
			<JDtypho component={'span'} color="point">
				OTA 예약채널 연동
			</JDtypho>
		</span>,
		<span>
			다국어{' '}
			<JDtypho component={'span'} color="point">
				AI 무인 솔루션
			</JDtypho>
		</span>,
		<span>
			직접 꾸미는
			<JDtypho component={'span'} color="point">
				반응형 홈페이지
			</JDtypho>
		</span>,
		<span>
			AI 자동 문자 서비스{' '}
			<JDtypho component="span" color="point">
				*사용량 만큼 청구
			</JDtypho>
		</span>,
		<span>통합 전자 결제 솔루션 탑재</span>,
		<span>성수기 걱정없는 트래픽 제공</span>,
		<span>수익 수수료 없음</span>,
		<span>매출 수수료 없음</span>
	],
	janda110: [
		'호텔운영 및 예약관리 솔루션',
		<span>
			국내·외
			<JDtypho component={'span'} color="point">
				OTA 예약채널 연동
			</JDtypho>
		</span>,
		<span>
			다국어
			<JDtypho component={'span'} color="point">
				AI 무인 솔루션
			</JDtypho>
		</span>,
		<span>
			IOT 객실관리 시스템
			<JDtypho component={'span'} color="point">
				연동(별도문의)
			</JDtypho>
		</span>,
		<span>
			직접 꾸미는
			<JDtypho component={'span'} color="point">
				프리미엄 홈페이지
			</JDtypho>
		</span>,
		<span>
			AI 자동 문자 서비스
			<JDtypho component={'span'} color="point">
				*사용량 만큼 청구
			</JDtypho>
		</span>,
		<span>통합 전자 결제 솔루션 탑재</span>,
		<span>성수기 걱정없는 트래픽 제공</span>,
		<span>수익 수수료 없음</span>,
		<span>매출 수수료 없음</span>
	],
	jandaGold: [
		'홈페이지 맞춤 디자인 제작',
		'홈페이지 맞춤 기능 제작',
		<JDtypho color="point">타사 상품과의 연동</JDtypho>,
		<span>기본 제공 범위 이외의 요청사항</span>
	],
	price_policy_detail: '요금표 자세히보기'
};
