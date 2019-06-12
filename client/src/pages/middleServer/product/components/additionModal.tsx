import React, {Fragment, useState} from "react";
import {toast} from "react-toastify";
import Modal from "../../../../atoms/modal/Modal";
import {
  IUseModal,
  useSwitch,
  useRadio,
  useInput
} from "../../../../actions/hook";
import Button from "../../../../atoms/button/Button";
import CircleIcon from "../../../../atoms/circleIcon/CircleIcon";
import Radio from "../../../../atoms/forms/radio/Radio";
import Card from "../../../../atoms/cards/Card";
import InputText from "../../../../atoms/forms/inputText/InputText";
import LayoutCards from "./layoutCard/LayoutCards";
import JDLabel from "../../../../atoms/label/JDLabel";

interface IProps {
  modalHook: IUseModal;
}

// ❕ 어차피 버튼 눌러서 수정할거니까 전부 STATE 에 하면됨
const AdditionModal: React.FC<IProps> = ({modalHook}) => {
  const requestUrlHook = useInput("");
  const [homepage, setHompage] = useRadio("N");

  const [layout, setLayout] = useState<string | null>(null);

  return (
    <Modal className="products__addtionModal" {...modalHook}>
      <div>
        <h5>홈페이지를 신청하시겠습니까?</h5>
        <Radio
          selectedValue={homepage}
          onChange={setHompage}
          value="Y"
          label="희망합니다."
          id="HR1--1"
          groupName="HompageRadio"
        />
        <Radio
          selectedValue={homepage}
          onChange={setHompage}
          value="N"
          label="예약엔진만 사용하겠습니다."
          id="HR1--2"
          groupName="HompageRadio"
        />
        {homepage === "Y" && (
          <div>
            <JDLabel txt="레이아웃 선택" />
            <LayoutCards />
            <InputText label="신청URL" {...requestUrlHook} />
          </div>
        )}
        <div className="JDmodal__endSection">
          <Button
            label="제출"
            onClick={() => {
              modalHook.info.prodcutMu();
              modalHook.closeModal();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AdditionModal;
