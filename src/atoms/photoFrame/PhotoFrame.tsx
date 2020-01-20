import React from "react";
import classNames from "classnames";
import "./PhotoFrame.scss";
import { JDatomExtentionSet } from "../../types/interface";
import { JDmrClass, JDmbClass } from "../../utils/autoClasses";
import { WindowSize } from "../../types/enum";
import { currentWinSize } from "../../utils/currentWinSize";
import reactWindowSize, { WindowSizeProps } from "react-window-size";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";

interface Iprops extends JDatomExtentionSet {
  src?: string;
  lang?: string;
  responseImg?: boolean;
  unStyle?: boolean;
  type?: string;
  className?: string;
  isBgImg?: boolean;
  context?: IContext;
}

// Lang should be a TShortCut
const PhotoFrame: React.FC<Iprops & WindowSizeProps> = ({
  mb,
  mr,
  src: srcProp,
  type,
  unStyle,
  lang,
  context,
  className,
  responseImg,
  isBgImg,
  windowWidth
}) => {
  let src = srcProp;

  const sideIsOpen = context?.sideNavIsOpen;

  // "mb" || "pc"
  if (responseImg) {
    const mode = currentWinSize();
    const changePoint = sideIsOpen ? WindowSize.DESKTOP : WindowSize.TABLET;

    if (windowWidth < changePoint) {
      src += "--mb";
    } else {
      src += "--pc";
    }
  }

  if (lang) {
    src += `--${lang}`;
  }
  if (type) src += type;

  const classes = classNames("photoFrame", className, {
    "photoFrame--fixHeight": isBgImg,
    "photoFrame--unStyle": unStyle,
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  const bg = src;

  return (
    <div className={classes}>
      {isBgImg && (
        <div
          style={{
            backgroundImage: `url(${bg})`
          }}
          className="photoFrame__bgimg"
        />
      )}
      {isBgImg || <img className="photoFrame__img" src={src} />}
    </div>
  );
};

export default reactWindowSize<Iprops>(PhotoFrame);
