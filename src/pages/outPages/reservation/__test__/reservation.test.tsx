import {
  testReady,
  TWaitClick,
  TClick,
  Tselect,
  toastCheck
} from "../../../../__test__/utils.test";
import { TFilterByProperty } from "../../../../utils/developMaster";
import { createBookingModal } from "../../../../components/bookingModal/__test__/bookingModal.test";
import { unSendSmsModal } from "../../../../components/smsModal/__test__/sendSmsModal.test";

export const createResvModal = async () => {
  const tweets = await page.$$(".DayPicker-Day");
  const d = await TFilterByProperty(
    tweets,
    "className",
    async property => !property.includes("DayPicker-Day--disabled")
  );

  await d[0].click();
  await d[1].click();

  // what if the select is not exsist by condition :o
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

describe("reservation", () => {
  beforeAll(async () => {
    await testReady(undefined, {});
  });

  test("Do ReservationProcess With Host", async () => {
    await TClick("#CreateResvModalUpBtn");
    await createResvModal();
    await createBookingModal();
    await unSendSmsModal();
    await toastCheck("StartBooking");
  });
});

export default "c";
