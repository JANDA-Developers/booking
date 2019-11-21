import {IContext} from "../pages/bookingHost/BookingHostRouter";
import {HouseStatus} from "../types/enum";

export type IStepsStart =
  | "phoneVerification"
  | "houseCreate"
  | "createProduct"
  | "readyAssign"
  | "createRoom"
  | "done";

const stepFinder = (context: IContext): IStepsStart => {
  const {house, applyedProduct, user} = context;

  let step: IStepsStart = "phoneVerification";

  // findCurrent Step
  if (user.isPhoneVerified) {
    step = "houseCreate";
  }
  if (house) {
    step = "createProduct";
    if (applyedProduct) {
      step = "readyAssign";
      if (house.status === HouseStatus.ENABLE) {
        step = "createRoom";
      }
    }
  }

  return step;
};

export default stepFinder;
