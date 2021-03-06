import React from "react";
import Mbr from "../atoms/mbr/Mbr";
import { LANG } from "../hooks/hook";
import TextButton from "../atoms/textButton/TextButton";
import JDlist from "../atoms/list/List";
import PhotoFrame from "../atoms/photoFrame/PhotoFrame";
import { autoComma } from "../utils/utils";
import { JDalign, JDtypho } from "@janda-com/front";

export const en = {
  Apply: "Apply",
  BOTH: "guest, host",
  BY_DATE: "by date",
  BY_DAY_OF_WEEK: "by day",
  CANCEL: "Cancel Reservation",
  CARD: "Payment",
  CASH: "cash payments",
  BANK_TRANSPER: "deposit without bankbook",
  CHANNEL_PAY: "Channel Pay",
  CHINESE: "Chinese",
  COMPLETE: "booked",
  DISALBE: "stop",
  ENABLE: "normal",
  ENGLISH: "English",
  FAIL: "Reservation failed",
  GUEST: "guest",
  HM: "Auto Solution",
  HM_set: "AI Auto Solution Setting",
  HM_title: "AI Auto Solution Title",
  HOST: "host",
  Headcount: "the total number",
  JANDA_provide_free_homepage_for_guest:
    "We provide free homepage for customers.",
  JAPANESE: "Japanese",
  KOREAN: "Korean",
  MALE: "M",
  FEMALE: "F",
  MONTHLY: "monthly",
  NOT_YET: "In progress",
  Pricing: "Pricing",
  Rooms: "Rooms",
  DOMITORY: "dormitory",
  ROOM: "room",
  SmsReplaceKey: {
    DOMITORY: "dormitory",
    ROOM: "room",
    STAYDATE: `[CHECK-IN (year / day)]`,
    STAYDATE_YMD: `[CHECK-OUT (year / month / day)]`,
    ROOMTYPE_N_COUNT: `[Accommodation (room / person)]`,
    BOOKERNAME: `[Name]`,
    TOTALPRICE: `[Price]`,
    PAYMETHOD: `[Payment method]`,
    PAYMENTSTATUS: `[Payment status]`,
    HM: `[AI Auto Solution URL]`
  },
  Use_room_specific_tabs: "Use room type specific tabs.",
  VBANK: "Deposit without a bankbook",
  WAIT: "Wait",
  WEEKLY: "Weekly",
  WEHN_BOOKING_CANCEL: "On cancellation",
  WHEN_BOOKING_CREATED: "when creating reservation",
  WHEN_BOOKING_CREATED_PAYMENT_NOT_YET: "When creating a reservation (unpaid)",
  WHEN_BOOKING_UPDATE: "On reservation update",
  YEARLY: "by year",
  accommodation_info: "Accommodation information",
  add_room: "add room",
  add_roomType: "add room type",
  additional_cost: "extra cost",
  admin_screen: "admin screen",
  agree: "agree",
  agree_to_privacy_policy: "Accept personal information",
  alarm: "notification",
  alarm_transmission_completed: "Alarm Transmission Succeeded",
  alarm_transmission_failed: "Alarm transmission failed",
  allocation_calendar: "allocation calendar",
  applicant: "applicant",
  applicant_contact: "applicant contact",
  applied_product_type: "product type",
  applied_url: "applied URL",
  appliedby_default_in_periods_with_no_price_set:
    "Applied by default in periods with no price",
  applies_to_all_reservations_booked_together:
    "Applies to all reservations booked together",
  apply: "apply",
  apply_color: "apply color",
  apply_layout: "application layout",
  apply_this_product_to_house: "Apply this product to your accommodation",
  are_you_sure_you_want_to_delete_the_reservation:
    "Are you sure you want to delete the reservation?",
  are_you_sure_you_want_to_delete_this_guest:
    "Are you sure you want to delete this guest?",
  assig_completed: "assigned",
  assig_failed: "assignment failed",
  assig_guest_specific_setting: "Detailed Settings for Assigned Guests",
  auth: "authentication",
  authenticate: "authenticate",
  auto_send: "auto-send",
  auto_send_condition: "AutoSend Situation condition",
  auto_send_enable: "Enable autosend",
  auto_send_target: "Autosend target",
  auto_send_whether: "Auto-send acceptance",
  available: "available",
  basic_offer: "basic offering",
  basic_price: "basic price",
  basic_price_is_used_when_season_is_un_setted:
    "Use base price during off-season periods.",
  basic_room_price: "basic room price",
  bedIndex: "bed number",
  block: "block",
  block_highlights: "block highlights",
  block_place: "block the place",
  block_room: "block the room",
  block_room_completed: "Block Completed",
  block_room_failed: "Block failed",
  booker: "booker",
  booker_info: "reservation information",
  booker_name: "name to reserve",
  bookingList: "reservation list",
  booking_status: "reservation status",
  calender_date: "calendar date",
  can_use_after_phone_auth: "Enable after phone authentication",
  cancel: "cancel",
  cancelBooking: "Cancel Reservation",
  cant_find_this_email: "We can't find that email.",
  capacity: "capacity",
  capacity_must_be_at_least_1_person: "You must have at least 1 person.",
  caution: "caution",
  certification_number: "certification number",
  certification_number_sent: "Certificate number sent successfully",
  certification_number_sent_fail: "Failed to Send Certification Number",
  change: "change",
  change_complited: "change completed",
  change_date: "change date",
  change_failed: "failed to change",
  change_house: "change of accommodation",
  change_house_fail: "failed to change accommodation",
  change_profile: "change profile",
  change_statistics: "change statistics",
  changed_current_house: "Change Current Accommodation",
  checkCheckInDate: "Please select a check-in date.",
  checkDelete: "Are you sure you want to delete?",
  checkIn: "check in",
  checkOut: "checkout",
  check_location_with_google_map: "Check your location with Google Maps",
  check_net_status: "Please check your network connection!",
  check_our_samples: "Look at the samples.",
  check_password: "check password",
  check_selection: "check selection",
  checkin_change_fail: "check-in change failed",
  checkin_date: "check-in date",
  checkin_status: "check-in status",
  checkout_date: "check-out date",
  chnage_priority: "change the rank",
  choose_product: "select the product",
  choosen_person: "select person",
  choseCheckInDate: "Please select a check-in date.",
  choseCheckOutDate: "Please select a checkout date.",
  close: "close",
  close_today: "Don't run for a day",
  color_set: "color set",
  complete_pay: "payment completed",
  complete_the_reservation_creation: "Complete reservation creation.",
  completed: "completed",
  config: "config",
  confirm: "confirm",
  connected_email: "connected email",
  connected_number: "connected number",
  consent_to_collection_of_personal_information:
    "Consent to Collect Personal Information",
  contact: "contact",
  copy_reservation_page_URL: "Copy Reservation Page URL",
  create_a_new_template: "Create a new template.",
  create_booking: "create reservation",
  create_house: "create house",
  create_house_completed: "Completed house",
  create_memo_completed: "Completed notes",
  create_memo_fail: "Failed to create note",
  create_new_memo: "write a new note",
  create_room: "create room",
  create_roomType_completed: "Room type created successfully",
  create_roomType_fail: "Failed to create room type",
  create_season: "create season",
  create_season_complete: "Completed season",
  create_season_fail: "failed to create season",
  create_template: "create template",
  create_template_complited: "completed template",
  create_template_failed: "failed to create template",
  created_house: "created hostel",
  current_set_number: "currently set number",
  current_status: "current status",
  currently_applied_service: "currently applied service",
  customer_inquiry: "contact us",
  daily_refine_price: "edit specific price",
  date: "day",
  date_of_creation: "date of creation",
  date_of_statistics: "statistics date",
  date_of_stay: "date of stay",
  day_of_week: "day of week",
  day_of_week_price: "price per day",
  day_sales: "day sales",
  default_Setting_complted: "Default setting completed",
  default_system_setting: "default system setting",
  delete: "delete",
  deleteBooking: "Delete Reservation",
  delete_booking: "delete a reservation",
  delete_completed: "deleted",
  delete_failed: "failed to delete",
  delete_season_complete: "Delete season completed  ",
  delete_season_fail: "failed to delete season",
  delete_template_completed: "template deleted",
  delete_template_failed: "Failed to delete template",
  deleted_note_completed: "Notes deleted successfully",
  deleted_note_failed: "Failed to delete notes",
  detail: "detail",
  detail_address: "detailed address",
  display_deadline: "displayed",
  display_related_setting: "Assignment related setting",
  displays_a_new_reservation_within_the_set_time:
    "Display new reservations within the set time.",
  division: "division",
  do_copy: "duplicate",
  do_create: "create",
  do_delete: "delete",
  do_modify: "modify",
  do_question: "contact us",
  do_you_want_request_making_homepage:
    "Are you sure you want to create a homepage?",
  domitory: "dormitory",
  dont_send: "unsent",
  download: "download",
  eamil: "email",
  enter_room_type_name: "Please enter a room type name.",
  exit_room_settings: "Exit Room Settings",
  expire_date: "expiration date",
  failt_to_change_house: "failed to change",
  female: "female",
  female_gender: "female",
  file: "file",
  find_destination: "find destination",
  free_experience: "free experience",
  fri: "F",
  fullRoom: "full",
  gender: "gender",
  go_back: "go back",
  go_back_to_home: "Back to Home",
  go_to_set: "go to set",
  good_status: "normal",
  goto_create_roomType: "Go to create room type",
  goto_reservation_list: "view reservation list",
  graph_shape: "graph shape",
  group_notification: "group notification",
  guest: "guest",
  guestHouse: "guesthouse",
  have_a_bright_day_sir: "Have a bright day",
  heavy_type_layout: "heavy type layout",
  home: "home",
  homepage_application_date: "Homepage application date",
  homepage_complete_estimated_date: "Homepage application date",
  homepage_develope_status: "Homepage Activity Status",
  homepage_manual: "homepage manual",
  host: "host",
  hostel: "hostel",
  hotel: "hotel",
  houseName: "host name",
  house_address: "location",
  house_delete_completed: "completed setting",
  house_delete_failed: "Failed to delete home",
  house_info: "hotel information",
  house_reservation: "reserve an accommodation",
  house_setting_completed: "Hosted setup completed",
  house_setting_failed: "Failed to set home",
  house_type: "host type",
  if_there_is_a_new_reservation_the_new_reservation_will_be_displayed_without_refreshing_the_screen:
    "If you have a new reservation, it will appear on screen without refreshing.",
  if_tou_enable_auto_send_msg_msg_will_send_autoMetically:
    "If you make an automatic call, the message will be sent automatically according to the set situation.",
  if_you_choose_wrong_size_product_to_house_service_can_be_stop:
    "Service may be canceled if you choose the wrong size of accommodation",
  if_you_have_problems_with_computer_performance_and_frequent_screen_updates_try_setting_a_higher_pooling_frequency:
    "If you're having trouble with computer performance and frequent screen updates, try setting a higher pooling frequency.",
  if_you_set_up_an_SMS_template_you_can_conveniently_send_the_template_when_you_send_a_message:
    "If you set up an SMS template, you can conveniently send the template when you send a message.",
  if_you_violate_the_accommodation_policy_your_personal_information_will_be_saved_with_the_violation:
    "If you violate our accommodation policy, your personal information will be saved with the violation.",
  index: "number",
  information_does_not_exist: "The information does not exist ...",
  input_your_name_please: "Please enter your name.",
  input_your_password_please: "Please enter your password",
  inquire_separately: "a seperate inquiry",
  invalid_password: "Invalid password",
  is_apply_homepage: "homepage applicatant status",
  is_auto_send_enable: "Enable autodial",
  is_layout_paied: "Will pay for the layout",
  is_selected_info_collect: "Is the selected information correct?",
  item: "item",
  keep_noti: "Keep the note on",
  lang_set: "language set",
  language_setting: "language setting",
  layout_cost: "layout cost",
  left_days: "days left",
  light_type_layout: "light type layout",
  logOut: "log out",
  logOut_complete: "logout complete",
  login: "login",
  login_complete: "login complete",
  make_payment: "Make a payment",
  make_reservation: "reservation",
  male: "male",
  male_gender: "male",
  manual: "manual",
  manual_download_complete: "Manual download complete",
  mark_new_reservation: "Mark a new reservation.",
  memo: "memo",
  memo_content: "memo content",
  memo_save_completed: "Memo Saved",
  memo_save_failed: "Failed to save note",
  menu_enable_set: "menu usage setting",
  menu_set: "menu settings",
  method_of_payment: "payment method",
  minute: "minute",
  mobile_phone_verification_completed: "Phone Verification Completed",
  mobile_phone_verification_failed: "phone verification failed",
  mobile_phone_verification_number: "mobile phone verification number",
  modify: "modify",
  mon: "M",
  money_unit: "won",
  month: "month",
  month_sales: "monthly sales",
  motel: "motel",
  msg: "message",
  msg_content: "character content",
  must_input_text_of_every_lang_you_supporting:
    "You must fill in all languages ​​you support.",
  name: "name",
  name_is_not_valid: "Not a valid name",
  new: "new",
  new_booking: "new booking",
  next: "next",
  nextResv: "next booking",
  no: "no",
  no_choosen_option: "There are no options.",
  no_house_currently_created: "No listings are currently created.",
  no_notes_are_currently_created: "No notes are currently created.",
  no_notifications: "There are no alarms.",
  no_room_selected: "There is no room selected.",
  non_members: "nonmembers",
  none: "none",
  none_limit_gender: "no limit (mixed)",
  none_product: "no product",
  normal_price: "normal",
  not_a_valid_email: "This is not a valid email",
  not_a_valid_mobile_number: "Not a valid mobile number.",
  not_a_valid_name: "Not a valid name",
  not_a_valid_password: "Not a valid password",
  not_a_valid_phoneNumber: "Not a valid mobile number",
  not_agree: "disagree",
  not_use: "disabled",
  note_updated: "Notes updated successfully",
  note_updated_failed: "Failed to update note",
  noti_level: "alarm importance",
  noti_msg: "notification",
  noti_period: "alarm period",
  noti_setting: "alarm settings",
  noti_target: "notification target",
  noti_title: "notification title",
  nth: "rank",
  only_on_first_purchase: "Only on first purchase",
  only_remove_that_guest: "remove only that guest",
  opps_something_problem_happend: "Oops! There was a problem.",
  others_booked_by_the_reservation_will_not_be_erased:
    "Other people booked by this reservation will not be erased.",
  outgoing_destination: "From",
  page: "page",
  page_does_not_exist: "Page does not exist",
  password: "password",
  password_condition:
    "* 1 or more special characters, 7 to 15 alphanumeric characters",
  password_is_not_matched: "Password check did not match.",
  passwords_do_not_match: "Passwords do not match.",
  pay_cancel: "Cancel payment",
  payment_canceled: "Payment canceled",
  payment_info: "payment information",
  payment_status: "payment status",
  paymethod: "payment method",
  pension: "pension",
  person_unit: "people",
  personnel: (onlyRoom?: boolean) => `${onlyRoom || "person/"}room`,
  phoneNum_is_not_valid: "Not a valid name.",
  phoneNumber: "phone number",
  phone_authenticate: "Authenticating your phone",
  please_agree_collect_personal_info: "Agree to collect personal information",
  please_aree_to_info_offer: "Please give me your informed consent",
  please_cancel_the_product_first: "Please cancel the product first.",
  please_create_house: "Please create a accommodation.",
  please_enter_a_base_price: "Please enter a base price.",
  please_enter_booker_name: "Please enter your reservation name",
  please_enter_phone_number: "Please enter your phone number.",
  please_enter_the_name_of_the_house: "Please enter your name.",
  please_enter_your_phone_number: "Please enter your phone number.",
  please_input_HM_title: "Please enter the title of the AI Auto Solution",
  please_inquire_separately: "Please contact us separately.",
  please_request_through_helpline: "Please request by phone.",
  please_search_house_location: "Search for a location.",
  please_select_a_payment_method: "Please select a payment method.",
  please_select_a_payment_status: "Please select a payment status.",
  please_select_checkOut_date: "Please select a checkout date.",
  please_select_date: "Please select a date",
  please_select_reservation_status: "Please select a reservation status.",
  please_select_the_accommodation_type: "Please select a accommodation type.",
  please_select_the_number_of_people: "Please select the number of people.",
  please_slect_date_at_calender: "Please select a date from the calendar.",
  please_specify_the_date: "Please specify a date.",
  polling_period: "pulling cycle",
  polling_period_setting: "Pulling cycle setting",
  preferences: "preferences",
  prev: "previous",
  preview: "preview",
  price: "price",
  price_setting: "price setting",
  price_setting_complited: "Price setting complete",
  price_setting_delete: "failed to delte pricing",
  price_setting_delete_fail: "Failed to delete price",
  price_setting_failed: "Price failed",
  priority: "priority",
  priority_change_fail: "Failed to change priority",
  priority_changed: "Change priority",
  privacy_item: "personal data",
  proceeding: "in progress",
  product1_detail1: "Get a free trial before you buy a product.",
  product1_detail2: "This product is intended for a pre-purchase trial.",
  product1_detail3: "You can not get a free homepage.",
  product1_detail4:
    "Most services are available and not available after 2 weeks.",
  product1_detail5:
    "If you apply a new product after the deadline, you can continue to use it.",
  product1_short1: "Can try it for 2 weeks",
  product1_short2: "Try and decide",
  product1_short3: "You can start right now",
  product2_detail1:
    "Optimized for guest house and small to medium-sized accommodations.",
  product2_detail3: "You can get a free homepage on the couch.",
  product2_detail4:
    "The expiration date is one month, with a repayment after one month.",
  product2_short1: "Optimization for small-meduim hotels",
  product2_short2: "Simply use services you need and",
  product2_short3: "Use it",
  product3_detail1: "Suitable for large hotels.",
  product3_detail3: "You can get a free homepage that we provide to you.",
  product3_detail4:
    "You can request a customed homepage which may be charged extra cost.",
  product3_detail5:
    "The expiration date is for one month, with a repayment after one month.",
  product3_short1: "Optimization for a hotel solution",
  product3_short2: "hotel manager involved",
  product3_short3: "We provide various services.",
  product4_short1: "reservation and other services",
  product4_short2: "Do you need to manage another reservation?",
  product4_short3: "Please select this product",
  product_application_completed: "Product Application Completed",
  product_application_failed: "Failed to apply for product",
  product_has_expired: "The product has expired.",
  product_memo: "product note",
  product_price: "product price",
  provides_a_tab_that_can_be_divided_by_status_in_the_assignment_calendar:
    "Provides a tab for dividing by status in the assignment calendar",
  purpose_of_collection: "purpose of collection",
  receiver: "receiver",
  release_service: "release service",
  remove_all_reservations_booked_together:
    "remove all reservations booked together",
  remove_roomType_completed: "Room type removed successfully",
  remove_roomType_fail: "Failed to remove room type",
  rep_color: "representative color",
  request_url: "request URL",
  reservation_confirm: "Confirm Reservation",
  reservation_creation_complete: "reservation created",
  reservation_creation_fail: "Failed to create reservation",
  reservation_date: "reservation date",
  reservation_delete_complete: "reservation deleted",
  reservation_delete_fail: "Failed to delete reservation",
  reservation_did_date: "Reservation date",
  reservation_information: "reservation information",
  reservation_is_completed: "The reservation is complete",
  reservation_lookup: "check the reservation",
  reservation_mark: "mark the reservation",
  reservation_memo: "reservation note",
  reservation_setting: "reservation settings",
  reservation_update: "update reservation",
  reservation_update_fail: "Reservation update failed",
  reservations_booked_directly_by_the_administrator_are_not_displayed:
    "Reservations booked directly by an administrator are not shown.",
  retention_period: "retention period",
  room: "room",
  roomForm: "room",
  roomPic: "room picture",
  roomType: "room type",
  room_block_release: "release the block",
  room_block_release_fail: "Failed to release block",
  room_config: "room setting",
  room_count: "number of rooms",
  room_create_completed: "Room created successfully",
  room_create_fail: "Failed to create room",
  room_delete_completed: "room deleted",
  room_delete_fail: "Failed to delete room",
  room_gender: "room gender",
  room_info: "room information",
  room_name: "room name",
  room_name_must_be_10_characters_or_less:
    "Room name must be under 10 letters.",
  room_select: "select room",
  room_setting: "room setting",
  room_type_basic_price: "basic price",
  room_type_desc: "Description of room type",
  room_type_name: "room type name",
  room_type_tab: "tab by room type",
  room_update: "update room",
  room_update_fail: "Failed to update room",
  row: "column",
  sales: "sales",
  sales_statistics: "sales statistics",
  sat: "SAT",
  save: "save",
  search: "search",
  search_reservation: "Search for reservations",
  season: "season",
  season_basic_price: "season base price",
  season_name: "season name",
  season_period: "seasonal period",
  second: "second",
  select: "select",
  select_date: "select date",
  select_house_type: "choose accommodation type",
  select_roomGender: "Select by room",
  select_roomType: "select room type",
  select_service: "select service",
  select_support_language: "select supported languages",
  select_the_desired_setting_item: "Please select your preference.",
  selection_information_is_correct: "Your selection is correct",
  send: "send",
  sendSMS: "send",
  send_complete: "send complete",
  send_fail: "send failure",
  send_notification: "send notification",
  send_sms: "send text",
  send_sms_complited: "sent",
  send_sms_failed: "failed to send",
  send_status: "send status",
  send_target: "send to",
  host_slash_guest: "host/guest",
  send_text_to_host: "Send Text to Host",
  send_type: "send type",
  seperatle_gender: "unlimited (mixed x)",
  server_will_check_if_there_is_a_new_reservation_once_every_set_number_by_ms:
    "Get a new confirmation from the server once every set number / ms.",
  service_request_is_completed: "Your service request is complete",
  set_daily_price: "Set daily price",
  set_product_type: "set product type",
  setting_fail: "failed to set",
  signUp: "sign up",
  signup_complted: "Sign up complete",
  singUp_submit: "subscribed",
  six_months_after_stay: "6 months after stay",
  smooth_reservation_management: "smooth scheduling management",
  sms_history: "SMS history",
  sms_setting: "SMS Settings",
  sms_template: "character template",
  someone_is_making_a_reservation: "Someone is making a reservation.",
  start_experience: "Start experience",
  statistical_transformation: "statistic transformation",
  statistics: "stats",
  status: "status",
  stop: "stop",
  sun: "SUN",
  support: "support",
  system_config: "system setting",
  system_related_settings: "system-related settings",
  take_a_look: "look around",
  template_msg: "template message",
  template_title: "template title",
  template_setting: "template setting",
  test_on_two_weeks: "Can try free trial for two weeks",
  thank_you: "Thank you.",
  the_current_product_has_expired_normal_service_is_not_possible_Please_proceed_with_the_payment:
    "Current product has been expired. Normal service is not available. Please proceed with payment.",
  the_email_set_is_not_valid: "The email set is not valid.",
  the_max_count_of_houseName_is_20:
    "Your name can be up to 20 characters long.",
  the_memo_gives_an_alarm_on_the_next_connection:
    "The memo gives an alarm on the next connection.",
  the_minimum_personal_information_required_to_provide_the_service_is_required_to_use_the_service:
    "Minimum personal information is required to provide the service, you must agree to use the service",
  the_phone_number_set_is_not_valid: "The set phone number is invalid.",
  there_is_an_alarm_set_note: "There is a note set for alarm.",
  there_is_no_room_in_selected_date: "No room is available for that day",
  this_month_sales: "This Month's Sales",
  this_price_modification_will_be_the_highest_priority_of_all_pricing:
    "Modifying that price is the highest priority of all pricing.",
  thu: "THU",
  till: "until",
  time: "time",
  timeout_please_request_again: "Please try again.",
  todat_sleep_people: "the number of people today",
  today: "today",
  today_checkIn_people: "Check-in Today",
  today_sales: "today's sales",
  tomorrow_checkIn_people: "Check-in tomorrow",
  total_price: "total price",
  transmission_time: "transmission time",
  try_to_create_in_SMS_settings: "Try to create it in SMS settings.",
  tue: "TUE",
  turn_off_alarm: "disable alerts",
  unPaid: "unpaid",
  unSupport: "not supported",
  un_choosen: "none",
  un_send_Sms: "not sent",
  unapplied: "not applicable",
  unappliy: "unapply",
  update_complete: "Update complete",
  update_fail: "Failed to update",
  update_profile: "update profile",
  update_profile_fail: "failed to update profile",
  update_roomType_completed: "Room type updated successfully",
  update_roomType_fail: "Failed to update room type",
  update_template_completed: "Template updated complete",
  update_template_failed: "Failed to update template",
  update_to_recommended_browser_chrome:
    "Update to recommended browser (Chrome)",
  upgrade: "upgrade",
  url_is_copied: "URL was copied",
  usage_amount: "use amount",
  use: "use",
  use_color_setting_function: "color setting function",
  useing: "in use",
  username_must_be_email: "ID must be an email",
  using: "in use",
  view_SMS_history: "View SMS History",
  view_info: "view info",
  view_terms: "view terms",
  waiting: "waiting",
  we_collect_your_personal_information_to_provide_the_service:
    "We collect your personal information to provide you services.",
  we_recommend_using_the_Chrome_browser_before_using_the_app:
    "We recommend using the Chrome browser before using the app.",
  we_will_contect_you_in_3_days:
    "A representative will contact you within 3 days.",
  wed: "WED",
  when_day_of_week_price_is_not_setted_basic_season_price_will_be_used:
    "If the price by day is not applied, the season's base price will be used.",
  when_season_multiple_applyed_use_left_side_value_will_be_used:
    "We will use the left season price while the season is nested",
  which_unit_would_you_like_to_see: "Which unit do you want to show?",
  will_only_use_the_reservation_system:
    "I will only use the reservation system",
  witch_statistics_do_you_want: "What statistics do you want?",
  write_a_description_of_the_menu: "Write a description of the menu.",
  year: "year",
  year_sales: "year sales",
  yes: "yes",
  you_can_clear_the_display_by_clicking: "Click to clear that marker",
  your_request_cannot_be_fulfilled_right_now:
    "I can't fulfill my request right now",
  youth_hostel: "youth hostel",
  please_verify_your_mobile_phone_to_ensure_smooth_service: (
    <span>Please verify your mobile phone to ensure smooth service.</span>
  ),
  F_selected_product_apply_to_house: (houseName: any) => (
    <span>
      * The service you choose
      <span className="JDtextColor--point"> {`$ {houseName}`} </span>
      Apply.
    </span>
  ),
  F_have_x_days_left_to_try_for_free: (daysLeftToExpire: string) =>
    `$ {DaysLeftToExpire} left until service terminated`,
  F_user_name_hello: (userName: any) => `Hello $ {userName}`,
  F_user_name_good_luck: (userName: any) =>
    `$ {userName} wish you all the best.`,
  F_user_name_have_a_bright_day: (userName: any) =>
    `$ {userName}, have a great day today`,
  F_have_house_count_n: (n: any) => `own $ {n} properties`,
  F_you_have_x_free_trial_left_y__is_about_to_expire: (
    daysLeftToExpire: any,
    expireDate: any
  ) =>
    `You have $ {daysLeftToExpire} free trial left. $ {expireDate} is about to expire.`,
  F_product2_detail2: (n: any) =>
    `This product is suitable for accommodation with $ {n} rooms or less.`,
  F_product3_detail2: (n: any) =>
    `This product is suitable for accommodation with $ {n} rooms or less.`,
  the_price_is_too_low_are_you_sure_to_set_this_price: (
    <span>
      The price is less than 1000 won. <br />
      Do you really want to set the price?
    </span>
  ),
  house_create: (
    <span>
      Rooms
      <Mbr />
      produce
    </span>
  ),
  product_registration: (
    <span>
      product
      <Mbr />
      Enrollment
    </span>
  ),
  this_is_an_old_browser_Problems_may_occur_while_using_the_service_Please_update_your_browser: (
    <span>
      This is an old browser. Problems may occur while using the service. <br />{" "}
      {""}
      Please update your browser.
    </span>
  ),
  HM_provides_guests_with_a_comfortable_and_convenient_accommodation_send_the_guide_page: (
    <span>
      The House Manual provides a guide page for guests to use the accommodation
      easily and conveniently. Send. <br />
      The house manual will save you the trouble of explaining how to use your
      accommodation.
    </span>
  ),
  automatically_send_prompts_to_your_guests: (
    <span>
      Let your guests know
      <Mbr />
      Try sending it automatically.
    </span>
  ),
  roomType_dose_not_exsist: (
    <span>
      Room type <Mbr /> does not exist.
    </span>
  ),
  additionaly_setting_to_will_good_for_manage_ment: (
    <span>
      In addition, the following settings will help you to run the <Mbr />{" "}
      accommodation!
    </span>
  ),
  default_setting_is_compelted: (
    <span>
      The default setting is
      <Mbr /> Finished.
    </span>
  ),
  make_it_easy_to_guide_accommodation_for_guests: (
    <span>
      Accommodation for guests <Mbr />
      Make it easy to guide.
    </span>
  ),
  try_setting_it_up_different_prices_by_date: (
    <span>
      Different prices by date
      <Mbr /> Try setting it up.
    </span>
  ),
  monthly_fee: "monthly rate",
  TODAY_STAY: "How many people stay today",
  TODAY_CHECKIN: "Who check in today",
  TOMORROW_CHECKIN: "Who checks in tomorrow",
  EXSIST_INFO: "selected people",
  service_expire: "service expiration",
  RoomGender: {
    FEMALE: "Women only",
    MALE: "Men only",
    ANY: "No gender restrictions",
    SEPARATELY: "Most mixed"
  },
  december: "DEC",
  november: "NOV",
  october: "OCT",
  september: "SEP",
  august: "AUG",
  july: "JUL",
  june: "JUN",
  may: "MAY",
  april: "APR",
  march: "MAR",
  february: "FEB",
  january: "JAN",
  copy_hm_page_URL: "Copy AI Auto Solution URL",
  HM_update: "Update AI Auto Solution",
  HM_update_fail: "failed to update AI Auto Solution",
  //1.0.1 add
  un_checkIn: "un checkIn",
  PaymentStatus: {
    CANCELED: "Cancel Payment",
    NOT_YET: "Outstanding payment",
    COMPLETED: "complete"
  },
  SendTarget: {
    BOTH: "guest&host",
    GUEST: "guest",
    HOST: "host"
  },
  please_select_pay_status: "please select pay status",
  exit_house_settings: "finish house settings",
  none_data: "no data",
  dontSMS: "do not send",
  hm_page_URL: "AI Auto Solution URL",
  move_hm_page: "move to AI Auto Solution page",
  reservation_page_URL: "reservation page URL",
  move_reservation_page: "move to reservation page",
  reservation_creation_complete_for_guest: "reservation complete",
  reservation_creation_fail_for_guest: "failed to make reservation",
  price_priority:
    "* Priority: Room type base price < Seasonal base price < Season day price < Daily price",
  reference_fail: "reference fail",
  reference_success: "reference success",
  funnels: "inflow route",
  see_all: "see all",
  Funnels: {
    AGODA: "AGODA",
    AIRBNB: "AIRBNB",
    BOOKING_COM: "BOOKING_COM",
    COOPANG: "COUPANG",
    ELSE_CHANNEL: "ELSE CHANNEL",
    FREINDS: "FREINDS RESERVATION",
    HOMEPAGE: "HOMEPAGE",
    NAVER: "NAVER",
    PHONE_CALL: "PHONE BOOK",
    WALK_IN: "On-site reservation",
    YANOLJA: "YANOLJA",
    YEOGIEOTTAE: "YEOGIEOTTAE"
  },
  goto_today: "on today's date",
  // 1.1.0 패치
  email: "email",
  find_email: "find email",
  get_temporary_password: "get temporary password",
  temp_password: "temporary password",
  copied_to_clipboard: "copied to clipboard",
  current_password: "current password",
  password_resset: "password reissuance",
  password_rewrite: "password reset",
  password_resset_completed: "password reset completed",
  password_resset_failed: "password reset failed",
  get_email_bt_msg: "get email by message",
  change_password_complete: "password change completed",
  change_password_failed: "failed to change password",
  new_password: "new password",
  card_resist: "card resist",
  card_number: "card number",
  check_product: "check product",
  register: "register",
  exp_year: "exp/year",
  exp_month: "exp/month",
  card_regist_complete_fail: "card register fail",
  card_regist_complete: "card register complete",
  payment_regist_complete: "payment register complete",
  registration_confirmation: "registration confirmation",
  input_information: "input information",
  input_card_information: "input card information",
  idnumber_6front: "id number 6",
  idnumber_or_business_number: "id num/business num",
  card_pasword_front_two_digits: "card password first 2 digits",
  completing_this_card_registration_you_agree_to_the:
    "By registering this card information, you agree to the following",
  please_rewrite_your_new_password: (
    <span>
      temp password detected please change your password
      <br />
      please get new password
    </span>
  ),
  use_conditions: "use condition",
  privacy_policy: "price policy",
  and: "and",
  member_ship: "membership",
  create_memo: "create memo",
  host_memo: "host memo",
  guest_memo: "guest memo",
  write: "write",
  no_guest_notes_after_today: "no guest notes after today",
  update: "update",
  create: "create",
  house_front_img: "house representative image",
  house_title: "house title",
  info_img: "info img",
  info_txt: "info text",
  current_config_lang: "current setting language",
  solution_usage_guide: "solution usage guide",
  payment_information: "payment info",
  member_name: "member name",
  regi_date: "regi date",
  product_info: "product info",
  deposit_card_owner: "deposit card owner",
  pay_regist_complete_title: (
    <span>
      JANDA SOLUTION <br />
      periodical payment is resgisted
    </span>
  ),
  pay_regist_complete_text:
    "Thank you for your regular payment. If you want to change your payment information, you can change it on Mypage. If you haven't made the payment, please contact our Customer Support Center at support@stayjanda.com. Please email me",
  card_regist_complete_message: (
    <span>
      The card information is registered. You can check the information in{" "}
      <TextButton color="primary">MYPage</TextButton>
    </span>
  ),
  pay_with_this_card: "payment registration with this card",
  static_page_desc:
    "You can check the statistics on sales. You can check the sales in the meantime by setting the date and due date.",
  assigTimeline__decs: "You can assign guests to any room in your calendar.",
  JANDA_home: "JANDA Home",
  JANDA_home_desc:
    "You can check the assignment status for today's date in the current dashboard.",
  bookingList__desc:
    "The reservation information is displayed in chronological order.",
  price_setting__desc:
    "You can set the price for a date or price for a period. Try adjusting the price to be on that day.",
  lang_use_set: "setting language",
  HM_set__desc: (
    <span>
      The AI Auto Solution provides a guide page for guests to use the
      accommodation easily and conveniently. Send. <br />
      The AI Auto Solution will save you the trouble of explaining how to use
      your accommodation.
    </span>
  ),
  user_info: "Profile",
  periodicalPay_manage: "Periodic payment management",
  product_change: "Product change",
  periodical_pay_regist_complete: "Subscription registration completed",
  periodical_pay_regist_fail: "failed to register Subscription",
  sign_date: "sign date",
  change_periodical_change: "Periodical payment info change",
  payment_fee: "Payment fee",
  approved: "approved",
  excel_express: "excel printout",
  express_info: "printout infomation",
  express_count: "the number of printout",
  bill_pay_cancle: "Periodical payment cancel",
  bill_pay_cancle_complete: "Periodical payment cancel completed",
  bill_pay_cancle_fail: "failed to cancel Periodical payment",
  on_testing: "On Testing",
  un_registed: "not applied",
  uploade_compelte: "Upload completed",
  uploade_fail: "Failed to upload",
  HM_detail_info: "AI Auto Solution Info",
  ExcelExpress: {
    SELECT_OP: "Print with current selection",
    COUNT_OP: "Print with the number of recent creation",
    DATE_OP: "Print out with date"
  },
  unit: "count",
  pay_date: "pay date",
  bill: "bill",
  need_regist: (
    <TextButton className="JDstandard-margin0" color="error">
      require register
    </TextButton>
  ),
  go_to_sms_template: "go to SMS form",
  how_to_save_sms_template_title: "How to save sms SMS form ?",
  how_to_save_sms_template_doc: (
    <JDlist
      marginBottom="long"
      contents={[
        <div>
          1. On the <b> SMS Forms </b> menu, click <b> [Create Form] </b>.
        </div>,
        <div>
          2. Enter the title and message on the form creation screen, and select
          the middle of the message screen. Generate in the middle
          <b>
            Accommodation Date / Accommodation Information / Reservation Name /
            Price / Payment Method / Payment Status / AI Auto URL
          </b>
          Click on the message below in the <b> Form Message </b> to send the
          message. The information is entered automatically.
        </div>,
        <div>
          <PhotoFrame
            src={`https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/booking_app/describe/smsinfo_img_01.png`}
          />
        </div>,
        <div>
          3. Automatically call status {""}
          When{" "}
          <b>
            {" "}
            cancellation of reservation / creation of reservation / creation of
            reservation (unpaid) / reservation update{" "}
          </b>
          Select and set
        </div>,
        <div>
          4. Specify the destination for each{" "}
          <b> guest / host / guest + host </b>. You can always turn on / oFF{" "}
          <b> automatically active </b> on the right Your notification text will
          be sent to the customer
        </div>
      ]}
    />
  ),
  how_to_send_sms_for_all_title: "How to send a group SMS",
  how_to_send_sms_for_all_doc: (
    <JDlist
      marginBottom="long"
      contents={[
        <span>
          1. Group SMS is available on the solution main screen and reservation
          list screen. In the <b> Main Screen </b>, you can see at the top of
          today's reservation list {""}
          Click the <b> ‘Group Messages’ </b> button to send. {""}
          On the <b> Reservation List </b> screen, select the scheduler you want
          Click the <b> 'Send Text' </b> button at the top to send a group text
          to You can send
        </span>,
        <div>
          2. However, if you want to send a group SMS, make it in advance on the{" "}
          <b> SMS Form </b> screen. You must have an SMS form. Create a unique
          and fun SMS form. Emergency evacuation letter example: Breakfast
          reminder letter, dinner party event guide letter, Construction
          information, lost property information,
        </div>
      ]}
    />
  ),
  sms_usage: "how to use SMS ",
  sms_service: "SMS service",
  credit: "credit",
  expiration_date: "expiration date",
  add_card: "add card",
  please_input_card_info: "Please enter your card infomation",
  add_card_dec:
    "Please add your card infomation for express and convenient service",
  card_info: "card infomation",
  card_delte_complete: "delete card completed",
  card_info_complete_fail: "failed to delete card",
  periodical_cancel_complete: "Periodical pay cancel completed",
  periodical_cancel_complete_fail: "failed to cancel Periodical pay",
  card_regist: "card register",
  card_delete: "card delete",
  bill_pay_regist: "Periodical pay register",
  bill_pay_regist_width_this_card: "Periodical pay with this card",
  bill_pay_regist_change_width_this_card: "Change to this card",
  un_exsist_page: "UNEXIST PAGE",
  sms_info: "SMS notification",
  sms_info_decs: "Here is SMS usage guide",
  un_exsist_page_decs: (
    <span>
      UNEXSIST PAGE
      <br /> please click "goto back" button
    </span>
  ),
  mypage: "MY PAGE",
  solution_specification: "solution_specification",
  noti_config: "Notification setting",
  memo_manage: "memo setting",
  house_detail_config: "house detail setting",
  frequent_questions: "FAQ",
  mypage_profile_desc: "You can change user informotion",
  mypage_houses_desc: "You can manage your own accommodation",
  show_detail: "read more",
  basic_config: "default setting",
  guestStatus_mark: "guest status mark",
  shortkey_config: "keyboard setting",
  change_pay_method: "Change payment method",
  un_validate_card_number: "Invalid card number.",
  un_validate_card_expire: "Invalid card due date.",
  periodical_paying: "Under periodic payment",
  creadit_card_change: "change credit card",
  select_this_card: "change to this card",
  pay_history: "payment history",
  there_is_no_card: "There is no exist card",
  no_card: "no card",
  HouseType: {
    GUEST_HOUSE: "GuestHouse",
    HOTEL: "Hotel",
    MOTEL: "Motel",
    PENSION: "Pension",
    HOSTEL: "Hostel",
    YOUTH_HOSTEL: "Youth Hotel"
  },
  please_select_room_gender: "please select room gender",
  please_input_max_people_count: "Please enter max count capacity",
  please_select_room_type: "Please select room type.",
  room_assig_info: "room/assigment information",
  else: "else",
  check_init: "check creation",
  timeline_config: "timeline setting",
  mypage_desc:
    "You can manage your subscriptions and view the accommodations and user profiles you have created.",
  room_config_desc:
    "Create and edit room types and rooms to run your accommodation.",
  HouseStatus: {
    DISALBE: "DISABLED",
    WAIT: "WAIT",
    ENABLE: "ENABLE"
  },
  update_user_info_complete: "update user info completed",
  update_user_info_fail: "failed to update user infomation",
  server_dose_not_respond: "server is not respond",
  network_connected: "network is connected.",
  periodical_payment_is_stopped: (houseName: string) =>
    `${houseName}'s periodical pay is stopped`,
  request_is_failed: "request is failed.",
  product_regist_complete_message: "product register complete",
  select_product_desc:
    "When you register your product, you will receive your card information. After the expiration period ends, payment will be automatically made.",
  please_check_file_has_special_char:
    "Check for special characters in the file.",
  room_start_number: "room start number",
  assig_info: "assigment infomation",
  people_and_room_info: "Person and Room Information",
  to_next: "to next",
  payment_completed: "Payment has been completed.",
  payer: "Biller",
  payment_amt: "amount of payment",
  payment_date: "pay date",
  move_to_check_page: "Go to the booking confirmation page.",
  please_upload_image: "Please upload an image.",
  check_in_slash_check_out: "checkIn/checkOut",
  finish: "finish setting",
  prev_step: "previouse step",
  next_step: "next step",
  house_config: "house setting",
  house_config_desc:
    "You can manage the information of the selected accommodation at a glance. Information entered here will be sent to the homepage, e-mail, and so on.",
  basic_info: "basic information",
  basic_info_desc: "You can modify the basic information of the accommodation.",
  deposit_info: "Deposit Information",
  deposit_info_desc: "You can modify the deposit information of the property.",
  account_number: "account number",
  depositor: "depositor",
  bank_name: "name of bank",
  support_payment_method: "support payment method",
  update_house_completed: "update house completed",
  update_house_failed: "failed to update house",
  sms__decs:
    "If you set up an SMS form, you can conveniently send the form when you send a message.",
  do_you_want_to_change_periodical_pay:
    "Periodic payments are currently taking. Do you want to change it?",
  auto_pay_stop: "Termination",
  auto_pay_continue: "Reuse Periodic Payment",
  BookingStatus: {
    COMPLETED: "COMPLETED",
    CANCELED: "CANCLED"
  },
  booking_number: "Reservation Number",
  bill_print: "Bill Print",
  refund_price: "Refund amount",
  refund_complete: "Refund Completed",
  refund_fail: "Refund Failure",
  refund: "Refund",
  do_you_really_want_to_cancel_our_service:
    "Do you really cancel your subscription?",
  if_you_cancel_service_please_notice_below_things: (
    <span>
      If you cancel your subscription, you will no longer be able to use the
      service after your subscription expires. It is not available. <br />
      Note the following
    </span>
  ),
  service_termination_warn1: "You can no longer accept new reservations.",
  service_termination_warn2: "SMS service is not available.",
  service_termination_warn3:
    "It is impossible to change or modify an existing reservation.",
  service_termination_warn4: "You cannot access currently using homepage.",
  basic_info_insert: "Enter basic information.",
  design_select: "Choose a design",
  select_addtional_ui: "Select additional options",
  option_select: "Select option",
  free: "free",
  homepage: "Homepage",
  complete: "complete",
  un_complete: "Incomplete",
  room_type_create: "Create room type",
  room_create: "Room Generate",
  sms_config: "SMS setting",
  homepage_request: "Homepage Request",
  homepage_request_desc:
    "You can open a homepage for free. We provide a customizable homepage.",
  breakfast: "Breakfast",
  paidByNice: "Janda Pay",
  PayMethod: {
    BILL: "BILL",
    VBANK: "VBANK",
    CASH: "CASH",
    CARD: "CARD",
    CHANNEL_PAY: "CHANNEL",
    BANK_TRANSFER: "Deposit without a bankbook"
  },
  pay_check_1dollor: "Pay $ 1 to verify card info.",
  dollor1_will_be_refund_immediatly:
    "One dollar will be refunded immediately after payment.",
  pay_regist_pay_notice1:
    "If you do not want to use the service, you must cancel your subscription within 14 days.",
  pay_regist_pay_notice2: `
If you change the current status on the [My Page> Periodic Payment Management] page, the regular payment will not be paid.`,
  pay_regist_pay_notice3:
    "Please note that it is difficult to use the Janda booking system from the time of canceling the regular payment.",
  check_new_password: "Enter new password confirmation",
  detail_info: "More information",
  roomType_count: "the number of Room type",
  createHouse_desc: (
    <span>
      You can create additional accommodation in one account.{" "}
      <span className="JDtextColor--error">
        * Please note that monthly charges are paid separately per house.{" "}
      </span>
    </span>
  ),
  solution_usage_guide_desc:
    "We will guide you how to use Janda booking system.",
  pay_doc_title1: "What is periodic payment?",
  pay_doc_desc1: (price: number) =>
    `After you sign up our booking system, we offer a free trial for 14days. After it, there will be a regular charge on the card entered at the time of membership.  . ${autoComma()} '`,
  pay_doc_title2: "Periodic payment change",
  pay_doc_desc2: `[MY PAGE > Periodic payment management] to change the card information by entering 'change payment card'.`,
  pay_doc_title3: "Periodic payment cancellation",
  pay_doc_desc3:
    "If you want to cancel your subscription, please change [MYPAGE> Subscription Management> Current Status].",
  product_type_help_txt: () => (
    <span>
      More than 20 rooms are JANDA-H (110,000 / month) <br /> Other JANDA-G
      (55,000 / month) recommended
    </span>
  ),
  product_type_desc: (productTypePrice: number) =>
    `${autoComma(
      productTypePrice
    )} / Month (Free trial for 14 days after it, you can cancel)`,
  house_init_done_fisrt: "welcome. You have created your hostel.",
  house_init_done: "The accommodation has been added.",
  house_init_failed:
    "Failed to create accommodation Please inquire separately.",
  drag_failed_msg: "선택된 구간은 사용 할 수 없습니다.",
  room_index: "방순서",
  index_unit: "번",
  user_request_create: "유저 요청 생성 완료",
  user_request_failed: "유저 요청 생성 실패",
  HomepageOptions: {
    CS_PAGE: "CS페이지",
    CUSTOM_DESIGN: "커스텀 디자인",
    CUSTOM_DEV: "커스텀 개발",
    INSTA_PAGE: "인스타 여동 페이지",
    NOTI_PAGE: "알림 페이지",
    PHOTO_PAGE: "사진 페이지",
    PRICE_PAGE: "가격 페이지",
    RESV_API: "예약 API",
    RESV_PAGE: "예약 페이지",
    ROOM_INFO_PAGE: "방 정보 페이지"
  },
  add: "추가",
  request_domain: "신청 도메인",
  site_name: "사이트명",
  request_urls: "신청 URLS",
  manage_name: "관리자명",
  else_fill: "기타사항",
  sum_price: "합계금액",
  homepage_request_info1: "맞춤제작을 원하시면 채널톡으로 문의 부탁드립니다.",
  homepage_request_info2:
    "보통 홈페이지 작업기간은 신청일로부터 +3일 정도 소요되며 완료시 안내를 드립니다.",
  there_is_no_selected_card: "선택된 카드가 없습니다.",
  card_name: "카드명",
  connected_house: "연결된 하우스",
  request_date: "신청일자",
  request_design: "신청 디자인",
  homepage_is_processing: "홈페이지 생성중 입니다.",
  cannot_move_item_now: "배정 잠금 상태입니다.",
  assig_lock: "배정잠금",
  Validation: (fillCount: number) => {
    if (fillCount === 0) {
      return "아주약함";
    }
    if (fillCount === 1) {
      return "약함";
    }
    if (fillCount === 2) {
      return "사용가능";
    }
    if (fillCount === 3) {
      return "안전";
    }
  },
  it_is_wrong_number: "잘못된 전화번호입니다.",
  auth_complete: "인증완료",
  auth_failed: "인증실패",
  save_room_done: "방저장 완료",
  save_room_failed: "방저장 실패",
  resv_search: "예약검색",
  how_search: "검색방법",
  search_helper: (
    <JDlist
      style={{
        paddingTop: "1rem"
      }}
      marginBottom="long"
      contents={[
        "날짜로 검색가능 EX) 2020-04-02",
        "전화번호로 검색가능",
        "이름으로 검색가능"
      ]}
    />
  ),
  room_type_config: "룸타입 설정",
  edit: "편집",
  summaryEdit: "보기 요약편집",
  summaryCreateEdit: (
    <JDalign flex>
      <JDtypho mr="small">생성</JDtypho>요약편집
    </JDalign>
  ),
  Summary: {
    name: "이름",
    phoneNumber: "전화번호",
    checkInOut: "체크인/아웃",
    funnel: "유입경로",
    memo: "메모",
    payMethod: "결제방법",
    phone: "전화번호",
    resvDate: "예약일",
    roomSelectInfo: "방정보",
    bookingStatus: "예약상태",
    breakfast: "조삭",
    paymentStatus: "결제수단"
  },
  your_conifg_is_saved: "설정이 저장되었습니다.",
  save_failed: "저장이 실패했습니다.",
  plz_insert_required: "필수 설정을 포함해주세요.",
  sir: (name: string) => `${name}님`,
  password_rewrite_error: "패스워드 확인과 일치하지 않습니다.",
  email_sended: "이메일 전송완료",
  email_sended_failed: "이메일 전송실패",
  static_list: (
    <JDlist
      linePoint="·"
      contents={["통계는 통계날자의 범위안에서 단위별로 보여집니다."]}
    />
  ),
  today_mark: "오늘 마크",
  cursor_mark: "커서 마크",
  zoom_range: "확대 범위",
  adress_search: "주소검색",
  pay_stopped: "결제중단",
  janda_price_policy: "잔다 요금제",
  janda33: [
    <JDtypho component="span">시간제 공간 예약 시스템</JDtypho>,
    "공유공간 예약",
    "온라인 티켓 판매",
    <span>
      AI 자동 문자 서비스 <JDtypho color="point">*사용량 만큼 청구</JDtypho>
    </span>,
    "통합 전자 결제 솔루션 탑재",
    "수익 수수료 없음",
    "매출 수수료 없음"
  ],
  janda55: [
    "숙소운영 및 예약관리 솔루션",
    <span>
      국내·외{" "}
      <JDtypho component={"span"} color="point">
        OTA 예약채널 연동
      </JDtypho>
    </span>,
    <span>
      다국어{" "}
      <JDtypho component={"span"} color="point">
        AI 무인 솔루션
      </JDtypho>
    </span>,
    <span>
      직접 꾸미는
      <JDtypho component={"span"} color="point">
        반응형 홈페이지
      </JDtypho>
    </span>,
    <span>
      AI 자동 문자 서비스{" "}
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
    "호텔운영 및 예약관리 솔루션",
    <span>
      국내·외
      <JDtypho component={"span"} color="point">
        OTA 예약채널 연동
      </JDtypho>
    </span>,
    <span>
      다국어
      <JDtypho component={"span"} color="point">
        AI 무인 솔루션
      </JDtypho>
    </span>,
    <span>
      IOT 객실관리 시스템
      <JDtypho component={"span"} color="point">
        연동(별도문의)
      </JDtypho>
    </span>,
    <span>
      직접 꾸미는
      <JDtypho component={"span"} color="point">
        프리미엄 홈페이지
      </JDtypho>
    </span>,
    <span>
      AI 자동 문자 서비스
      <JDtypho component={"span"} color="point">
        *사용량 만큼 청구
      </JDtypho>
    </span>,
    <span>통합 전자 결제 솔루션 탑재</span>,
    <span>성수기 걱정없는 트래픽 제공</span>,
    <span>수익 수수료 없음</span>,
    <span>매출 수수료 없음</span>
  ],
  jandaGold: [
    "홈페이지 맞춤 디자인 제작",
    "홈페이지 맞춤 기능 제작",
    <JDtypho color="point">타사 상품과의 연동</JDtypho>,
    <span>기본 제공 범위 이외의 요청사항</span>
  ],
  price_policy_detail: "요금표 자세히보기",
  roomType_card_unit: "원/일",
  insert_tag: "태그입력",
  // 이건 예약페이지에 관한 텍스트 수정이다.
  // 부킹에 있어도 될것같다.
  resv_page_info_editer: "예약페이지 안내 설정",
  resv_page_info_editer_desc:
    "고객이 예약하면서 지켜야 할 주의사항 및 예약완료 안내메세지, 환불정책 등",
  resv_complete_msg: "예약완료 메세지",
  check_point_msg: "예약 확인 페이지 메세지"
};

export default en;
