import { IHouseOptions, TOptionsObj } from "../types/interface";
import { HouseOptionsKey } from "../types/enum";

export const getOptionsObj = (options: IHouseOptions[] = []): TOptionsObj => {
  const returnObj: any = {};
  Object.keys(HouseOptionsKey).forEach(key => {
    returnObj[key] = options.find(op => op.key === key)?.value || "";
  });
  return returnObj;
};

export default getOptionsObj;
