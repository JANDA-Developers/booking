import isEmpty from "./isEmptyData";
import { IHouse } from "../types/interface";
import { getFromUrl } from "@janda-com/front";

const getCurrentHouse = (houses: IHouse[]): IHouse | undefined => {
  const tempLastSelectedHouseId = localStorage.getItem("selectHouseId");

  const targetHpk = getFromUrl("hpk")?.replace("/", "");
  console.log("targetHpk")
  console.log(targetHpk)

  const targetHouse = houses.find((house) =>
    house.publicKey === targetHpk
  )
  console.log(targetHouse)

  return targetHouse;
};

export default getCurrentHouse;
