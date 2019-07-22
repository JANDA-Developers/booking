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
import {IHouse} from "../../../types/interface";

interface IProps {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  house: IHouse;
}

const Config: React.FC<IProps> = ({updateHouseConfigMu, house}) => {
  // AdditionMoudle 클릭시 변경
  const [additionIndex, setAdditionIndex] = useState<null | number>(null);
  return (
    <div id="Config" className="container config">
      <div className="flex-grid docs-section">
        <div className="flex-grid__col col--full-4 col--md-12">
          <div className="config__cardsWrap">
            {additiones.map((addtion, index) => (
              <Card key={s4()} selected={index === additionIndex} hoverDark>
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
                    house
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
