import puppeteer from "puppeteer";
import faker from "faker";
import chalk from "chalk";
import {
  Ttype,
  takeShot,
  expectOkFromGraphql
} from "../../../../__test__/utils.test";

export const testCreateUser = async () => {
  await page.waitForSelector("#linkToSingUp");
  await page.click("#linkToSingUp");
  await page.waitForSelector("#signUpPage");
  await page.click("#singupName");
  await Ttype(

    "#singupName",
    faker.name.firstName() + faker.name.lastName()
  );
  const randomePW = "#rammus123";
  await Ttype("#singupPassword", randomePW);
  await Ttype("#singupPasswordCheck", randomePW);
  const randomeEm = faker.internet.email();
  console.log(chalk.green.bold(`${randomeEm}`));
  await Ttype("#singupEamil", randomeEm);
  await Ttype(

    "#singupPhoneNumber",
    faker.phone.phoneNumber("010#######")
  );
  await page.click("#RD1");
  await takeShot("pc", "singUp");
  await page.click("#singupBtn");
  await expectOkFromGraphql();
};

test.skip("skip", () => { });
