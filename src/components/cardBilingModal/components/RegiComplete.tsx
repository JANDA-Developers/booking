import React from "react";
import { LANG } from "../../../hooks/hook";
import CompleteCircle from "../../completeCircle/CompleteCircle";

const RegiComplete: React.FC = () => {
  return (
    <div>
      <div className="JDstandard-margin-bottom">
        {LANG("registration_confirmation")}
      </div>
    </div>
  );
};

export default RegiComplete;
