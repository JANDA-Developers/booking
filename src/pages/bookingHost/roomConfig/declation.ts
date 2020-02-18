import { IRoomType, IRoom } from "../../../types/interface";

export type TRoomModalSubmit = (room: IRoom[], roomType: IRoomType, mode: TMode, index?: number) => void;

export interface IRoomModalInfo {
    mode: TMode;
    room?: IRoom;
    roomType: IRoomType;
}

export interface IRoomDataSet {
    original: IRoomType[];
    tempData?: IRoomType;
    deleteIds: string[];
    updateCreateData: IRoomType[];
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