import {
  TType,
  TClick,
  expectOkFromGraphql,
  TCheckValue
} from "../../../../../../__test__/utils.test";

export const UpdateUserProfile = async () => {
  await TType("#UserAccountNumberInput", "110427849812");
  await TType("#UserBankNameInput", "신한");
  await TType("#UserEmailNumberInput", "crawl123@naver.com");
  await TType("#UserDepositorInput", "김민재");
  await TType("#UserProfileNameInput", "김민재");
  await TType("#UserProfilePhoneNumberInput", "010-5237-4492");
  await TClick("#ChangeProfileBtn");
  await TType("#ChangeUserProfilePWInput", "#rammus123");
  await TClick("#ChangeProfileModalChangeBtn");
  await expectOkFromGraphql();
};

export const UpdateCheckUserProfile = async () => {
  await page.reload();
  await TCheckValue("#UserAccountNumberInput", "110427849812");
  await TCheckValue("#UserBankNameInput", "신한");
  await TCheckValue("#UserEmailNumberInput", "crawl123@naver.com");
  await TCheckValue("#UserDepositorInput", "김민재");
  await TCheckValue("#UserProfileNameInput", "김민재");
  await TCheckValue("#UserProfilePhoneNumberInput", "010-5237-4492");
};
