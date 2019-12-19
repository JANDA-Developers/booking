import puppeteer from "puppeteer";
import {
  Ttype,
  takeShot,
  expectOkFromGraphql
} from "../../../../__test__/utils.test";

export const TLogin = async (page: puppeteer.Page, email: string) => {
  await page.waitForSelector("#LoginEmail");
  await Ttype(page, "#LoginEmail", email);
  await Ttype(page, "#LoginPassword", "#rammus123");

  await takeShot(page, "pc", "signIn");
  await page.click("#LoginBtn");
  await expectOkFromGraphql(page);
};
test.skip("skip", () => {});
