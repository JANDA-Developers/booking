import { JDColor, TextAlign, TextSize } from "../types/enum";

const colorClass = (boxName: string, color?: JDColor | null) => {
  let obj: any = {};
  obj[`${boxName}--primary`] = color === "primary";
  obj[`${boxName}--point`] = color === "point";
  obj[`${boxName}--positive`] = color === "positive";
  obj[`${boxName}--warn`] = color === "warn";
  obj[`${boxName}--grey`] = color === "grey";
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

const textSizeClass = (boxName: string, size?: TextSize) => {
  let obj: any = {};
  (obj[`${boxName}--h1`] = size === "h1"),
    (obj[`${boxName}--h2`] = size === "h2"),
    (obj[`${boxName}--h3`] = size === "h3"),
    (obj[`${boxName}--h4`] = size === "h4"),
    (obj[`${boxName}--h5`] = size === "h5"),
    (obj[`${boxName}--h6`] = size === "h6"),
    (obj[`${boxName}--normal`] = size === "normal"),
    (obj[`${boxName}--small`] = size === "small"),
    (obj[`${boxName}--tiny`] = size === "tiny"),
    (obj[`${boxName}--superTiny`] = size === "superTiny");

  return obj;
};

export { textAlignClass, colorClass, textSizeClass };
