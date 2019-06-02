export interface SmsDecoratorInterface {
    replace(key: string, val: string): SmsTemplateDecorator;
}

export interface SmsReplaceKey {
    StayDate: string;
    StayDateYMD: string;
    RoomTypeNCount: string;
    BookerName: string;
    TotalPrice: string;
    PayMethod: string;
    PaymentStatus: string;
}

export interface AutoSendWhenBooking extends SmsReplaceKey {}

export enum SmsReplaceKeyEnum {
    StayDate = "%StayDate%",
    StayDateYMD = "$StayDateYMD%",
    RoomTypeNCount = "%RoomTypeNCount%",
    BookerName = "%BookerName%",
    TotalPrice = "%TotalPrice%",
    PayMethod = "%PayMethod%",
    PaymentStatus = "%PaymentStatus%"
}

export type SmsReplacementValues = { [K in keyof SmsReplaceKey]: string };

export class SmsTemplateDecorator implements SmsDecoratorInterface {
    private msg: string;

    constructor(msg: string) {
        this.msg = msg;
    }

    public replace(key: SmsReplaceKeyEnum, val: string): SmsTemplateDecorator {
        this.msg = this.msg.replace(key, val);
        return this;
    }

    public getMessage(): string {
        return this.msg;
    }
}

// 모든 변수 다 replace 함..
export const getFormattedAutoSendMessage = (
    msg: string,
    values: SmsReplacementValues
): string => {
    return new SmsTemplateDecorator(msg)
        .replace(SmsReplaceKeyEnum.BookerName, values.BookerName)
        .replace(SmsReplaceKeyEnum.RoomTypeNCount, values.RoomTypeNCount)
        .replace(SmsReplaceKeyEnum.StayDate, values.StayDate)
        .replace(SmsReplaceKeyEnum.StayDateYMD, values.StayDateYMD)
        .replace(SmsReplaceKeyEnum.TotalPrice, values.TotalPrice)
        .getMessage();
};
