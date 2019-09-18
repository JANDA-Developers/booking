import React, {useState} from "react";
import {IAddition} from "../components/ConfigBlock";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/range";
import {MutationFn} from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../../types/api";
import {IHouse} from "../../../../types/interface";
import {IContext} from "../../../MiddleServerRouter";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import {PRICING_TYPE_OP_EXPEND} from "../../../../types/enum";
import {useSelect, useSwitch} from "../../../../actions/hook";
import Button from "../../../../atoms/button/Button";
import {toast} from "react-toastify";
import JDswitch from "../../../../atoms/forms/switch/Switch";

interface IProps {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  context: IContext;
}

const BaseConfig: React.FC<IProps> = ({updateHouseConfigMu, context}) => {
  const {houseConfig, house} = context;
  const {
    bookingConfig: {collectingInfoFromGuest}
  } = houseConfig;

  const {email} = collectingInfoFromGuest;

  const enableEmailHook = useSwitch(email);

  const vlidate = (): boolean => {
    return true;
  };

  const handleUpdateBtnClick = () => {
    if (vlidate()) {
      updateHouseConfigMu({
        variables: {
          houseId: house._id,
          UpdateHouseConfigParams: {
            bookingConfig: {
              collectingInfoFromGuest: {
                email: enableEmailHook.checked
              }
            }
          }
        }
      });
    }
  };

  return (
    <div>
      <div className="docs-section__box">
        <span>예약 설정</span>
        <Button
          onClick={() => {
            handleUpdateBtnClick();
          }}
          thema="point"
          label="저장하기"
        />
      </div>
      <div>
        <h6>게스트에게서 입력받을 정보</h6>
        <JDswitch label="이메일 정보" {...enableEmailHook} />
      </div>
    </div>
  );
};

export default BaseConfig;
