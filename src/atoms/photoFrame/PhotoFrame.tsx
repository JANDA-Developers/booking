import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import classNames from "classnames";
import "./PhotoFrame.scss";
import { JDatomExtentionSet } from "../../types/interface";
import { JDmrClass, JDmbClass } from "../../utils/autoClasses";
import { WindowSizeShort } from "../../types/enum";
import { currentWinSize } from "../../utils/currentWinSize";

interface Iprops extends JDatomExtentionSet {
  src?: string;
  context?: IContext;
  langPic?: boolean;
  responseImg?: WindowSizeShort[];
  unStyle?: boolean;
  type?: string;
  className?: string;
}

const PhotoFrame: React.FC<Iprops> = ({
  src: srcProp,
  type,
  context,
  unStyle,
  langPic,
  className,
  responseImg,
  mb,
  mr
}) => {
  let src = srcProp;

  if (responseImg) {
    const mode = currentWinSize();
    if (responseImg.includes(mode)) {
      src += mode;
    }
  }

  if (context && langPic) {
    const {
      langHook: { currentLang }
    } = context;

    src += `--${currentLang}`;
  }
  if (type) src += type;

  const classes = classNames("photoFrame", className, {
    "photoFrame--unStyle": unStyle,
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  return (
    <div className={classes}>
      <img className="photoFrame__img" src={src} />
    </div>
  );
};

export default PhotoFrame;
