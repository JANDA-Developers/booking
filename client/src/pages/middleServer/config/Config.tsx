import React, {useState} from "react";
import {ErrProtecter} from "../../../utils/utils";
import AddtionModule from "./components/AddtionModule";
import {additiones} from "./components/additiones";
import Card from "../../../atoms/cards/Card";
import "./Config.scss";
import Sticky from "react-sticky-el";

interface IProps {}

const Config: React.FC<IProps> = () => {
  // AdditionMoudle 클릭시 변경
  const [additionIndex, setAdditionIndex] = useState<null | number>(null);
  return (
    <div id="Config" className="container config">
      <div className="flex-grid docs-section">
        <div className="flex-grid__col col--full-4">
          {additiones.map((addtion, index) => (
            <Card>
              <AddtionModule
                setAdditionIndex={setAdditionIndex}
                addtionInfo={addtion}
                index={index}
              />
            </Card>
          ))}
        </div>
        <div className=" flex-grid__col col--full-8">
          <Sticky>
            <Card className="config__detailSection">
              {additionIndex === null ? (
                <div />
              ) : (
                <div>
                  <h1>{additiones[additionIndex].name}</h1>
                  {additiones[additionIndex].detailDescription()}
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
