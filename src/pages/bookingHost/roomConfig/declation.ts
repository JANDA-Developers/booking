import { IRoomType, IRoom } from "../../../types/interface";
import { JDmodalConfigProps } from "../../../atoms/modal/Modal";

export type TRoomModalSubmit = (
  room: IRoom[],
  roomType: IRoomType,
  mode: TMode,
  index?: number
) => void;

export interface IRoomTypeModalSubmitData extends IRoomType {
  uploadImg?: any[];
  deleteImages?: string[];
}

export interface IRoomModalInfo {
  mode: TMode;
  room?: IRoom;
  roomType: IRoomType;
  modalProp?: JDmodalConfigProps;
}

export interface IRoomDataSet {
  original: IRoomType[];
  tempData?: IRoomType;
  deleteIds: string[];
  updateCreateData: IRoomTypeModalSubmitData[];
}

export type RoomBoxProp = {
  roomTypeId: string;
  roomId: string;
  roomName: string;
  onClick: any;
};

export type TMode = "create" | "update" | "delete";

export interface IRoomTypeModalInfo {
  roomType: IRoomType;
  mode: TMode;
}
