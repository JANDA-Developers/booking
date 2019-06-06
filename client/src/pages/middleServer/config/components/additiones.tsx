import React from "react";
import {IAddition} from "./AddtionModule";

const exampleDetailDescription = () => (
  <div>
    <span>이건 예시입니다.</span>
  </div>
);

export const additiones: IAddition[] = [
  {
    description: "Description Fro Moudles",
    name: "확장모듈1",
    updateAt: "2019-05-23",
    detailDescription: exampleDetailDescription
  }
];
