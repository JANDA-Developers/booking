import React from "react";
import EerrorProtect from "../../../../utils/errProtect";

export interface IAddition {
  name: string;
  updateAt: string;
  description: string;
  detailDescription(): JSX.Element | JSX.Element[];
}

interface IProps {
  addtionInfo: IAddition;
  setAdditionIndex: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}

const AddtionModule: React.FC<IProps> = ({
  addtionInfo,
  setAdditionIndex,
  index
}) => (
  <div
    onClick={() => {
      setAdditionIndex(index);
    }}
    className="addtionModule"
  >
    <h6 className="addtionModule__title">{addtionInfo.name}</h6>
    <span className="addtionModule__descrition">{addtionInfo.description}</span>
    <span className="addtionModule__updateAt">{addtionInfo.updateAt}</span>
  </div>
);

export default EerrorProtect(AddtionModule);
