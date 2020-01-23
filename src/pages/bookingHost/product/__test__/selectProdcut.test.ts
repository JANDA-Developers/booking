import { takeShot, expectOkFromGraphql, TWaitS, TClick } from "../../../../__test__/utils.test";

export const selectProduct = async () => {
  await TWaitS("#selectProducts");
  await takeShot("productSelect--start");
  await TWaitS("#Product1");
  await TClick("#Product1");
  await TWaitS("#ApplyStepDescBtn");
  await TClick("#ApplyStepDescBtn");
  await TWaitS("#ApplyStepEndBtn");
  await TClick("#ApplyStepEndBtn");
  await takeShot("productSelect");
  await expectOkFromGraphql();
};
