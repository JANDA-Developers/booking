import React from "react";
import JDIcon from "../../../atoms/icons/Icons";
import JDtypho from "../../typho/Typho";
export type IPropsModalHeadProps = {
  title?: string;
  closeFn?: () => any;
};

const ModalHeadSection: React.FC<IPropsModalHeadProps> = ({
  title,
  closeFn
}) => {
  return (
    <div className="JDmodal__head">
      <JDtypho size="h6" mb="no">
        {title}
      </JDtypho>
      <JDIcon
        hover
        onClick={() => {
          closeFn && closeFn();
        }}
        className="JDmodal__closeIcon"
        icon="clear"
      />
    </div>
  );
};

export default ModalHeadSection;
