import { IGuestD } from "../types/interface";
import { PricingType } from "../types/enum";

function isDomitoryGuest(guest: any): guest is IGuestD {
  if (guest.pricingType === undefined)
    throw Error("this is not a guest object");
  return guest.pricingType === PricingType.DOMITORY;
}

function instanceOfA<T>(
  object: any,
  key: string,
  nullCheck?: boolean
): object is T {
  if (!nullCheck) {
    return key in object;
  } else {
    if (object[key]) {
      return true;
    } else {
      return false;
    }
  }
}

export { isDomitoryGuest };
export default instanceOfA;
