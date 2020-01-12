import React from "react";
import { picsPaths } from "./testPicsPath";

interface IProps {}

const TestPics: React.FC<IProps> = () => {
  return (
    <div>
      {picsPaths.map(pic => (
        <img src={"file:///" + pic.path} />
      ))}
    </div>
  );
};

export default TestPics;
