import React from "react";
import { IUseModal } from "../../hooks/hook";
import { getMemos_GetMemos_memos } from "../../types/api";
import { getCookie, setCookie } from "../../utils/cookies";
import { TimePerMs } from "../../types/enum";
import GreetingBox from "./dashboard/components/greetingBox";
import { toast } from "react-toastify";
import { IContext } from "./MiddleServerRouter";
import { IHouse, IHouseConfigFull } from "../../types/interface";
import { DEFAULT_HOUSE_CONFIG } from "../../types/defaults";
import { removeNullOfObject, mergeObject, isEmpty } from "../../utils/utils";

const houseConfigSetting = (currentHouse: IHouse | undefined) => {
  let houseConfig = DEFAULT_HOUSE_CONFIG;
  if (currentHouse) {
    removeNullOfObject(currentHouse.houseConfig);
    houseConfig = mergeObject<IHouseConfigFull>(
      DEFAULT_HOUSE_CONFIG,
      currentHouse.houseConfig
    );
    currentHouse.houseConfig = houseConfig;
  }
  return houseConfig;
};

// 메모중에 알림 있는것 알려줌
const alertMemo = (modalHook: IUseModal, memos: getMemos_GetMemos_memos[]) => {
  if (
    !sessionStorage.getItem("dontShowMemoAlert") &&
    !getCookie("dontShowMemoToday")
  ) {
    if (memos) {
      const haveAlert = memos.find(data => data.enableAlert);
      haveAlert && modalHook.openModal();
    }
  }
};

// 인사
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

// expire 토스트 수정필요
const testPeriodShow = async (context: IContext) => {
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

// 현재 선택된 숙소를 가져옴
const getCurrentHouse = (
  houses: IHouse[],
  tempLastSelectedHouse: any
): IHouse | undefined => {
  const lastSelectedHouse = houses.find(
    house => house._id === tempLastSelectedHouse.value
  );

  // 마지막으로 선택한 하우스 또는 첫번째 하우스
  let selectedHouse = lastSelectedHouse || houses[0];

  // 최근에 선택된 숙소가 없다면 선택된 숙소는 첫번째 숙소입니다.
  if (!selectedHouse && !isEmpty(houses)) [selectedHouse] = houses;

  return selectedHouse;
};

export {
  alertMemo,
  testPeriodShow,
  greet,
  houseConfigSetting,
  getCurrentHouse
};
