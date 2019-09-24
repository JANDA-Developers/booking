import React from "react";
import {createPortal} from "react-dom";
import Preloader, {IPreloaderConfigProps} from "../atoms/preloader/Preloader";
import {FLOATING_PRElOADER_SIZE} from "../types/enum";

export const PortalPreloader = ({loading}: IPreloaderConfigProps) =>
  createPortal(
    <Preloader
      size={FLOATING_PRElOADER_SIZE}
      floating
      loading={loading}
    />,
    portalTo()
  );

const portalTo = () => document.getElementById("JDpreloaderPortal")!;

export default portalTo;
