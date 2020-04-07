import React from "react";
import JDIcon from "../../icons/Icons";
import { IUseModal } from "../../../hooks/hook";

interface IProps {
  dayPickerModalHook: IUseModal;
  getRootProps: any;
}

export const SharedSideBarHeader: React.FC<IProps> = ({
  dayPickerModalHook,
  getRootProps
}) => {
  return (
    <div>
      <div className="rct-header-root__topLeft" {...getRootProps()}>
        <div
          onMouseDown={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            dayPickerModalHook.openModal();
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <JDIcon
            className="dailyPrice__topLeftIcon"
            size={"tiny"}
            icon="calendar"
          />
        </div>
      </div>
    </div>
  );
};
