import React from "react";
import JDIcon from "../icons/Icons";
import { IconConifgProps } from "../icons/declation";

interface Iprops extends IconConifgProps {
  open: boolean;
  onClick: (e: any) => void;
}

const Drawer: React.FC<Iprops> = ({ open, onClick, ...props }) => {
  return (
    <JDIcon onClick={onClick} hover {...props} icon={open ? "vUp" : "vDown"} />
  );
};

export default Drawer;
