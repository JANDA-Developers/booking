import ip from "ip";
import crypto from "crypto";
import {
  startBookingVariables,
  startBookingForPublicVariables,
  getPaymentAuth_GetPaymentAuth_auth
} from "../../../../types/api";
import moment from "moment";
import {isMobile} from "is-mobile";
import $ from "jquery";
import {LANG} from "../../../../hooks/hook";

const nicepayClose = () => {
  alert(LANG("payment_canceled"));
};

const pcCallBackFromNicePay = () => {
  const target = document.getElementById("nicePay");
  // @ts-ignore;
  target.submit();
};

type inputParams = {
  name: string;
  value: string;
}[];

interface IProp {
  resvInfo: startBookingVariables | startBookingForPublicVariables;
  transactionId: string;
  authInfo: getPaymentAuth_GetPaymentAuth_auth;
}

const inputCreater = (
  form: HTMLFormElement,
  inputParams: inputParams
): void => {
  let hiddenField = document.createElement("input");

  inputParams.forEach(({name, value}) => {
    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", name);
    hiddenField.setAttribute("value", value);
    form.appendChild(hiddenField);
  });
};

export const openNiceModal = async ({
  resvInfo,
  transactionId,
  authInfo
}: IProp) => {
  const flagMobile = isMobile();
  const {bookerParams, paymentParams} = resvInfo;
  const {price, payMethod} = paymentParams;
  const {name, phoneNumber} = bookerParams;
  const time = moment(new Date()).format("YYYYMMDDhhmmss");
  const hashed = authInfo.hash;

  const sharedInputParams = [
    {
      name: "PayMethod",
      value: payMethod
    },
    {
      name: "GoodsName",
      value: LANG("house_reservation")
    },
    {
      name: "GoodsCnt",
      value: "1"
    },
    {
      name: "Amt",
      value: `${price}`
    },
    {
      name: "BuyerName",
      value: `${name}`
    },
    {
      name: "BuyerTel",
      value: `${phoneNumber}`
    },
    {
      name: "Moid",
      value: `${transactionId}`
    },
    {
      name: "EdiDate",
      value: time
    },
    {
      name: "EncryptData",
      value: hashed
    },
    {
      name: "VbankExpDate",
      value: moment(new Date())
        .add("1", "day")
        .format("YYYYMMDDhhmm")
    },
    {
      name: "BuyerEmail",
      value: ""
    },
    {
      name: "GoodsCl",
      value: "1"
    },
    {
      name: "MID",
      value: "nicepay00m"
    }
  ];

  if (!flagMobile) {
    const form = document.createElement("form");
    form.setAttribute("charset", "utf-8");
    form.setAttribute("method", "Post"); //Post 방식
    form.setAttribute(
      "action",
      process.env.REACT_APP_API_PAY_MENT_RETURN_URL_DEV_PC || ""
    ); //요청 보낼 주소
    form.setAttribute("id", "nicePay"); //요청 보낼 주소
    form.setAttribute("name", "payForm"); //요청 보낼 주소

    const inputParams: inputParams = [
      ...sharedInputParams,
      {
        name: "UserIP",
        value: ip.address()
      },
      {
        name: "CharSet",
        value: "utf-8"
      },
      {
        name: "EncodeParameters",
        value: "UTF-8"
      },
      {
        name: "TrKey",
        value: ""
      },
      {
        name: "SocketYN",
        value: "Y"
      },
      {
        name: "TransType",
        value: "0"
      }
    ];

    await inputCreater(form, inputParams);

    document.body.appendChild(form);

    // @ts-ignore
    window.goPay(form);
  } else {
    // AcsNoIframe
    const form = document.createElement("form");
    form.setAttribute("charset", "utf-8");
    form.setAttribute("method", "Post"); //Post 방식
    form.setAttribute(
      "action",
      "https://web.nicepay.co.kr/v3/smart/smartPayment.jsp"
    );

    form.setAttribute("id", "nicePayMobile"); //요청 보낼 주소
    form.setAttribute("name", "tranMgr"); //요청 보낼 주소

    const inputParams: inputParams = [
      ...sharedInputParams,
      {
        name: "AcsNoIframe",
        value: "Y"
      },
      {
        name: "Charset",
        value: "utf-8"
      },
      {
        name: "ReturnURL",
        value: process.env.REACT_APP_API_PAY_MENT_RETURN_URL_DEV || ""
      }
    ];

    await inputCreater(form, inputParams);

    document.body.appendChild(form);

    form.submit();
  }
};

// @ts-ignore
window.nicepaySubmit = pcCallBackFromNicePay;
// @ts-ignore
window.nicepayClose = nicepayClose;
