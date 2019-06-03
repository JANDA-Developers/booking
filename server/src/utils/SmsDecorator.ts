export interface SmsDecoratorInterface {
    replace(key: string, val: string): SmsTemplateDecorator;
}

export enum SmsReplaceKeyEnum {
    STAYDATE = "%STAYDATE%",
    STAYDATE_YMD = "$STAYDATE_YMD%",
    ROOMTYPE_N_COUNT = "%ROOMTYPE_N_COUNT%",
    BOOKERNAME = "%BOOKERNAME%",
    TOTALPRICE = "%TOTALPRICE%",
    PAYMETHOD = "%PAYMETHOD%",
    PAYMENTSTATUS = "%PAYMENTSTATUS%"
}

export type SmsReplacementValues = {
    [K in keyof typeof SmsReplaceKeyEnum]: string
};

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
        .replace(SmsReplaceKeyEnum.STAYDATE, values.STAYDATE)
        .replace(SmsReplaceKeyEnum.STAYDATE_YMD, values.STAYDATE_YMD)
        .replace(SmsReplaceKeyEnum.TOTALPRICE, values.TOTALPRICE)
        .getMessage();
};
