import React, {Fragment} from "react";
import ReactModal from "react-modal";
import "./Modal.scss";
import classNames from "classnames";
import Button from "../button/Button";
import {IUseModal} from "../../actions/hook";

interface IProps extends ReactModal.Props, IUseModal {
  center?: boolean;
  className?: string;
  isAlert?: boolean;
  confirm?: boolean;
  children?: any;
  visibleOverflow?: boolean;
  flaseMessage?: string;
  tureMessage?: string;
  confirmCallBackFn?(foo: boolean): any;
}

const JDmodal: React.SFC<IProps> = ({
  info,
  center,
  className,
  isOpen,
  closeModal,
  isAlert,
  children,
  confirm,
  confirmCallBackFn,
  visibleOverflow,
  tureMessage,
  flaseMessage,
  appElement = document.getElementById("root") || undefined,
  ...props
}) => {
  const classes = classNames("Modal JDmodal", className, {
    "JDmodal--center": center,
    "JDmodal--visibleOverflow": visibleOverflow,
    "JDmodal--alert": isAlert || confirm,
    "JDmodal--alertWaring": info && info.thema === "warn"
  });
  const defualtJDmodalProps = {
    className: `Modal ${classes}`,
    overlayClassName: "Overlay"
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      appElement={appElement}
      {...props}
      {...defualtJDmodalProps}
    >
      {children}
      {typeof info === "string" && info}
      {info && typeof info.txt === "string" && info.txt}

      {confirm && (
        <Fragment>
          <div className="JDmodal__endSection JDmodal__endSection--confirm">
            <Button
              thema="primary"
              mode="flat"
              label={`${tureMessage || "확인"}`}
              onClick={() => {
                confirmCallBackFn && confirmCallBackFn(true);
                info.callBack && info.callBack(true);
                closeModal();
              }}
            />
            <Button
              mode="flat"
              thema="warn"
              label={`${flaseMessage || "취소"}`}
              onClick={() => {
                confirmCallBackFn && confirmCallBackFn(false);
                info.callBack && info.callBack(false);
                closeModal();
              }}
            />
          </div>
        </Fragment>
      )}
    </ReactModal>
  );
};

JDmodal.defaultProps = {
  center: false
};

export default JDmodal;

const JDtoastModal = JDmodal;
export {JDtoastModal};
