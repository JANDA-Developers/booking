import { TClick, toastCheck, testReady } from "../../../../__test__/utils.test";
import {
  insertResv,
  gotoResvPage,
  fillUpBookerInfoForGuest,
  resvPayWithCard
} from "./reservation.test";
import { insertBookingModal } from "../../../../components/bookingModal/__test__/bookingModal.test";
import { unSendSmsModal } from "../../../../components/smsModal/__test__/sendSmsModal.test";

describe("reservation", () => {
  beforeAll(async () => {
    await testReady(false, undefined, {
      token: true
    });
  });

  test.skip("Do ReservationProcess By Host", async () => {
    await TClick("#CreateResvModalUpBtn");
    await insertResv();
    await insertBookingModal();
    await unSendSmsModal();
    await toastCheck("StartBooking");
  });

  test("Do ReservationProcess By Guest", async () => {
    await gotoResvPage();
    await insertResv();
    await fillUpBookerInfoForGuest();
    await resvPayWithCard();
  });
});

export default "";
