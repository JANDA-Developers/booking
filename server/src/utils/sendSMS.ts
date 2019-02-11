import rq, { Options } from "request-promise";
import { SMSResult } from "../types/types";

export const sendSMS = async (
    receivers: string,
    msg: string
): Promise<SMSResult> => {
    const key = process.env.SMS_KEY;
    const sender = process.env.SMS_SENDER;
    const user = process.env.SMS_USER;
    const host = process.env.SMS_HOST;
    const testmodeYn = process.env.SMS_TESTMODE || "N";

    const requestOptions: Options = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: host + "send/",
        body: `key=${key}&user_id=${user}&sender=${sender}&receiver=${receivers}&msg=${msg}&testmode_yn=${testmodeYn}`,
        json: false
    };
    const { result_code, msg_id: msgId, msg_type: msgType } = JSON.parse(
        await rq
            .post(requestOptions)
            .then(something => something)
            .catch(err => {
                throw err;
            })
    );
    console.log({
        result_code,
        msg_id: msgId,
        msg_type: msgType
    });

    return {
        ok: result_code === "1",
        error: result_code,
        msgId,
        msgType
    };
};

export const sendVerificationSMS = (receiver: string, key: string) =>
    sendSMS(receiver, `Your Verificaion Key is: ${key}`);
