import React, {useState} from "react";
import {ErrProtecter, s4} from "../../../utils/utils";
import ConfigBlock from "./components/ConfigBlock";
import {configBlocks} from "./addtiones/configs";
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
import {LANG} from "../../../hooks/hook";

interface IProps {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  context: IContext;
}

// AdditionMoudle 클릭시 변경
const Config: React.FC<IProps> = ({updateHouseConfigMu, context}) => {
  const [additionIndex, setAdditionIndex] = useState<null | number>(null);
  return (
    <div id="Config" className="container config">
      <div className="flex-grid docs-section">
        <div className="JDstandard-margin-bottom flex-grid__col col--full-4 col--md-12">
          <div className="config__cardsWrap">
            {configBlocks.map((addtion, index) => (
              <Card
                className={"config__tabCard"}
                key={s4()}
                selected={index === additionIndex}
                hover
              >
                <ConfigBlock
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
                  <h5>{LANG("select_the_desired_setting_item")}</h5>
                </div>
              ) : (
                <div>
                  <h5>{configBlocks[additionIndex].name}</h5>
                  {configBlocks[additionIndex].detailDescription({
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
