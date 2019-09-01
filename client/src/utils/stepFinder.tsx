import {IContext} from "../pages/MiddleServerRouter";
import {HouseStatus} from "../types/enum";
import isEmpty from "./isEmptyData";

export type IStepsStart =
  | "phoneVerification"
  | "houseMake"
  | "makeProduct"
  | "readyAssign"
  | "makeRoom"
  | "done";

const stepFinder = (context: IContext): IStepsStart => {
  const {house, applyedProduct, user} = context;

  let step: IStepsStart = "phoneVerification";

  // findCurrent Step
  if (user.isPhoneVerified) {
    step = "houseMake";
  }
  if (house) {
    step = "makeProduct";
    if (applyedProduct) {
      step = "readyAssign";
      if (house.status === HouseStatus.ENABLE) {
        step = "makeRoom";

        if (!isEmpty(house.roomTypes)) {
          step = "done";
        }
      }
    }
  }

  return step;
};

export default stepFinder;
