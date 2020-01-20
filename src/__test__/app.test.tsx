import {
  S,
  testReady,
  TWaitClick,
  expectOkFromGraphql,
  TWait,
  takeShot
} from "./utils.test";
import { makeHouse } from "../pages/bookingHost/createHouse/__test__/createHouse.test";
import { testCreateUser } from "../pages/bookingHost/signUp/__test__/singUp.test";
import { phoneVerification } from "../components/phoneVerificationModal/__test__/phoneVerification.test";
import {
  deleteRoom,
  deleteRoomTypes,
  createRoom,
  createRoomType
} from "../pages/bookingHost/roomConfig/__test__/roomConfig.test";
import { fillCardInfo } from "../pages/bookingHost/myPage/components/cardModal.tsx/__test__/cardModal.test";

describe("First Process", () => {
  beforeAll(async () => {
    await testReady(true, undefined, {
      email: "Alyce46@hotmail.com"
    });
  });

  test(
    "Signup Correctly",
    async () => {
      await testCreateUser();
    },
    10 * S
  );

  test(
    "Phone Verification Correctly",
    async () => {
      await phoneVerification();
    },
    10 * S
  );

  test(
    "Make House Correctly",
    async () => {
      await makeHouse(true);
    },
    10 * S
  );

  test(
    "Create Room Type Correctly",
    async () => {
      await createRoomType("Domitory");
    },
    10 * S
  );

  test(
    "Create Room Correctly",
    async () => {
      await createRoom(0);
    },
    5 * S
  );

  test.skip(
    "Delete Room Correctly",
    async () => {
      await deleteRoom();
    },
    20 * S
  );
  test.skip(
    "Delete RoomTypes Correctly",
    async () => {
      await deleteRoomTypes();
    },
    30 * S
  );

  test("Input card", async () => {
    await TWaitClick("#NextBtnToCard");
    await page.waitForSelector("#CardModal__CardNumber");
    await fillCardInfo();
  });

  test("Finish start process", async () => {
    await TWaitClick("#NextBtnToFinish");
    await TWaitClick("#SettingFinishBtn");
    await expectOkFromGraphql();
  });

  afterAll(async () => {
    await TWait(1000);
    await takeShot("DashBoard");
  });
});
