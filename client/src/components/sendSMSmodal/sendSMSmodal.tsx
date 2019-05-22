import React from "react";
import JDmodal from "../../atoms/modal/Modal";
import {IUseModal} from "../../actions/hook";
import JDbox from "../../atoms/box/JDbox";
import JDselect from "../../atoms/forms/selectBox/SelectBox";
import {SELECT_DUMMY_OP} from "../../types/enum";
import Button from "../../atoms/button/Button";
import "./sendSMSmodal.scss";

export interface IModalSMSinfo {
  phoneNumber: string;
}

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
}

const SendSMSmodal: React.FC<IProps> = ({modalHook}) => {
  return (
    <JDmodal className="sendSMSmodal" {...modalHook}>
      <div>
        <JDbox mode="border" icon="mobile" topLabel="발신대상">
          {modalHook.info.phoneNumber}
        </JDbox>
      </div>
      <div className="JDz-index-1">
        <JDselect label="문자템플릿" options={SELECT_DUMMY_OP} />
      </div>
      <div className="JDmodal__endSection">
        <Button thema="primary" label="전송" />
      </div>
    </JDmodal>
  );
};

export default SendSMSmodal;
