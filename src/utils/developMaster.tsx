import $ from "jquery";
import { getCookie } from "./cookies";
import { ElementHandle, JSHandle } from "puppeteer";

export const isDeveloper = () => {
  return getCookie("isDeveloper") === "Y";
};

export const developEvent = (developEvent: any) => {
  if (isDeveloper()) {
    $(window).keypress("q", e => {
      if (e.ctrlKey) developEvent();
    });
  }
};

async function filter(arr: any, callback: any): Promise<any> {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item: any) => ((await callback(item)) ? item : fail))
    )
  ).filter(i => i !== fail);
}

export const TFilterByProperty = async (
  targets: ElementHandle<Element>[],
  property: string,
  filterFn: (property: any) => Promise<boolean>
): Promise<ElementHandle<Element>[]> => {
  return await filter(targets, async (t: ElementHandle<Element>) => {
    const bool = await filterFn(
      (await (await t.getProperty(property)).jsonValue()) as any
    );
    return bool;
  });
};

export const reservationDevelop = (reservationHooks: any) => {
  const target = $(".DayPicker-Day").not(".DayPicker-Day--disabled");
  if (target.length > 2) {
    target[0].click();
    target[1].click();
  }

  const { setBookerInfo } = reservationHooks;
  setTimeout(() => {
    $(".roomTypeCard__selectButton")[0].click();
    setBookerInfo({
      agreePrivacyPolicy: true,
      email: "colton950901@gmail.com",
      memo: "테스트",
      name: "개발테스터",
      password: "#rammus123",
      phoneNumber: "010-5237-4492"
    });
    setTimeout(() => {
      $("#ResvBtn").click();
    }, 100);
  }, 2000);
};
