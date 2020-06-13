import React, { useState } from "react";
import { InputText } from "@janda-com/front";
import { useInput } from "@janda-com/front";
import { IAddtionProp } from "../components/ConfigBlock";

export const ResvInfoConfig: React.FC<IAddtionProp> = ({ updateFn }) => {
  const ResvCompeleteMsg = useInput("");
  const ResvCautionMsg = useInput("");
  const PayPrecaution = useInput("");
  const CheckPageMsg = useInput("");

  const handleUpdate = () => {
    updateFn({
      bookingConfig: {}
    });
  };

  return (
    <div>
      <div>
        <InputText textarea label="" {...ResvCompeleteMsg} />
        <InputText textarea label="" {...ResvCautionMsg} />
        <InputText textarea label="" {...PayPrecaution} />
        <InputText textarea label="" {...CheckPageMsg} />
      </div>
    </div>
  );
};

export default ResvInfoConfig;
