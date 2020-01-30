import {
  testReady,
  S,
  urlBase,
  takeShot,
  TType,
  toastCheck,
  TWaitS
} from "../../../../../../__test__/utils.test";
import { TestCardNumberSecret, TestCardExpSecret, TestCardPW2Secret, TestCardHolder, TestIdNum } from "../../../../../../../envs/secret";

// Fill Card Info
export const fillCardInfo = async () => {
  await TType("#CardModal__CardNumber", TestCardNumberSecret);
  await TType("#CardModal__ExpireDate", TestCardExpSecret);
  await TType("#CardModal__CardPW", TestCardPW2Secret);
  await TType("#CardModal__IdNum", TestIdNum);
}

// TODO
export const cardDelete = () => { };
export const cardCeate = () => { };

export const cardModalTest = () => {
  describe.skip("Card Modal Test register and delete", () => {

    beforeAll(async () => {
      await testReady(true,
        `${urlBase}/#/myPage`,
        {}
      );
    }, 20 * S);

    test("Open Card Modal", async () => {
      await TWaitS("#myPage");
      expect(page.url() === `${urlBase}/#/myPage`).toEqual(true);
      await page.waitForSelector(".payTabIn", { timeout: 5 * S });
      await page.click(".payTabIn");
      await page.waitFor(1 * S);
      await TWaitS("#CreaditCardChangeBtn");
      await page.click("#CreaditCardChangeBtn");
      await TWaitS("#CardViewr");
      await takeShot("cardModal");
    });

    test(
      "Card register Complete",
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
