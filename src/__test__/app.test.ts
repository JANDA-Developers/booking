import puppeteer from "puppeteer";

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
  });
});
