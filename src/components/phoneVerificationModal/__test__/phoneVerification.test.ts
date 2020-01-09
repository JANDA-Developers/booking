import puppeteer from "puppeteer";
import {
  TType,
  takeShot,
  expectOkFromGraphql,
  responseResultCheck
} from "../../../__test__/utils.test";

export const phoneVerification = async () => {
  await takeShot("pc", "start__phoneVerifi");
  await page.waitForSelector("#phoneVerification");
  await page.click("#StarterHeaderPhoneVerificationBtn");
  const key = await responseResultCheck(
    "StartPhoneVerification",
    "error"
  );
  await TType("#verifiKeyInput", key as any);
  // Complete StartPhoneVerification
  await takeShot("pc", "phoneVerifi--modal.jpeg", "start");
  await page.click("#verfiCompleteBtn");
  await expectOkFromGraphql();
};
test.skip("skip", () => { });
