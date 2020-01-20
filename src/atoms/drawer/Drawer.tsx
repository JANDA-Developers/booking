import React from "react";
import JDIcon from "../icons/Icons";
import { IconConifgProps } from "../icons/declation";
import Button, { IButtonProps } from "../button/Button";
import { LANG } from "../../hooks/hook";

interface Iprops extends IconConifgProps {
  open: boolean;
  onClick: (e: any) => void;
  label?: string;
  mode?: "icon" | "button";
  buttonModeProps?: IButtonProps;
}

const Drawer: React.FC<Iprops> = ({
  open,
  onClick,
  mode = "icon",
  label,
  buttonModeProps,
  ...props
}) => {
  const icon = open ? "vUp" : "vDown";
  if (mode === "icon") {
    return (
      <JDIcon label={label} onClick={onClick} hover {...props} icon={icon} />
    );
  } else {
    return (
      <Button
        mode="flat"
        onClick={onClick}
        size="tiny"
        thema="black"
        label={label || LANG("show_detail")}
        icon={icon}
        {...buttonModeProps}
      />
    );
  }
};

export default Drawer;
