import {
  testReady,
  S,
  urlBase,
  takeShot,
  TType,
  toastCheck
} from "../../../../../../__test__/utils.test";

// Fill Card Info
export const fillCardInfo = async () => {
  await TType("#CardModal__CardNumber", "4619541019492956");
  await TType("#CardModal__ExpireDate", "0824");
  await TType("#CardModal__CardPW", "41");
  await TType("#CardModal__IdNum", "950901");
}

// TODO
export const cardDelete = () => { };
export const cardCeate = () => { };

export const cardModalTest = () => {
  describe.skip("Card Modal Test regist and delete", () => {

    beforeAll(async () => {
      await testReady(true,
        `${urlBase}/#/myPage`,
        {}
      );
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
      await takeShot("cardModal");
    });

    test(
      "Card Regist Complete",
      async () => {
        await fillCardInfo();
        await page.click("#CardModal__CardRegistBtn");
        await toastCheck("RegisterBillKey");
      },
      60 * S
    );
  });
};

cardModalTest();
