import {JDColor, TextAlign} from "../types/enum";

const colorClass = (boxName: string, color?: JDColor | null) => {
  let obj: any = {};
  obj[`${boxName}--primary`] = color === "primary";
  obj[`${boxName}--point`] = color === "point";
  obj[`${boxName}--positive`] = color === "positive";
  obj[`${boxName}--warn`] = color === "warn";
  obj[`${boxName}--error`] = color === "error";
  obj[`${boxName}--new`] = color === "new";
  obj[`${boxName}--black`] = color === "black";
  obj[`${boxName}--white`] = color === "white";

  return obj;
};

const textAlignClass = (boxName: string, align?: TextAlign) => {
  let obj: any = {};
  obj[`${boxName}--left`] = align === "left";
  obj[`${boxName}--center`] = align === "center";
  obj[`${boxName}--right`] = align === "right";

  return obj;
};

export {textAlignClass, colorClass};
