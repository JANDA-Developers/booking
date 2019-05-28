// 미결제, 결제완료
export enum PaymentStatusEnum {
    NOT_YET = "NOT_YET",
    COMPLETE = "COMPLETE",
    CANCEL = "CANCEL"
}

export enum PayMethodEnum {
    CASH = "CASH",
    CARD = "CARD"
}

export enum BookingStatusEnum {
    COMPLETE = "COMPLETE",
    CANCEL = "CANCEL"
}

export enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum SendSmsWhenEnum {
    WHEN_BOOKING,
    WEHN_BOOKING_CANCEL,
    WHEN_BOOKING_REFUND
}

export enum PricingTypeEnum {
    ROOM = "ROOM",
    DOMITORY = "DOMITORY"
}

export enum GuestTypeEnum {
    GUEST = "GUEST",
    BLOCK = "BLOCK"
}

export enum SmsReplacer {
    STAY_DATE = "%STAYDATE%",
    STAY_DATE_YMD = "$STAYDATEYMD%",
    ROOMTYPE_N_PEOPLECOUNT = "%ROOMTYPENPEOPLECOUNT",
    BOOKERNAME = "%BOOKER%",
    TOTAL_PRICE = "%TOTALPRICE%"
}

export enum SmsReplaceKeyEnum {
    STAY_DATE = "", // "[숙박일자(월/일)]",
    STAY_DATE_YMD = "", // "[숙박일자(년/월/일)]",
    ROOMTYPE_N_PEOPLECOUNT = "", // "[방타입(인원수)]",
    BOOKERNAME = "", // "[예약자명]",
    TOTAL_PRICE = "" // "[금액]"
}
