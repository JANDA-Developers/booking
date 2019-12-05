import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import classNames from "classnames";
import "./PhotoFrame.scss";

interface Iprops {
  src?: string;
  context?: IContext;
  langPic?: boolean;
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
  className
}) => {
  let src = srcProp;

  if (context && langPic) {
    const {
      langHook: { currentLang }
    } = context;

    src += `--${currentLang}`;
  }
  if (type) src += type;

  const classes = classNames("photoFrame", className, {
    "photoFrame--unStyle": unStyle
  });

  return (
    <div className={classes}>
      <img className="photoFrame__img" src={src} />
    </div>
  );
};

export default PhotoFrame;
