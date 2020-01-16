import faker from "faker";
import {
  TType,
  Tselect,
  TUpload,
  takeShot,
  S,
  testReady,
  TWaitClick,
  TgetElement,
  TgetAttr
} from "../../../../__test__/utils.test";
import { toNumber } from "../../../../utils/autoFormat";
const roomBoxSelecter = ".TRoomBox";

export const createRoomType = async (
  type: "Domitory" | "Room",
  count?: number
) => {
  await TWaitClick("#AddRoomTypeBtn");
  await page.waitForSelector("#RoomTypeName");
  const roomTypeName = faker.random.word("fruit");
  await TType("#RoomTypeName", roomTypeName);
  await Tselect("#CapacitySelecter", count || 4);

  await TUpload("#RoomTypeImgUploader", "/devImg/RoomT1.jpg");
  await takeShot("roomTypeModal");

  await Tselect("#RoomTypeGenderSelecter", faker.random.number(4));
  await Tselect(
    "#RoomTypeTypeSelecter",
    faker.random.number(type === "Domitory" ? 0 : 1)
  );
  await TType("#RoomTypeDecs", faker.random.words(10));
  await TType("#RoomTypeBasicPrice", faker.random.number(100000).toString());
  await page.click("#DoCreateBtn");
};

const openRoomTypeUpdateBtn = async () => {
  const cardSelecter = ".TRoomTypeCard";
  await page.waitForSelector(cardSelecter);
  const roomTypeCard = await TgetElement(cardSelecter);
  const updateBtn = await TgetElement(".TRoomTypeUpdateBtn");
  const roomTypeId = await TgetAttr<string>(roomTypeCard, "id");
  await updateBtn.click();
  return roomTypeId;
};

export const deleteRoomTypes = async () => {
  const roomTypeId = await openRoomTypeUpdateBtn();
  //   check it is deleted on Ui
  await TWaitClick("#DoDeleteBtn");
  await page.waitFor(2000);
  expect(await page.$(`#RoomTypeCard${roomTypeId}`)).toBeFalsy();
};

export const updateRoomTypes = async () => {
  await openRoomTypeUpdateBtn();
  await TType("#RoomTypeName", "updateRoomType");
  await TWaitClick("#DoUpdateBtn");
  await page.waitFor(2000);
  // skip result check
};

export const createRoom = async (roomTypeIndex: number) => {
  await TWaitClick(`#AddRoomBtn${roomTypeIndex}`);
  const startRoomNumber = faker.random.number(100).toString();
  const counts = 10;
  await TType("#RoomNameInput", startRoomNumber);
  await Tselect("#RoomCountSelect", counts);
  await page.click(`#RoomCreateBtn`);
  await page.waitFor(2000);

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

export const updateRoom = async () => {
  await page.waitForSelector("#RoomConfig");
  await page.click("#AddRoomTypeBtn");
};

export const deleteRoom = async () => {
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

describe.skip("Room Process", () => {
  beforeAll(async () => {
    await testReady(true);
  });
  test(
    "Create Room Type Correctly",
    async () => {
      await createRoomType("Domitory");
    },
    10 * S
  );
  test(
    "Create Room Correctly",
    async () => {
      await createRoom(0);
    },
    5 * S
  );
  test(
    "Delete Room Correctly",
    async () => {
      await deleteRoom();
    },
    20 * S
  );
  test(
    "Delete RoomTypes Correctly",
    async () => {
      await deleteRoomTypes();
    },
    30 * S
  );
  test(
    "Update RoomTypes Correctly",
    async () => {
      await updateRoomTypes();
    },
    30 * S
  );
});
