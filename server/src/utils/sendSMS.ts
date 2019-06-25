import { Types } from "mongoose";
import rq, { Options } from "request-promise";
import { SmsHistorySchema } from "../models/SmsHistory";
import { SendSmsResponse, SendSmsResult } from "../types/graph";

export const sendSMS = async (
    {
        receivers,
        msg,
        sender = process.env.SMS_SENDER
    }: { receivers: string; msg: string; sender?: string },
    smsInfoId?: Types.ObjectId,
    autoSend: boolean = false,
    testmodeYn: "Y" | "N" | string = process.env.SMS_TESTMODE || "N"
): Promise<SendSmsResponse> => {
    const key = process.env.SMS_KEY;
    const user = process.env.SMS_USER;
    const host = process.env.SMS_HOST;

    const requestOptions: Options = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: host + "send/",
        body: `key=${key}&user_id=${user}&sender=${sender ||
            process.env
                .SMS_SENDER}&receiver=${receivers}&msg=${msg}&testmode_yn=${testmodeYn}`,
        json: false
    };
    const {
        result_code,
        message,
        msg_id,
        success_cnt,
        error_cnt,
        msg_type
    } = JSON.parse(
        await rq
            .post(requestOptions)
            .then(something => something)
            .catch(err => {
                throw err;
            })
    );
    const result: SendSmsResult = {
        errorCnt: error_cnt,
        msgType: msg_type,
        message,
        msgId: msg_id,
        resultCode: result_code,
        successCnt: success_cnt
    };
    console.log({
        body: `key=${key}&user_id=${user}&sender=${sender ||
            process.env
                .SMS_SENDER}&receiver=${receivers}&msg=${msg}&testmode_yn=${testmodeYn}`
    });
    const ok = result_code === "1";
    if (ok && smsInfoId && sender) {
        const history = SmsHistorySchema.createHistory(smsInfoId, {
            msg,
            receivers: receivers.split("|"),
            sendResult: true,
            sender,
            autoSend
        });
        await history.save();
    }
    /*
    ** API 결과값
        - result_code
        - message
        - msg_id
        - success_cnt
        - error_cnt
        - msg_type
    */

    return {
        ok,
        error: result_code,
        result
    };
};

export const sendVerificationSMS = (receiver: string, key: string) =>
    sendSMS({
        receivers: receiver,
        msg: `Your Verificaion Key is: ${key}`
    });
