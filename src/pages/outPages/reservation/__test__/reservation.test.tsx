import { TWaitClick, TClick, Tselect } from "../../../../__test__/utils.test";
import { TFilterByProperty } from "../../../../utils/developMaster";

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

export default "c";
