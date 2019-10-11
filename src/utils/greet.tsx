import React from "react";
import {getCookie, setCookie} from "./cookies";
import {TimePerMs} from "../types/enum";
import GreetingBox from "../pages/middleServer/dashboard/components/greetingBox";
import {toast} from "react-toastify";
import {IContext} from "../pages/MiddleServerRouter";

const greet = async (context: IContext) => {
  const lastConnectTime = getCookie("lastConnect");
  if (
    lastConnectTime === undefined ||
    parseInt(lastConnectTime) < new Date().valueOf() - TimePerMs.H * 3
  ) {
    toast(<GreetingBox userData={context.user} />);
  }
  setCookie("lastConnect", `${new Date().valueOf()}`, 999);
  return "";
};

const PeriodShow = async (context: IContext) => {
  const lastConnectTime = getCookie("lastConnect");
  if (
    lastConnectTime === undefined ||
    // 3시간에 한번씩 울림니다.
    parseInt(lastConnectTime) < new Date().valueOf() - TimePerMs.H * 3
  ) {
    toast(<GreetingBox userData={context.user} />);
  }
  setCookie("lastConnect", `${new Date().valueOf()}`, 999);
  return "";
};

export default greet;
