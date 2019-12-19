import puppeteer from "puppeteer";
import faker from "faker";
import {
  Ttype,
  Tselect,
  Tupload,
  takeShot,
  toastCheck,
  S,
  expectOkFromGraphql
} from "../../../../__test__/utils.test";

export const createRoomType = async (
  page: puppeteer.Page,
  type: "Domitory" | "Room",
  count?: number
) => {
  await page.click("#AddRoomTypeBtn");
  await page.waitForSelector("#RoomTypeName");
  await Ttype(page, "#RoomTypeName", faker.random.word("fruit"));
  await Tselect(page, "#CapacitySelecter", count);

  await Tupload(page, "#RoomTypeImgUploader", "/devImg/RoomT1.jpg");
  await takeShot(page, "pc", "roomTypeModal");

  await Tselect(page, "#CapacitySelecter", count);
  await Tselect(page, "#RoomTypeGenderSelecter", faker.random.number(4));
  await Tselect(
    page,
    "#RoomTypeTypeSelecter",
    faker.random.number(type === "Domitory" ? 0 : 1)
  );
  await Ttype(page, "#RoomTypeDecs", faker.random.words(10));
  await Ttype(
    page,
    "#RoomTypeBasicPrice",
    faker.random.number(100000).toString()
  );
  await page.click("#DoCreateBtn");
  await toastCheck(page, "CreateRoomType");
};

export const deleteRoomTypes = async (
  page: puppeteer.Page,
  roomTypeIndex: number
) => {
  await page.waitForSelector(`#RoomTypeModifyBtn${roomTypeIndex}`, {
    timeout: 10 * S
  });
  await page.click(`#RoomTypeModifyBtn${roomTypeIndex}`);
  await expectOkFromGraphql(page);
  await page.waitForSelector("#DoDeleteBtn", {
    timeout: 5 * S
  });
  await page.click("#DoDeleteBtn");
  await toastCheck(page, "DeleteRoomType");
  await page.waitFor(10 * S);
};

export const updateRoomTypes = async (page: puppeteer.Page) => {
  await page.waitForSelector("#RoomConfig");
  await page.click("#AddRoomTypeBtn");
};

export const createRoom = async (
  page: puppeteer.Page,
  roomTypeIndex: number
) => {
  await page.waitForSelector(`#AddRoomBtn${roomTypeIndex}`);
  await page.click(`#AddRoomBtn${roomTypeIndex}`);
  await page.waitForSelector("#RoomName");
  await Ttype(page, "#RoomName", faker.random.number(100).toString());
  await page.click(`#RoomModalAddBtn`);
  await toastCheck(page, "CreateRoom");
};

const updateRoom = async (page: puppeteer.Page) => {
  await page.waitForSelector("#RoomConfig");
  await page.click("#AddRoomTypeBtn");
};

export const deleteRoom = async (page: puppeteer.Page) => {
  await page.waitFor(5 * S);
  await page.waitForSelector("#RoomBox1");
  await page.click("#RoomBox1");
  await page.waitForSelector("#RoomModalDeleteBtn");
  await page.click("#RoomModalDeleteBtn");
  await toastCheck(page, "DeleteRoom");
  // Time For Refetch
  await page.waitFor(10 * S);
};

test.skip("skip", () => {});
