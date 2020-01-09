import faker from "faker";
import {
  TWaitClick,
  TType,
  Tselect,
  TClick
} from "../../../__test__/utils.test";

export const createBookingModal = async () => {
  await TWaitClick("#CreateResvModalUpBtn");
  await TType("#BookerNameInput", faker.name.firstName());
  await TType("#BookerPhoneInput", faker.phone.phoneNumber("###########"));
  await Tselect("#FunnelSelect", 1);
  await TClick("#BookingModalCreateBtn");
  await Tselect("#PayMethodSelect", 1);
};

test.skip("foo", () => {});
