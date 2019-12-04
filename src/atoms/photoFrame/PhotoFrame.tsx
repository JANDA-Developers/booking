import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import "./PhotoFrame.scss";

interface Iprops {
  src?: string;
  context?: IContext;
  langPic?: boolean;
}

const PhotoFrame: React.FC<Iprops> = ({ src: srcProp, context, langPic }) => {
  let src = srcProp;
  if (context && langPic) {
    const {
      langHook: { currentLang }
    } = context;
    src += `--${currentLang}`;
  }
  return (
    <div className="PhotoFrame">
      <img src={src} />
    </div>
  );
};

export default PhotoFrame;
