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

export enum SmsReplaceKeyEnum {
    DATE_OF_STAY
}
