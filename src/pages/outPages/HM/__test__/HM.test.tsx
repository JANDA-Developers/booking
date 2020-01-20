import {
  testReady,
  TType,
  TClick,
  TUpload,
  expectOkFromGraphql,
  S,
  TWaitVsible,
  TEInnerText
} from "../../../../__test__/utils.test";
import faker from "faker";
import { ElementHandle } from "puppeteer";

// TODO
// 아직 언어는 확인 안합니다.
// 아직 이미지는 확인 안합니다.
// 아직 비디오는 확인 안합니다.
// 타이틀 부분을 채워넣음
const updateTitleSection = async () => {
  await page.waitForSelector("#HMtitleInput");
  await TType("#HMtitleInput", faker.name.lastName());
  await TUpload(
    "#BackImgUploader .imageUploader--input__button",
    faker.image.imageUrl()
  );
};

// 메뉴안의 내용을 적어넣음
const typeInMenu = async (menuTitle: ElementHandle<Element>) => {
  await menuTitle.click();
  const target = await menuTitle.$(".TMenuInfoTxt");
  if (target) await target.type(faker.lorem.words(1));
};

// 업데이트 된것을 확인
// 모든 인풋이 채워져 있는지를 봄
const updateCheck = async () => {
  await TClick("#HMsaveBtn");
  await expectOkFromGraphql();
  await TWaitVsible(".HM");
  const title = await page.$eval(".THMtitle", el => el.innerHTML);
  await expect(title).not.toBe("");

  const menuTtitles = await page.$$(".HM .rc-menu-submenu");
  for (const menuTitle of menuTtitles) {
    await menuTitle.click();
  }

  const subMenus = await page.$$(".HM .TmenuContent");
  for (const subMenu of subMenus) {
    const innerText = await TEInnerText(subMenu);
    await expect(innerText).not.toBeFalsy();
  }
};

//  업데이트 총괄
export const HmUpdate = async () => {
  await updateTitleSection();

  const menuTtitles = await page.$$(".TmenuTitle");
  for (const [i, menuTitle] of menuTtitles.entries()) {
    await typeInMenu(menuTitle);
  }
  await updateCheck();
};

export const HmUpdateTest = async () => {
  test(
    "HM update",
    async () => {
      await HmUpdate();
    },
    20 * S
  );
};

export default "w";
