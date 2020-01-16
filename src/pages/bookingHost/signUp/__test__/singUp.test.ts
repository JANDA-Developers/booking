import faker from "faker";
import chalk from "chalk";
import {
  TType,
  takeShot,
  expectOkFromGraphql,
  TClick,
  TWait,
  TWaitClick
} from "../../../../__test__/utils.test";

export const testCreateUser = async () => {
  await TWaitClick("#linkToSingUp");
  await page.waitForSelector("#signUpPage");
  await TClick("#singupName");
  await TType(
    "#singupName",
    faker.name.firstName() + faker.name.lastName()
  );
  const randomePW = "#rammus123";
  await TType("#singupPassword", randomePW);
  await TType("#singupPasswordCheck", randomePW);
  const randomeEm = faker.internet.email();
  console.info(chalk.green.bold(`${randomeEm}`));
  await TType("#singupEamil", randomeEm);
  await TType(
    "#singupPhoneNumber",
    faker.phone.phoneNumber("010#######")
  );
  await TClick("#RD1");
  await takeShot("pc", "singUp");
  await TClick("#singupBtn");
  await expectOkFromGraphql();
};

test.skip("skip", () => { });
