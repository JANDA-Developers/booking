import React, {FunctionComponent} from "react";
import EerrorProtect from "../../../../utils/errProtect";
import {MutationFn} from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../../types/api";
import {IHouse} from "../../../../types/interface";
import {IContext} from "../../MiddleServerRouter";

export interface IAddtionProp {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  context: IContext;
}

export interface IAddition {
  name: string;
  updateAt: string;
  description: string;
  detailDescription: (prop: IAddtionProp) => any;
}

interface IProps {
  addtionInfo: IAddition;
  setAdditionIndex: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}

const ConfigBlock: React.FC<IProps> = ({
  addtionInfo,
  setAdditionIndex,
  index
}) => (
  <div
    onClick={() => {
      setAdditionIndex(index);
    }}
    className="configBlock"
  >
    <h6 className="configBlock__title">{addtionInfo.name}</h6>
    <span className="configBlock__descrition">{addtionInfo.description}</span>
    <span className="configBlock__updateAt">{addtionInfo.updateAt}</span>
  </div>
);

export default EerrorProtect(ConfigBlock);
