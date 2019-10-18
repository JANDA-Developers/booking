import React from "react";
import {MutationFn} from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../../types/api";
import {IContext} from "../../../MiddleServerRouter";
import {useSwitch, useSelect} from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import JDbox from "../../../../atoms/box/JDbox";
import {PRICING_TYPE_OP_EXPEND} from "../../../../types/enum";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";

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
    baseConfig: {pricingTypes}
  } = houseConfig;

  const useingPricingTypesHook = useSelect(
    PRICING_TYPE_OP_EXPEND.find(
      temp => temp.value.join() === pricingTypes.join()
    )!
  );

  const vlidate = (): boolean => {
    if (!useingPricingTypesHook.selectedOption) return false;
    return true;
  };

  const handleUpdateBtnClick = () => {
    if (vlidate()) {
      updateHouseConfigMu({
        variables: {
          houseId: house._id,
          UpdateHouseConfigParams: {
            baseConfig: {
              pricingTypes: useingPricingTypesHook.selectedOption!.value
            }
          }
        }
      });
    }
  };

  return (
    <div className="additionDetail">
      <div className="docs-section__box">
        <span>예약 설정</span>
        <div className="additionDetail__titleTopRight">
          <Button
            onClick={() => {
              handleUpdateBtnClick();
            }}
            thema="point"
            label="저장하기"
          />
        </div>
      </div>
      <div>
        <h6>상품 형태 입력</h6>
        <div>
          <JDselect
            {...useingPricingTypesHook}
            options={PRICING_TYPE_OP_EXPEND}
          />
        </div>
        <JDbox mode="photoFrame" />
      </div>
    </div>
  );
};

export default BaseConfig;
