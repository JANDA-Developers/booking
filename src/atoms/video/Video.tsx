import React from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

interface Iprops extends ReactPlayerProps {}

const JDVideo: React.FC<Iprops> = prop => {
  return <ReactPlayer {...prop} />;
};

export default JDVideo;
