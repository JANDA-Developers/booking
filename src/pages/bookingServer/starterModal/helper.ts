import { IContext } from "../../../pages/bookingServer/MiddleServerRouter";
import { HouseStatus } from "../../../types/enum";

export type IStepsStart =
  | "phoneVerification"
  | "houseCreate"
  | "createProduct"
  | "readyAssign"
  | "createRoom"
  | "done";

// 사용자가 시작단계중 어디까지 왔는지 체크함
const stepFinder = (context: IContext): IStepsStart => {
  const { house, applyedProduct, user } = context;

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
