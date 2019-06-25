import React, {Fragment} from "react";
import ReactModal from "react-modal";
import "./Modal.scss";
import classNames from "classnames";
import Button from "../button/Button";
import {IUseModal} from "../../actions/hook";
import {s4} from "../../utils/utils";

interface IProps extends ReactModal.Props, IUseModal {
  center?: boolean;
  className?: string;
  isAlert?: boolean;
  confirm?: boolean;
  children?: any;
  visibleOverflow?: boolean;
  falseMessage?: string | any[];
  trueMessage?: string | any[];
  confirmCallBackFn?(flag: boolean, key?: string): any;
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
  trueMessage,
  falseMessage,
  appElement = document.getElementById("root") || undefined,
  ...props
}) => {
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

  const getChildren = () => (
    <div>
      {children}
      {info && info.children}
      {typeof info === "string" && info}
      {info && typeof info.txt === "string" && info.txt}
    </div>
  );

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

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      appElement={appElement}
      {...props}
      {...defualtJDmodalProps}
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
  );
};

JDmodal.defaultProps = {
  center: false
};

export default JDmodal;

const JDtoastModal = JDmodal;
export {JDtoastModal};
