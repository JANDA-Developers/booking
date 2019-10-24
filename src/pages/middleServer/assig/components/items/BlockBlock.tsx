import React from "react";
import { LANG } from "../../../../../hooks/hook";
interface Iprops { }

const BlockBlock: React.FC<Iprops> = () => {
  return (
    <div className="assigItem__content assigItem__content--block">
      <span className="assigItem__titleWrap">
        <span className="assigItem__title">{LANG("block")}</span>
      </span>
    </div>
  );
};

export default BlockBlock;
