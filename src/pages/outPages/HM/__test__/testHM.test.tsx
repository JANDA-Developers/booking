import { testReady, S } from "../../../../__test__/utils.test";
import { HmUpdate } from "./HM.test";

describe("HM update", () => {
  beforeAll(async () => {
    await testReady(false, "HMconfig", {});
  });
  test(
    "HM update",
    async () => {
      await HmUpdate();
    },
    20 * S
  );
});
