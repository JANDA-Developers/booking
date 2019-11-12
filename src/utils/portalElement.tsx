import React from "react";
import { createPortal } from "react-dom";
import Preloader, { IPreloaderConfigProps } from "../atoms/preloader/Preloader";
import { FLOATING_PRELOADER_SIZE } from "../types/enum";

// 수정이 필요
export const PortalPreloader = ({
  loading,
  floating = true,
  size = FLOATING_PRELOADER_SIZE
}: IPreloaderConfigProps) =>
  createPortal(
    <Preloader size={size} floating={floating} loading={loading} />,
    portalElement()
  );

// 수정이필요
// 포탈이 향하는 곳
export const portalElement = () =>
  document.getElementById("JDpreloaderPortal")!;

export default portalElement;
