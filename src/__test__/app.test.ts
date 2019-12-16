import puppeteer from "puppeteer";
import faker from "faker";
import muResult from "../utils/mutationResultSafty";
import { ExecutionResult } from "graphql";

const REGEXP_PW = /^(?=.*[0-9])(?=.*[!@#$%^&*_\-~;?/])[a-zA-Z0-9!@#$%^&*_\-~;?/]{7,15}$/gi;

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
});

// 2. User can login
describe("User can do first process", async () => {
  test("Signup Correctly", async () => {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector("#loginPage");
    await page.click("#linkToSingUp");
    await page.waitForSelector("#signUpPage");
    await page.click("#singupName");
    await page.type(
      "#singupName",
      faker.name.firstName() + faker.name.lastName()
    );
    const randomePW = "#rammus123";
    await page.click("#singupPassword");
    await page.type("#singupPassword", randomePW);
    await page.click("#singupPasswordCheck");
    await page.type("#singupPasswordCheck", randomePW);
    await page.click("#singupEamil");
    await page.type("#singupEamil", faker.internet.email());
    await page.click("#singupPhoneNumber");
    await page.type(
      "#singupPhoneNumber",
      faker.phone.phoneNumber("010#######")
    );
    await page.click("#RD1");
    // await page.click("#RD1--1");
    await page.click("#singupBtn");
    const response = await page.waitForResponse(
      response => {
        return response
          .request()
          .url()
          .includes("graphql");
      },
      {
        timeout: 10000
      }
    );
    expect(response.ok() === true);
  }, 20000);

  test("Phone Verification Correctly", async () => {
    await page.waitForSelector("#phoneVerification");
    await page.click("#StarterHeaderPhoneVerificationBtn");
    const response = await page.waitForResponse(
      response => {
        return response
          .request()
          .url()
          .includes("graphql");
      },
      {
        timeout: 10000
      }
    );
    expect(response.ok() === true);
    const resultValidate: ExecutionResult<any> = (await response.json()) as any;
    expect(muResult(resultValidate, "StartPhoneVerification") === true);
  });
});
