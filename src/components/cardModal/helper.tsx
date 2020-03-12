import { toNumber } from "../../utils/utils";
import $ from "jquery";

export const scrollSlider = (index: number, scrollContainer: any) => {
  if (scrollContainer.current) {
    const scrollElemntIndex = index;

    const result =
      toNumber($(".creaditCard").outerWidth(true)) * scrollElemntIndex;

    $(scrollContainer.current).animate(
      {
        scrollLeft: result
      },
      500,
      "swing"
    );
  }
};
