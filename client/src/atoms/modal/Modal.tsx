import React, {Fragment, useEffect, useState} from "react";
import ReactModal from "react-modal";
import "./Modal.scss";
import classNames from "classnames";
import Button from "../button/Button";
import {IUseModal} from "../../hooks/hook";
import {s4} from "../../utils/utils";
import JDanimation, {Animation} from "../animation/Animations";

interface IProps extends ReactModal.Props, IUseModal {
  center?: boolean;
  className?: string;
  isAlert?: boolean;
  isUnderHeader?: boolean;
  confirm?: boolean;
  children?: any;
  minContentsWidth?: string;
  noAnimation?: boolean;
  minWidth?: string;
  visibleOverflow?: boolean;
  falseMessage?: string | any[];
  trueMessage?: string | any[];
  confirmCallBackFn?(flag: boolean, key?: string): any;
}

// let CAN_CLOSE_MODAL = false;

const JDmodal: React.SFC<IProps> = ({
  info,
  center,
  className,
  isUnderHeader,
  isOpen,
  minContentsWidth,
  minWidth,
  closeModal,
  isAlert,
  children,
  confirm,
  confirmCallBackFn,
  visibleOverflow,
  trueMessage,
  noAnimation = true,
  falseMessage,
  appElement = document.getElementById("root") || undefined,
  ...props
}) => {
  const [shouldAnimation, setShouldAnimation] = useState(!noAnimation);

  // 여기에서 info로 들어온것과 openModal 명렁으로 들어온것들 조합함
  const inInfo = (() => {
    let inInInfo: any = {};

    if (info && info.trueBtns) {
      inInInfo.trueMessage = info.trueBtns || trueMessage;
    }
    if (info && info.falseBtns) {
      inInInfo.falseMessage = info.falseBtns || falseMessage;
    }

    return inInInfo;
  })();

  // 👿 curtton => overlay

  const overlayClassNames = classNames("JDmodal-overlay", undefined, {
    "JDmodal-overlay--noAnimation": !shouldAnimation,
    "JDmodal-overlay--underHeader": isUnderHeader
  });

  const classes = classNames("Modal JDmodal", className, {
    "JDmodal--center": center,
    "JDmodal--visibleOverflow": visibleOverflow,
    "JDmodal--alert": isAlert || confirm,
    "JDmodal--alertWaring": info && info.thema === "warn",
    "JDmodal--noAnimation": !shouldAnimation
  });

  const defualtJDmodalProps = {
    className: `Modal ${classes}`,
    overlayClassName: "Overlay"
  };

  const hanldeClickBtn = (flag: boolean, key?: string) => {
    confirmCallBackFn && confirmCallBackFn(flag, key);
    info.callBack && info.callBack(flag, key);
    closeModal();
  };

  const sharedTrueBtnProp: any = {
    thema: "primary",
    mode: "flat",
    onClick: () => {
      hanldeClickBtn(true);
    },
    label: trueMessage || "확인"
  };

  const sharedFalseBtnProp: any = {
    mode: "flat",
    thema: "warn",
    onClick: () => {
      hanldeClickBtn(false);
    },
    label: falseMessage || "취소"
  };

  const misClickPreventCloseModal = () => {
    // if (CAN_CLOSE_MODAL) {
    closeModal();
    // }
  };

  const modalStyle = {
    minWidth
  };

  const modalContentsStyle = {
    minWidth: minContentsWidth
  };

  const getChildren = () => (
    <div style={modalContentsStyle}>
      {children}
      {info && info.children}
      {typeof info === "string" && info}
      {info && info.txt}
    </div>
  );

  return (
    <JDanimation animation={[Animation.zoomIn, Animation.zoomOut]}>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={misClickPreventCloseModal}
        appElement={appElement}
        {...props}
        {...defualtJDmodalProps}
        style={{content: {...modalStyle}}}
        overlayClassName={overlayClassNames}
      >
        {getChildren()}
        {confirm && (
          <Fragment>
            <div className="JDmodal__endSection JDmodal__endSection--confirm">
              {inInfo.trueMessage instanceof Array ? (
                inInfo.trueMessage.map((message: any) => (
                  <Button
                    key={s4()}
                    {...sharedTrueBtnProp}
                    label={`${message.msg}`}
                    onClick={() => {
                      hanldeClickBtn(true, message.callBackKey);
                    }}
                  />
                ))
              ) : (
                <Button {...sharedTrueBtnProp} />
              )}
              {inInfo.falseMessage instanceof Array ? (
                inInfo.falseMessage.map((message: any) => (
                  <Button
                    key={s4()}
                    {...sharedFalseBtnProp}
                    label={`${message}`}
                    onClick={() => {
                      hanldeClickBtn(false, message.callBackKey);
                    }}
                  />
                ))
              ) : (
                <Button {...sharedFalseBtnProp} />
              )}
            </div>
          </Fragment>
        )}
      </ReactModal>
    </JDanimation>
  );
};

JDmodal.defaultProps = {
  center: false
};

export default JDmodal;

const JDtoastModal = JDmodal;
export {JDtoastModal};
