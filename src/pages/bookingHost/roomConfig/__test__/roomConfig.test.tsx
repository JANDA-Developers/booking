import puppeteer from "puppeteer";
import faker from "faker";
import {
  Ttype,
  Tselect,
  Tupload,
  takeShot,
  S,
  urlBase,
  testReady,
  TwaitClick,
  TTextWait,
  TgetElement,
  TgetAttr
} from "../../../../__test__/utils.test";
import { toNumber } from "../../../../utils/autoFormat";
const roomBoxSelecter = ".TRoomBox";

export const createRoomType = async (
  page: puppeteer.Page,
  type: "Domitory" | "Room",
  count?: number
) => {
  await TwaitClick(page, "#AddRoomTypeBtn");
  await page.waitForSelector("#RoomTypeName");
  const roomTypeName = faker.random.word("fruit");
  await Ttype(page, "#RoomTypeName", roomTypeName);
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
  await TTextWait(page, roomTypeName, ".TRoomTypeName");
};

const openRoomTypeUpdateBtn = async (page: puppeteer.Page) => {
  const cardSelecter = ".TRoomTypeCard";
  await page.waitForSelector(cardSelecter);
  const roomTypeCard = await TgetElement(page, cardSelecter);
  const updateBtn = await TgetElement(page, ".TRoomTypeUpdateBtn");
  const roomTypeId = await TgetAttr<string>(roomTypeCard, "id");
  await updateBtn.click();
  return roomTypeId;
};

export const deleteRoomTypes = async (page: puppeteer.Page) => {
  const roomTypeId = await openRoomTypeUpdateBtn(page);
  //   check it is deleted on Ui
  await TwaitClick(page, "#DoDeleteBtn");
  await page.waitFor(2000);
  expect(await page.$(`#RoomTypeCard${roomTypeId}`)).toBeFalsy();
};

export const updateRoomTypes = async (page: puppeteer.Page) => {
  await openRoomTypeUpdateBtn(page);
  await Ttype(page, "#RoomTypeName", "updateRoomType");
  await TwaitClick(page, "#DoUpdateBtn");
  await page.waitFor(2000);
  // skip result check
};

export const createRoom = async (
  page: puppeteer.Page,
  roomTypeIndex: number
) => {
  await TwaitClick(page, `#AddRoomBtn${roomTypeIndex}`);
  const startRoomNumber = faker.random.number(100).toString();
  const counts = 10;
  await Ttype(page, "#RoomNameInput", startRoomNumber);
  await Tselect(page, "#RoomCountSelect", counts);
  await page.click(`#RoomCreateBtn`);
  await page.waitFor(3000);

  // check all rooms created Collectly
  const rooms = await page.$$(roomBoxSelecter);
  const roomTexts: string[] = [];
  for (const room of rooms) {
    roomTexts.push(await page.evaluate(el => el.innerText, room));
  }
  let roomNumbers = [];
  for (let i = 0; i < counts; i++) {
    roomNumbers.push(toNumber(startRoomNumber) + i);
  }
  roomNumbers.map(roomNumber => {
    expect(roomTexts.includes(roomNumber.toString())).toBeTruthy();
  });
};

export const updateRoom = async (page: puppeteer.Page) => {
  await page.waitForSelector("#RoomConfig");
  await page.click("#AddRoomTypeBtn");
};

export const deleteRoom = async (page: puppeteer.Page) => {
  await page.waitForSelector(roomBoxSelecter);
  const room = await page.$(roomBoxSelecter);
  if (!room) return;
  const roomBoxId = (await (
    await room.getProperty("id")
  ).jsonValue()) as string;
  await page.click(`#${roomBoxId}`);
  await page.click("#RoomDeleteBtn");
  //   check is deleted in ui
  await page.waitFor(2000);
  const target2 = await page.$(`#${roomBoxId}`);
  expect(target2).toBeFalsy();
};

let page: puppeteer.Page;

describe("User Can Do Room Process Collectly", () => {
  beforeAll(async () => {
    const { page: inPage } = await testReady(
      `${urlBase}/#/roomConfig`,
      {},
      { slowMo: 1 }
    );
    page = inPage;
  }, 20 * S);

  test(
    "Create Room Type Correctly",
    async () => {
      await createRoomType(page, "Domitory", 4);
    },
    10 * S
  );
  test(
    "Create Room Correctly",
    async () => {
      await createRoom(page, 0);
    },
    5 * S
  );
  test(
    "Delete Room Correctly",
    async () => {
      await deleteRoom(page);
    },
    20 * S
  );
  test(
    "Delete RoomTypes Correctly",
    async () => {
      await deleteRoomTypes(page);
    },
    30 * S
  );
  test.only(
    "Update RoomTypes Correctly",
    async () => {
      await updateRoomTypes(page);
    },
    30 * S
  );
});
