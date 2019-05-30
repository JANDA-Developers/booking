export interface SmsDecoratorInterface {
    replace(key: string, val: string): SmsTemplateDecorator;
}

export interface SmsReplaceKey {
    STAY_DATE: string;
    STAY_DATE_YMD: string;
    ROOMTYPE_N_COUNT: string;
    BOOKERNAME: string;
    TOTAL_PRICE: string;
}

export enum SmsReplaceKeyEnum {
    STAY_DATE = "%STAYDATE%",
    STAY_DATE_YMD = "$STAYDATEYMD%",
    ROOMTYPE_N_COUNT = "%ROOMTYPENCOUNT%",
    BOOKERNAME = "%BOOKER%",
    TOTAL_PRICE = "%TOTALPRICE%"
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
        .replace(SmsReplaceKeyEnum.BOOKERNAME, values.BOOKERNAME)
        .replace(SmsReplaceKeyEnum.ROOMTYPE_N_COUNT, values.ROOMTYPE_N_COUNT)
        .replace(SmsReplaceKeyEnum.STAY_DATE, values.STAY_DATE)
        .replace(SmsReplaceKeyEnum.STAY_DATE_YMD, values.STAY_DATE_YMD)
        .replace(SmsReplaceKeyEnum.TOTAL_PRICE, values.TOTAL_PRICE)
        .getMessage();
};
