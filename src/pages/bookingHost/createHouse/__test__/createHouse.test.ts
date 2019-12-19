import puppeteer from "puppeteer";
import faker from "faker";
import {
  Ttype,
  Tselect,
  takeShot,
  expectOkFromGraphql,
  S
} from "../../../../__test__/utils.test";

export const makeHouse = async (page: puppeteer.Page) => {
  await page.waitForSelector("#HouseName");
  await Ttype(page, "#HouseName", faker.name.jobType());
  await Tselect(page, "#HouseType");
  await Ttype(page, "#Adress", "창원시");
  await Ttype(page, "#AdressDetail", faker.address.city());
  await takeShot(page, "pc", "makeHouse");
  await page.waitFor(3 * S);
  // page.clickAdressDetail.test__googleMapWrap;
  await page.click("#CreateHouseSubmitBtn");
  await expectOkFromGraphql(page);
};

test.skip("", () => {});
