// 미결제, 결제완료
export enum PaymentStatusEnum {
    NOT_YET = "NOT_YET",
    COMPLETE = "COMPLETE"
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

export enum PricingTypeEnum {
    ROOM = "ROOM",
    DOMITORY = "DOMITORY"
}

export enum GuestTypeEnum {
    GUEST = "GUEST",
    BLOCK = "BLOCK"
}

export enum ErrorCodeWhereEnum {
    BOOKING = "BKG",
    GUEST = "GST",
    HOUSE = "HSE",
    PRODUCT = "PRD",
    PRODUCTTYPE = "PRT",
    SEASON = "SEA",
    SMS = "SMS",
    USER = "USR",
    VERIFICATION = "VRF"
}

export enum ErrorCodeReasonEnum {
    BAD_PARAMS = 0x100,
    UNEXIST_ID = 0x200,
    UNEXIST_TOKEN = 0x300,
    AUTH_FAIL = 0x400
}
