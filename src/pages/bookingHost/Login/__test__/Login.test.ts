import puppeteer from "puppeteer";
import {
  Ttype,
  takeShot,
  expectOkFromGraphql
} from "../../../../__test__/utils.test";

export const TLogin = async (email: string) => {
  await page.waitForSelector("#LoginEmail");
  await Ttype("#LoginEmail", email);
  await Ttype("#LoginPassword", "#rammus123");

  await takeShot("pc", "signIn");
  await page.click("#LoginBtn");
  await expectOkFromGraphql();
};
test.skip("skip", () => { });
