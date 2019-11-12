import { STATIC_COLORS } from "../types/enum";
import Color from "color";
import randomColor from "randomcolor";

// 통계에 필요한 색상들을 가져옴
export const getStaticColors = (
  count: number = 10,
  option?: {
    light: boolean;
  }
): string[] => {
  // 랜덤컬러
  let randomColors = randomColor({
    count: count - STATIC_COLORS.length
  });

  // For 타입스크립트
  if (typeof randomColors === "string") {
    randomColors = [...STATIC_COLORS, randomColors];
  } else {
    randomColors = [...STATIC_COLORS, ...randomColors];
  }
  if (option && option.light) {
    randomColors = randomColors.map(color =>
      Color(color)
        .lighten(0.15)
        .toString()
    );
  }

  return randomColors;
};
