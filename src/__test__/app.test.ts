import puppeteer from "puppeteer";
import { S, testReady } from "./utils.test";
import {
  deleteRoomTypes,
  deleteRoom,
  createRoom,
  createRoomType
} from "../pages/bookingHost/config/__test__/roomConfig.test";
import { makeHouse } from "../pages/bookingHost/createHouse/__test__/createHouse.test";
import { selectProduct } from "../pages/bookingHost/product/__test__/selectProdcut.test";
import { testCreateUser } from "../pages/bookingHost/signUp/__test__/singUp.test";
import { phoneVerification } from "../components/phoneVerificationModal/__test__/phoneVerification.test";

let browser: puppeteer.Browser;
let page: puppeteer.Page;

describe("User Can Do First Process Correctly", () => {
  beforeAll(async () => {
    const obj = await testReady();
    browser = obj.browser;
    page = obj.page;
  });

  test(
    "Signup Correctly",
    async () => {
      await testCreateUser(page);
    },
    10 * S
  );

  test(
    "Phone Verification Correctly",
    async () => {
      await phoneVerification(page);
    },
    10 * S
  );

  test(
    "Make House Correctly",
    async () => {
      await makeHouse(page);
    },
    10 * S
  );

  test(
    "Select Product Correctly",
    async () => {
      await selectProduct(page);
    },
    10 * S
  );

  describe("Make Rooms Correctly", () => {
    beforeAll(async () => {
      await page.waitForSelector("#RoomConfig");
    });
    test(
      "Create Room Type Correctly",
      async () => {
        await createRoomType(page, "Domitory", 4);
      },
      10 * S
    );
    test(
      "Create Room Correctly",
      async () => {
        await createRoom(page, 0);
      },
      5 * S
    );
    test.skip(
      "Delete Room Correctly",
      async () => {
        await deleteRoom(page);
      },
      20 * S
    );
    test.skip(
      "Delete RoomTypes Correctly",
      async () => {
        await deleteRoomTypes(page, 0);
      },
      30 * S
    );
  });

  test("Finish start process", async () => {
    page.waitForSelector("#SettingFinishBtn");
    page.click("#SettingFinishBtn");
  });
});
