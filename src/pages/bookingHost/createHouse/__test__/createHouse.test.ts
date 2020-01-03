import puppeteer from "puppeteer";
import faker from "faker";
import {
  Ttype,
  Tselect,
  takeShot,
  expectOkFromGraphql,
  S
} from "../../../../__test__/utils.test";

export const makeHouse = async () => {
  await page.waitForSelector("#HouseName");
  await Ttype("#HouseName", faker.name.jobType());
  await Tselect("#HouseType");
  await Ttype("#Adress", "창원시");
  await Ttype("#AdressDetail", faker.address.city());
  await takeShot("pc", "makeHouse");
  await page.waitFor(3 * S);
  // page.clickAdressDetail.test__googleMapWrap;
  await page.click("#CreateHouseSubmitBtn");
  await expectOkFromGraphql();
};

test.skip("", () => { });
