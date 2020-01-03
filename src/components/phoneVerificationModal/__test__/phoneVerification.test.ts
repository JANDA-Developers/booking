import puppeteer from "puppeteer";
import {
  Ttype,
  takeShot,
  expectOkFromGraphql,
  responseResultCheck
} from "../../../__test__/utils.test";

export const phoneVerification = async (page: puppeteer.Page) => {
  await takeShot(page, "pc", "start__phoneVerifi");
  await page.waitForSelector("#phoneVerification");
  await page.click("#StarterHeaderPhoneVerificationBtn");
  const key = await responseResultCheck(
    page,
    "StartPhoneVerification",
    "error"
  );
  await Ttype(page, "#verifiKeyInput", key as any);
  // Complete StartPhoneVerification
  await takeShot(page, "pc", "phoneVerifi--modal.jpeg", "start");
  await page.click("#verfiCompleteBtn");
  await expectOkFromGraphql(page);
};
test.skip("skip", () => { });
