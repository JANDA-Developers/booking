import puppeteer from "puppeteer";
import faker from "faker";

// 1. User can signup
// 2. User can login
describe("User can do first process", () => {
  test("signup Correctly", async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector("#loginPage");
    await page.click("#linkToSingUp");
    await page.waitForSelector("#signUpPage");
    await page.click("#singupName");
    await page.type(
      "#singupName",
      faker.name.firstName() + faker.name.lastName()
    );
    await page.click("#singupPassword");
    await page.type("#singupPassword", faker.internet.password());
    await page.click("#singupPasswordCheck");
    await page.type("#singupPasswordCheck", faker.internet.password());
    await page.click("#singupEamil");
    await page.type("#singupEamil", faker.internet.email());
    await page.click("#singupPhoneNumber");
    await page.type("#singupPhoneNumber", faker.phone.phoneNumber());
    // await page.click("#RD1--1");
    await page.click("#singupBtn");

    await page.waitFor(1000);
    await page.screenshot({ path: "screenshot.png" });
    // how can i snapshop this page
    // How can i wait for response of singup request ?
    // jest ?  puppetter?  apollo?
  });
});
