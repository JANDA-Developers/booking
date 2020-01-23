import { testReady, S } from "../../../../../../__test__/utils.test";
import { UpdateUserProfile, UpdateCheckUserProfile } from "./UserProfile.test";

describe("UserProfile", () => {
  beforeAll(async () => {
    await testReady(false, "mypage", {});
  });
  test(
    "TestUserProfile",
    async () => {
      await UpdateUserProfile();
      await UpdateCheckUserProfile();
    },
    20 * S
  );
});
