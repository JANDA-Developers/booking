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

export enum PricingTypeEnum {
    ROOM = "ROOM",
    DOMITORY = "DOMITORY"
}

export enum GuestTypeEnum {
    GUEST = "GUEST",
    BLOCK = "BLOCK"
}
