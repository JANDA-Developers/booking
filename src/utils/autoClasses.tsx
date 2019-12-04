import {
  JDColor,
  TextAlign,
  TextSize,
  IconSize,
  TMarginSize
} from "../types/enum";

// 업데이트 => 구성요소에 들어가는 글로벌 css를 이걸로교체
// 우선은 마진만 시험적용
// 이걸로 하면 css를 줄일수있음
// 성능차이를 기대하진 않지만 그떄마다 클래스를 쓰지 않고
// 글로벌 css를 사용하는건 문맥상 좋아보이지 않음 ㅠ
const JDmrClass = (size?: TMarginSize | null) => {
  let obj: any = {};
  obj[`JDstandard-space0`] = size === "no";
  obj[`JDstandard-superTiny`] = size === "tiny";
  obj[`JDstandard-tiny`] = size === "tiny";
  obj[`JDstandard-small`] = size === "small";
  obj[`JDstandard-space`] = size === "normal";
  obj[`JDstandard-large`] = size === "large";
  obj[`JDstandard-huge`] = size === "huge";
  obj[`JDstandard-largest`] = size === "largest";

  return obj;
};

const JDmbClass = (size?: TMarginSize) => {
  let obj: any = {};
  obj[`JDstandard-mb0`] = size === "no";
  obj[`JDstandard-largest-mb`] = size === "largest";
  obj[`JDstandard-huge-mb`] = size === "huge";
  obj[`JDstandard-large-mb`] = size === "large";
  obj[`JDstandard-margin-bottom`] = size === "normal";
  obj[`JDstandard-small-mb`] = size === "small";
  obj[`JDstandard-tiny-mb`] = size === "tiny";
  obj[`JDstandard-superTiny-mb`] = size === "superTiny";

  return obj;
};

// mixin 파일의
const iconSizeClass = (boxName: string, size?: IconSize | null) => {
  let obj: any = {};
  obj[`${boxName}--tiny`] = size === "tiny";
  obj[`${boxName}--small`] = size === "small";
  obj[`${boxName}--normal`] = size === "normal";
  obj[`${boxName}--large`] = size === "large";
  obj[`${boxName}--huge`] = size === "huge";
  obj[`${boxName}--largest`] = size === "largest";

  return obj;
};

// --prefixer 와 함께 동작함
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
  obj[`${boxName}--blue`] = color === "blue";

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

const mbClass = (boxName: string, size?: TMarginSize) => {
  let obj: any = {};
  obj[`${boxName}--largest-mb`] = size === "largest";
  obj[`${boxName}--huge-mb`] = size === "huge";
  obj[`${boxName}--large-mb`] = size === "large";
  obj[`${boxName}--space-mb`] = size === "normal";
  obj[`${boxName}--small-mb`] = size === "small";
  obj[`${boxName}--tiny-mb`] = size === "tiny";
  obj[`${boxName}--superTiny-mb`] = size === "superTiny";

  return obj;
};

export {
  iconSizeClass,
  JDmbClass,
  JDmrClass,
  mbClass,
  textAlignClass,
  colorClass,
  textSizeClass
};
