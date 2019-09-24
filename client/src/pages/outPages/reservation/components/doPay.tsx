import ip from "ip";
import crypto from "crypto";
import {startBookingForPublicVariables} from "../../../../types/api";
import moment from "moment";
import {isMobile} from "is-mobile";
import $ from "jquery";

const nicepayClose = () => {
  alert("결제가 취소 되었습니다");
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
  resvInfo: startBookingForPublicVariables;
  transactionId: string;
}

const inputMaker = (form: HTMLFormElement, inputParams: inputParams): void => {
  let hiddenField = document.createElement("input");

  inputParams.forEach(({name, value}) => {
    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", name);
    hiddenField.setAttribute("value", value);
    form.appendChild(hiddenField);
  });
};

export const openNiceModal = async ({resvInfo, transactionId}: IProp) => {
  const flagMobile = isMobile();
  const {bookerParams, paymentParams} = resvInfo;
  const {price, payMethod} = paymentParams;
  const {name, phoneNumber} = bookerParams;
  const time = moment(new Date()).format("YYYYMMDDhhmmss");
  const merchantID = "nicepay00m";
  const merchantKey =
    "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==";
  const hashed = crypto
    .createHash("sha256")
    .update(`${time}${merchantID}${price}${merchantKey}`)
    .digest("hex");

  const sharedInputParams = [
    {
      name: "PayMethod",
      value: payMethod
    },
    {
      name: "GoodsName",
      value: "숙소 예약"
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

    await inputMaker(form, inputParams);

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
    ); //요청 보낼 주소
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

    await inputMaker(form, inputParams);

    document.body.appendChild(form);

    form.submit();
  }
};

// @ts-ignore
window.nicepaySubmit = pcCallBackFromNicePay;
// @ts-ignore
window.nicepayClose = nicepayClose;
