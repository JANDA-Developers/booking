import { IContext } from "../pages/bookingHost/BookingHostRouter";

export type IStepsStart =
  | "phoneVerification"
  | "houseCreate"
  | "createRoom"
  | "card"
  | "check";

const stepFinder = (context: IContext): IStepsStart => {
  const { user } = context;
  const { isPhoneVerified } = user;

  let step: IStepsStart = "phoneVerification";
  if (isPhoneVerified) step = "houseCreate";

  return step;
};

export default stepFinder;
