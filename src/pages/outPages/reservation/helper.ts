import { HouseOptionsKey } from "../../../types/enum";
import { IHouseOptions, TOptionsObj } from "../../../types/interface";

export const getOptionsObj = (options: IHouseOptions[]): TOptionsObj => {
    const returnObj: any = {};
    Object.keys(HouseOptionsKey).forEach(key => {
        returnObj[key] = options.find(op => op.key === key);
    })
    return returnObj;
}
