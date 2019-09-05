import React from "react";
interface Iprops {}

const BlockBlock: React.FC<Iprops> = () => {
  return (
    <div className="assigItem__content assigItem__content--block">
      <span className="assigItem__titleWrap">
        <span className="assigItem__title">{"자리막음"}</span>
      </span>
    </div>
  );
};

export default BlockBlock;
