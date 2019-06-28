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
import {IAdditionHook} from "../ProductsWrap";
import {LayoutType} from "../../../../types/enum";
import {isUrl} from "../../../../utils/inputValidations";

interface IProps {
  modalHook: IUseModal;
  additionHook: [
    IAdditionHook,
    React.Dispatch<React.SetStateAction<IAdditionHook>>
  ];
}

// ❕ 어차피 버튼 눌러서 수정할거니까 전부 STATE 에 하면됨
const AdditionModal: React.FC<IProps> = ({modalHook, additionHook}) => {
  const [additionValue, setAdditionValue] = additionHook;
  const {useLayout, url, layoutType} = additionValue;

  const handleUseLayoutRadio = (value: boolean) => {
    setAdditionValue({...additionValue, useLayout: value});
  };

  return (
    <Modal className="JDproduct__addtionModal" {...modalHook}>
      <div>
        <h5>홈페이지를 신청하시겠습니까?</h5>
        <Radio
          selectedValue={useLayout}
          onChange={handleUseLayoutRadio}
          value={true}
          label="희망합니다."
          id="HR1--1"
          groupName="HompageRadio"
        />
        <Radio
          selectedValue={useLayout}
          onChange={handleUseLayoutRadio}
          value={false}
          label="예약서비스만 사용하겠습니다."
          id="HR1--2"
          groupName="HompageRadio"
        />
        {useLayout && (
          <div>
            <JDLabel txt="레이아웃 선택" />
            <div className="flex-grid JDstandard-margin-bottom">
              <LayoutCards
                selectedLayout={layoutType}
                setLayout={(value: LayoutType) => {
                  setAdditionValue({...additionValue, layoutType: value});
                }}
              />
            </div>
            <InputText
              placeholder="http://"
              validation={isUrl}
              label="신청URL"
              onChange={(value: string) => {
                setAdditionValue({...additionValue, url: value});
              }}
            />
          </div>
        )}
        <div className="JDmodal__endSection">
          <Button
            mode="flat"
            thema="primary"
            label="신청완료"
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
