import React from "react";
import {MutationFn} from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../../types/api";
import {IContext} from "../../../MiddleServerRouter";
import {useSwitch} from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import JDbox from "../../../../atoms/box/JDbox";

interface IProps {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  context: IContext;
}

const ReservationConfig: React.FC<IProps> = ({
  updateHouseConfigMu,
  context
}) => {
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
        <h6>게스트 입력 정보</h6>
        <JDswitch label="이메일 정보" {...enableEmailHook} />
        <JDbox mode="photoFrame" />
      </div>
    </div>
  );
};

export default ReservationConfig;
