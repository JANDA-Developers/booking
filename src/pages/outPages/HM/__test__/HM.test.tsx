import {
  testReady,
  TType,
  TClick,
  TUpload,
  expectOkFromGraphql,
  S
} from "../../../../__test__/utils.test";
import faker from "faker";

const HmUpdate = async () => {
  await page.waitForSelector("#HMtitleInput");
  await TType("#HMtitleInput", faker.name.lastName());
  await TUpload(
    "#BackImgUploader .imageUploader--input__button",
    faker.image.imageUrl()
  );
  await TClick(".THMmenu");
  await TType(".TMenuInfoTxt", faker.lorem.words(3));
  await TUpload(
    ".TMenuImgUploader .imageUploader--input__button",
    faker.image.imageUrl()
  );
  await TClick("#HMsaveBtn");
  await expectOkFromGraphql();
};

const HmUpdateTest = async () => {
  test(
    "HM update",
    async () => {
      await HmUpdate();
    },
    20 * S
  );
};

describe.skip("HM update", () => {
  beforeAll(async () => {
    await testReady(true, "HMconfig", {});
  });
  HmUpdateTest();
});

export default "w";
