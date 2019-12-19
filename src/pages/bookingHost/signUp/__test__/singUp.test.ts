import puppeteer from "puppeteer";
import faker from "faker";
import chalk from "chalk";
import {
  Ttype,
  takeShot,
  expectOkFromGraphql
} from "../../../../__test__/utils.test";

export const testCreateUser = async (page: puppeteer.Page) => {
  await page.waitForSelector("#linkToSingUp");
  await page.click("#linkToSingUp");
  await page.waitForSelector("#signUpPage");
  await page.click("#singupName");
  await Ttype(
    page,
    "#singupName",
    faker.name.firstName() + faker.name.lastName()
  );
  const randomePW = "#rammus123";
  await Ttype(page, "#singupPassword", randomePW);
  await Ttype(page, "#singupPasswordCheck", randomePW);
  const randomeEm = faker.internet.email();
  console.log(chalk.green.bold(`${randomeEm}`));
  await Ttype(page, "#singupEamil", randomeEm);
  await Ttype(
    page,
    "#singupPhoneNumber",
    faker.phone.phoneNumber("010#######")
  );
  await page.click("#RD1");
  await takeShot(page, "pc", "singUp");
  await page.click("#singupBtn");
  await expectOkFromGraphql(page);
};

test.skip("skip", () => {});
