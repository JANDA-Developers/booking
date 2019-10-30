import React from "react";
import ReactPlayer from "react-player";

interface Iprops {}

const JDVideo: React.FC<Iprops> = () => {
  return (
    <ReactPlayer url="https://s3.ap-northeast-2.amazonaws.com/storage.stayjanda.com/5d946cb7ab3c693ad0b813de//4275e1141478-4e03-b279-e7ff850be23d" />
  );
};

export default JDVideo;
