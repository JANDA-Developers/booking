import puppeteer from "puppeteer";
import {
  testReady,
  S,
  urlBase,
  takeShot,
  Ttype,
  toastCheck
} from "../../../../../../__test__/utils.test";

export const cardDelete = () => {};
export const cardCeate = () => {};

let page: puppeteer.Page;

export const cardModalTest = () => {
  describe("Card Modal Test regist and delete", () => {
    beforeAll(async () => {
      const { page: callBackPage } = await testReady(
        `${urlBase}/#/myPage`,
        {},
        { slowMo: 10 }
      );
      page = callBackPage;
    }, 20 * S);

    test("Open Card Modal", async () => {
      await page.waitForSelector("#myPage");
      expect(page.url() === `${urlBase}/#/myPage`).toEqual(true);
      await page.waitForSelector(".payTabIn", { timeout: 5 * S });
      await page.click(".payTabIn");
      await page.waitFor(1 * S);
      await page.waitForSelector("#CreaditCardChangeBtn");
      await page.click("#CreaditCardChangeBtn");
      await page.waitForSelector("#CardViewr");
      await takeShot(page, "pc", "cardModal");
    });

    test(
      "Card Regist Complete",
      async () => {
        await Ttype(page, "#CardModal__CardNumber", "4619541019492956");
        await Ttype(page, "#CardModal__ExpireDate", "0824");
        await Ttype(page, "#CardModal__CardPW", "41");
        await Ttype(page, "#CardModal__IdNum", "950901");
        await page.click("#CardModal__CardRegistBtn");
        await toastCheck(page, "RegisterBillKey");
      },
      60 * S
    );
  });
};

cardModalTest();
