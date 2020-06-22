import React, { useState } from "react";
import { IUseModal, JDmodal } from "@janda-com/front";
import { OptionalItemUpsertInput } from "../../../types/api";
import { IRoomTypeOptional } from "../../../types/interface";

interface IOptionModalInfo {
  defaultData: IRoomTypeOptional;
  handleSave: (param: OptionalItemUpsertInput) => void;
  //   handleDelete: TODO;
}

interface IProp {
  modalHook: IUseModal<IOptionModalInfo>;
}

export const OptionalProductModal: React.FC<IProp> = ({ modalHook }) => {
  const { info } = modalHook;
  if (!info) return <span />;
  const { handleSave, defaultData } = info;

  const [data, setData] = useState<OptionalItemUpsertInput>(defaultData);

  function set<T extends keyof OptionalItemUpsertInput>(
    key: T,
    value: OptionalItemUpsertInput[T]
  ) {
    data[key] = value;
    setData({ ...data });
  }

  set();
  return <JDmodal {...modalHook}></JDmodal>;
};
