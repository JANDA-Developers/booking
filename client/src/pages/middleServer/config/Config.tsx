import React, {useState} from "react";
import {ErrProtecter, s4} from "../../../utils/utils";
import AddtionModule from "./components/AddtionModule";
import {additiones} from "./addtiones/additiones";
import Card from "../../../atoms/cards/Card";
import "./Config.scss";
import Sticky from "react-sticky-el";
import {MutationFn} from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../types/api";
import {IHouse, IHouseConfigFull} from "../../../types/interface";
import {IContext} from "../../MiddleServerRouter";

interface IProps {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  context: IContext;
}

const Config: React.FC<IProps> = ({updateHouseConfigMu, context}) => {
  // AdditionMoudle 클릭시 변경

  const [additionIndex, setAdditionIndex] = useState<null | number>(null);
  return (
    <div id="Config" className="container config">
      <div className="flex-grid docs-section">
        <div className="flex-grid__col col--full-4 col--md-12">
          <div className="config__cardsWrap">
            {additiones.map((addtion, index) => (
              <Card key={s4()} selected={index === additionIndex} hover>
                <AddtionModule
                  setAdditionIndex={setAdditionIndex}
                  addtionInfo={addtion}
                  index={index}
                />
              </Card>
            ))}
          </div>
        </div>
        <div className=" flex-grid__col col--full-8 col--md-12">
          <Sticky>
            <Card className="config__detailSection">
              {additionIndex === null ? (
                <div>
                  <h5>원하는 설정 항목을 선택하세요.</h5>
                </div>
              ) : (
                <div>
                  <h5>{additiones[additionIndex].name}</h5>
                  {additiones[additionIndex].detailDescription({
                    updateHouseConfigMu,
                    context
                  })}
                </div>
              )}
            </Card>
          </Sticky>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(Config);
