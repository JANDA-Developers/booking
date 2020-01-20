import { TClick, toastCheck, testReady } from "../../../../__test__/utils.test";
import { insertResv } from "./reservation.test";
import { insertBookingModal } from "../../../../components/bookingModal/__test__/bookingModal.test";
import { unSendSmsModal } from "../../../../components/smsModal/__test__/sendSmsModal.test";

describe.skip("reservation", () => {
  beforeAll(async () => {
    await testReady(true, undefined, {});
  });

  test("Do ReservationProcess With Host", async () => {
    await TClick("#CreateResvModalUpBtn");
    await insertResv();
    await insertBookingModal();
    await unSendSmsModal();
    await toastCheck("StartBooking");
  });

  test.skip("Do Reservation Process With Guest", async () => {
    await page.goto("");
  });
});

export default "";
