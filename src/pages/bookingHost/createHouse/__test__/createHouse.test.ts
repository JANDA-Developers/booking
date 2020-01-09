import faker from "faker";
import {
  TType,
  Tselect,
  takeShot,
} from "../../../../__test__/utils.test";

export const makeHouse = async (inStart: boolean) => {
  await page.waitForSelector("#HouseName");
  await TType("#HouseName", faker.name.jobType());
  await Tselect("#HouseType");
  await TType("#Adress", "창원시");
  await TType("#AdressDetail", faker.address.city());
  await takeShot("pc", "makeHouse");
  if (inStart) {
    await page.click("#NextBtnToRoomConfig");
  } else {
    await page.click("#CreateHouseSubmitBtn");
  }
};

test.skip("skip !", () => { });
