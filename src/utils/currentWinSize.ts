import { WindowSize, WindowSizeShort } from "../types/enum";

export const currentWinSize = (): WindowSizeShort => {
    const width = window.innerWidth;
    let mode = "wlg";
    if (width >= WindowSize.MOBILE) mode = "sm";
    if (width >= WindowSize.PHABLET) mode = "md";
    if (width >= WindowSize.TABLET) mode = "wmd";
    if (width >= WindowSize.DESKTOP) mode = "lg";
    if (width >= WindowSize.DESKTOPHD) mode = "wlg";
    return mode as WindowSizeShort
}