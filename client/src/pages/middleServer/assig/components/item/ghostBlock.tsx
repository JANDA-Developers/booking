import React from "react";
import Preloader from "../../../../../atoms/preloader/Preloader";
interface Iprops {
  loading: boolean;
  name: string;
}

const GhostBlock: React.FC<Iprops> = ({loading, name}) => {
  return (
    <div className="assigItem__content JDtext-blink assigItem__content--ghost">
      <span className="assigItem__titleWrap">
        <span className="assigItem__title">{name}</span>
        <Preloader loading={loading} />
      </span>
    </div>
  );
};

export default GhostBlock;
