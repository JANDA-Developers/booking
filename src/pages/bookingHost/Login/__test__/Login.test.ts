import puppeteer from "puppeteer";
import {
  TType,
  takeShot,
  expectOkFromGraphql
} from "../../../../__test__/utils.test";

export const TLogin = async (email: string) => {
  await page.waitForSelector("#LoginEmail");
  await TType("#LoginEmail", email);
  await TType("#LoginPassword", "#rammus123");

  await takeShot("signIn");
  await page.click("#LoginBtn");
  await expectOkFromGraphql();
};
test.skip("skip", () => { });
