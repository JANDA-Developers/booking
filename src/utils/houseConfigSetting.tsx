import {IHouse, IHouseConfigFull} from "../types/interface";
import mergeObject from "./mergeObject";
import {DEFAUT_HOUSE_CONFIG} from "../types/defaults";
import removeNullOfObject from "./removeNullOfObject";

const houseConfigSetting = (currentHouse: IHouse | undefined) => {
  let houseConfig = DEFAUT_HOUSE_CONFIG;
  if (currentHouse) {
    removeNullOfObject(currentHouse.houseConfig);
    houseConfig = mergeObject<IHouseConfigFull>(
      DEFAUT_HOUSE_CONFIG,
      currentHouse.houseConfig
    );
    currentHouse.houseConfig = houseConfig;
  }
  return houseConfig;
};

export default houseConfigSetting;
