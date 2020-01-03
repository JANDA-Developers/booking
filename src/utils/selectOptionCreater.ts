import { IselectedOption } from "../atoms/forms/selectBox/SelectBox";

interface IProps {
  count: number;
  start?: number;
  labelAdd?: string;
}

const selectOpCreater = ({
  count,
  labelAdd = "",
  start = 0
}: IProps): IselectedOption<number>[] => {
  return Array(count)
    .fill(0)
    .map((value, index) => ({
      label: `${index + start}${labelAdd}`,
      value: index + start
    }));
};

export default selectOpCreater;
