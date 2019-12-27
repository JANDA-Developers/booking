import { IselectedOption } from "../atoms/forms/selectBox/SelectBox";

//
const optionFineder = (
  options: IselectedOption[],
  value: any
): IselectedOption => {
  const targetOp = options.find(op => op.value === value);
  if (!targetOp) {
    throw Error("optionFineder :: can not find option of value");
  }
  return targetOp;
};

export default optionFineder;
