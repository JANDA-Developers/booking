import { IselectedOption } from "../atoms/forms/selectBox/SelectBox";

//
const optionFineder = (
  options: IselectedOption[],
  value: any
): IselectedOption => {
  const targetOp = options.find(op => op.value === value);
  if (!targetOp) {
    return { value: "", label: "Select" };
  }
  return targetOp;
};

export default optionFineder;
