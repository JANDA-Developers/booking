import { testCreateUser } from "./singUp.test";
import { testReady } from "../../../../__test__/utils.test";

test("testSignUp", async () => {
  await testReady(false, undefined, false);
  await testCreateUser();
});

export default "";
