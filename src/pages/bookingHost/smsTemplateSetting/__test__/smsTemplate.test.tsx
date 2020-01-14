import {
  TWaitClick,
  testReady,
  TType,
  Tselect,
  expectOkFromGraphql,
  TCheckString,
  TExist,
  TGetId,
  TWaitVsible,
  TClick,
  TWait,
  TWaitTill
} from "../../../../__test__/utils.test";
import faker from "faker";

const createSMSTemplate = async () => {
  await TWaitClick("#TemplateCreateBtn");
  const title = faker.address.county();
  await TType("#TemplateTitleInput", title);
  await TType("#MessageInput", faker.lorem.sentence());
  await Tselect("#AutoSendSelect", 1);
  await Tselect("#SendTagetSelect", 1);
  await TClick("#EnableSwitch");
  await TClick("#CreateTemplateBtn");
  await expectOkFromGraphql();
  await TCheckString(".TSmsTemplateCard", title);
};

const deleteSMSTemplate = async () => {
  const idSelecter = await TGetId(".TSmsTemplateCard", true);
  await TClick(idSelecter);
  await TWaitVsible("#TemplateTitleInput");
  await TWaitClick("#DeleteTemplateBtn");
  await expectOkFromGraphql();
  const tryFn = async () => {
    await TExist(idSelecter, false);
  };
  await TWaitTill(1, tryFn);
};

const updateSMSTemplate = async () => {
  const idSelecter = await TGetId(".TSmsTemplateCard", true);
  const title = faker.address.county();
  await TClick(idSelecter);
  await TWaitVsible("#TemplateTitleInput");
  await TType("#TemplateTitleInput", title + "update");
  await TWaitClick("#UpdateTemplateBtn");
  await expectOkFromGraphql();
  await TWait(1);
  await TCheckString(idSelecter, title + "update");
};

describe.skip("Template Process", () => {
  beforeAll(async () => {
    await testReady(true, "smsTemplate", {});
  });

  test.skip("Make sms template", async () => {
    await createSMSTemplate();
  });

  test("delete sms template", async () => {
    await deleteSMSTemplate();
  }, 20000);

  test("update sms template", async () => {
    await updateSMSTemplate();
  }, 10000);
});

export const a = "";
