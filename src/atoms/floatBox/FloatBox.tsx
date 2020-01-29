import React, { useEffect, useRef } from "react";
import "./FloatBox.scss";
import classNames from "classnames";
import { IUseModal, LANG } from "../../hooks/hook";
import { IDiv } from "../../types/interface";
import Button from "../button/Button";
import { dragElement } from "../../utils/jsdrag";
import JDIcon from "../icons/Icons";
import CircleIcon from "../circleIcon/CircleIcon";

type TFloatBoxDirection = {
  vertical: "top" | "bottom";
  horizen: "left" | "right";
};

interface Iprops extends IDiv {
  modalHook: IUseModal;
  direction: TFloatBoxDirection;
}

const FloatBox: React.FC<Iprops> = ({
  modalHook,
  className,
  children,
  direction
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refContainerIn = useRef<HTMLDivElement>(null);
  const { horizen, vertical } = direction;

  const classes = classNames("floatBox", className, {
    "floatBox--open": modalHook.isOpen,
    "floatBox--top": vertical === "top",
    "floatBox--bottom": vertical === "bottom",
    "floatBox--left": horizen === "left",
    "floatBox--right": horizen === "right"
  });

  useEffect(() => {
    if (refContainer.current) {
      dragElement(refContainer.current);
    }
    if (refContainerIn.current) {
      refContainerIn.current.onmousedown = e => {
        e.preventDefault();
        e.stopPropagation();
      };
      refContainerIn.current.ontouchstart = e => {
        e.stopPropagation();
      };
      // refContainerIn.current.ontouchmove = e => {
      // e.preventDefault();
      // e.stopPropagation();
      // };
    }
  }, [refContainer.current]);

  return (
    <div ref={refContainer} className={classes}>
      <div ref={refContainerIn} className="floatBox__contentsWrap">
        {children}
        <div className="floatBox__endSection">
          <Button
            size="small"
            className="JDstandard-margin0"
            onClick={() => {
              modalHook.closeModal();
            }}
            label={LANG("close")}
            mode="flat"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatBox;
