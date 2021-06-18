import { DEFAULT_ASSIG_ITEM } from "../../../../types/defaults";
import { IAssigItem, GuestTypeAdd } from "../components/assigIntrerface";
import dayjs from "dayjs";
import { IBlock } from "../../../../types/interface";

export const blockDataManufacturer = (blocksData: IBlock[]) => {
  const alloCateItems: IAssigItem[] = [];

  blocksData.forEach(blockData => {
    if (blockData) {
      alloCateItems.push({
        ...DEFAULT_ASSIG_ITEM,
        id: blockData._id,
        temp: true,
        bookingId: blockData._id,
        roomId: blockData.room._id,
        group: blockData.room._id + blockData.bedIndex,
        start: dayjs(blockData.checkIn).valueOf(),
        end: dayjs(blockData.checkOut).valueOf(),
        canMove: false,
        type: GuestTypeAdd.BLOCK,
        bedIndex: blockData.bedIndex
      });
    }
  });

  return alloCateItems;
};
