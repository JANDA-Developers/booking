import puppeteer from "puppeteer";
import { takeShot, expectOkFromGraphql } from "../../../../__test__/utils.test";

export const selectProduct = async (page: puppeteer.Page) => {
  await page.waitForSelector("#selectProducts");
  await takeShot(page, "pc", "productSelect", "start");
  await page.waitForSelector("#Product1");
  await page.click("#Product1");
  await page.waitForSelector("#ApplyStepDescBtn");
  await page.click("#ApplyStepDescBtn");
  await page.waitForSelector("#ApplyStepEndBtn");
  await page.click("#ApplyStepEndBtn");
  await takeShot(page, "pc", "productSelect", "start");
  await expectOkFromGraphql(page);
};
