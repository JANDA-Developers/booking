import isEmpty from "./isEmptyData";
import { IHouse } from "../types/interface";

const getCurrentHouse = (houses: IHouse[]): IHouse | undefined => {
  const tempLastSelectedHouseId = localStorage.getItem("selectHouseId");
  console.log("tempLastSelectedHouseId");
  console.log(tempLastSelectedHouseId);
  console.log(houses);

  const lastSelectedHouse = houses.find(
    house => house._id === tempLastSelectedHouseId
  );
  console.log(lastSelectedHouse);

  // 마지막으로 선택한 하우스 또는 첫번째 하우스
  let selectedHouse = lastSelectedHouse || houses[0];

  // 최근에 선택된 숙소가 없다면 선택된 숙소는 첫번째 숙소입니다.
  if (!selectedHouse && !isEmpty(houses)) [selectedHouse] = houses;

  return selectedHouse;
};

export default getCurrentHouse;
