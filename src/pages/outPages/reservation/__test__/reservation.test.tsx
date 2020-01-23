import {
  TWaitClick,
  TClick,
  Tselect,
  getLocalStorage,
  TWaitS,
  TType,
  expectOkFromGraphql,
  TWaitVsible
} from "../../../../__test__/utils.test";
import { TFilterByProperty } from "../../../../utils/developMaster";
import { fillCardInfo } from "../../../bookingHost/myPage/components/cardModal.tsx/__test__/cardModal.test";

export const fillCardInfoForm = async () => {};

export const insertResv = async () => {
  const tweets = await page.$$(".DayPicker-Day");
  const d = await TFilterByProperty(
    tweets,
    "className",
    async property => !property.includes("DayPicker-Day--disabled")
  );

  await d[0].click();
  await d[1].click();

  try {
    await page.waitForSelector(".roomTypeCard .JDselect");
    await Tselect(".roomTypeCard .JDselect", 2);
  } catch (e) {
    throw Error(e);
  } finally {
    await TClick(".roomTypeCard__selectButton");
  }
  await TWaitClick("#ResvBtn");
};

export const gotoResvPage = async () => {
  const localStorageData = await getLocalStorage();
  // @ts-ignore
  const pbk = localStorageData["pbk-T"];
  if (!pbk) {
    throw Error("퍼블릭키가 존재하지 않습니다.");
  }
  await page.goto(`localhost:3000/#/outpage/reservation/${pbk}`);
  await TWaitS("#JDreservation");
};

export const fillUpBookerInfoForGuest = async () => {
  await TType("#JDbookerInfo__name", "김민재");
  await TType("#JDbookerInfo__phoneNumber", "01052374492");
  await TType("#JDbookerInfo__password", "4125");
  await TClick("#JDbookerInfo__agreeMent");
  await TClick("#FinishBookerInfoFillUpBtn");
};

export const resvPayWithCard = async () => {
  await fillCardInfo();
  await TClick("#PayMentBtn");
  await expectOkFromGraphql();
  await TWaitVsible(".TConfirmTureBtn");
  await TClick(".TConfirmTureBtn");
};

export const checkResvInList = async () => {};

export const checkResvInAssig = async () => {};

export default "c";
