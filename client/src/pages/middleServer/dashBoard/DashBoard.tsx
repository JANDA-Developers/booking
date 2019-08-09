import React, {useState, Fragment} from "react";
import {ErrProtecter, isEmpty} from "../../../utils/utils";
import JDSlider from "../../../atoms/slider/Slider";
import Card from "../../../atoms/cards/Card";
import JDbox from "../../../atoms/box/JDbox";
import {IUser, IHouse} from "../../../types/interface";
import DashBoardHeader from "./components/dashboardHeader";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import "./DashBoard.scss";
import InputText from "../../../atoms/forms/inputText/InputText";
import JDLabel from "../../../atoms/label/JDLabel";
import GreetingBox from "./components/greetingBox";
import {MutationFn} from "react-apollo";
import {updateHouse, updateHouseVariables, HouseType} from "../../../types/api";
import {useInput} from "../../../actions/hook";
import Button from "../../../atoms/button/Button";
import Steps from "./components/steps";
import JDmultiBox from "../../../atoms/multiBox/MultiBox";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import {ProductStatus, Product} from "../../../types/enum";

interface Iprops {
  userData: IUser;
  house?: IHouse;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

export type IStepsStart =
  | "phoneVerification"
  | "houseMake"
  | "makeProduct"
  | "readyAssign"
  | "makeRoom"
  | "done";

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({updateHouseMu, userData, house}) => {
  const hostMemo = useInput(
    house ? house.hostMemo : "숙소생성후 이용해주세요."
  );

  let step: IStepsStart = "phoneVerification";

  if (userData.isPhoneVerified) {
    step = "houseMake";
  }
  if (house) {
    step = "makeProduct";
    if (house.product) {
      step = "readyAssign";
      if (
        house.product.status !== ProductStatus.WAIT ||
        house.product.name === Product.TEST
      ) {
        step = "makeRoom";
        if (!isEmpty(house.roomTypes)) {
          step = "done";
        }
      }
    }
  }

  return (
    <div className="docs-section--narrowTop">
      <div id="dashBoard" className="dashBoard">
        <div className="container">
          <DashBoardHeader />
          <div className="flex-grid dashBoard__section1">
            <div className="flex-grid__col col--wmd-12 col--full-9 JDstandard-margin-bottom--wmd">
              <Card className="JDcard--fullHeight JDcard--fullHeight-wmd">
                {step === "done" ? (
                  <Fragment>
                    <h6>방배정현황</h6>
                    <DailyAssigWrap house={house!} date={new Date()} />
                  </Fragment>
                ) : (
                  <div>
                    <JDmultiStep
                      steps={[
                        {
                          current: step === "phoneVerification",
                          name: "휴대폰인증"
                        },
                        {
                          current: step === "houseMake",
                          name: "숙소생성"
                        },
                        {
                          current: step === "makeProduct",
                          name: "상품등록"
                        },
                        {
                          current: step === "readyAssign",
                          name: "적용대기"
                        },
                        {
                          current: step === "makeRoom",
                          name: "방생성"
                        }
                      ]}
                    />
                    <Steps
                      houseId={house ? house._id : undefined}
                      step={step}
                    />
                  </div>
                )}
              </Card>
            </div>
            <div className="flex-grid__col col--wmd-12 col--full-3">
              <div className="flex-grid__col flex-grid-grow flex-grid flex-grid--vertical">
                <div className="flex-grid__col flex-grid col--wmd-12 flex-grid--unGrow">
                  <Card fullWidth>
                    <GreetingBox userData={userData} />
                  </Card>
                </div>
                <div className="flex-grid__col flex-grid col--wmd-12">
                  <Card fullWidth>
                    <InputText
                      readOnly={!house}
                      onBlur={e => {
                        house &&
                          updateHouseMu({
                            variables: {
                              houseId: house._id,
                              hostMemo: e.currentTarget.value
                            }
                          });
                      }}
                      {...hostMemo}
                      label="메모"
                      scroll
                      fullHeight
                      textarea
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(DashBoard);
