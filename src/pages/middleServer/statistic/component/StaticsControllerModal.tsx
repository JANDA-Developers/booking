import React from "react";
import {IContext} from "../../../MiddleServerRouter";
import StaticController from "./StaticController";
import JDmodal from "../../../../atoms/modal/Modal";
import {IUseModal, LANG} from "../../../../hooks/hook";
import {IStaticsProps} from "../Statistic";
import {IconSize} from "../../../../atoms/icons/Icons";
import StaticIcons from "./StaticIcons";
import {MODAL_MIN_WIDTH} from "../../../../types/enum";

interface Iprops {
  context: IContext;
  staticsProps: IStaticsProps;
  modalHook: IUseModal;
}

const StaticsControllerModal: React.FC<Iprops> = ({
  staticsProps,
  context,
  modalHook
}) => {
  const {viewMode, setViewMode} = staticsProps;
  return (
    <JDmodal visibleOverflow minWidth={MODAL_MIN_WIDTH} {...modalHook}>
      <div>
        <div className="modal__section">
          <StaticController staticsProps={staticsProps} context={context} />
        </div>
        <h6>{LANG("graph_shape")}</h6>
        <div>
          <StaticIcons
            iconSize={IconSize.MEDIUM_LARGE}
            context={context}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </div>
    </JDmodal>
  );
};

export default StaticsControllerModal;
