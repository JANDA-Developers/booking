import $ from "jquery";

// 두 객체를 합친것을 반환합니다.
// Add가 Original을 오버라이드 합니다.
function mergeObject<T>(original: T, add: any): T {
  if (!add) return original;
  const obj = $.extend(true, original, add);
  return obj;
}

export default mergeObject;
