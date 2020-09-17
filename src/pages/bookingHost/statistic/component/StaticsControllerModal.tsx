import React from "react";
import { IContext } from "../../../bookingHost/BookingHostRouter";
import StaticController from "./StaticController";
import JDmodal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../hooks/hook";
import { IStaticsProps, IGraphViewMode } from "../Statistic";
import StaticIcons from "./StaticIcons";
import { MODAL_MIN_WIDTH } from "../../../../types/const";

interface Iprops {
  context: IContext;
  viewModeHook: {
    viewMode: IGraphViewMode;
    setViewMode: React.Dispatch<React.SetStateAction<IGraphViewMode>>;
  };
  modalHook: IUseModal;
}

const StaticsControllerModal: React.FC<Iprops> = ({
  viewModeHook,
  context,
  modalHook
}) => {
  const { viewMode, setViewMode } = viewModeHook;
  return (
    <JDmodal visibleOverflow minWidth={MODAL_MIN_WIDTH} {...modalHook}>
      <div>
        <div className="modal__section">
          <StaticController context={context} />
        </div>
        <h6>{LANG("graph_shape")}</h6>
        <div>
          <StaticIcons
            iconSize={"normal"}
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
