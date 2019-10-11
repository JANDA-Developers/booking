import $ from "jquery";

function mergeObject<T>(original: T, add: any): T {
  if (!add) return original;
  const obj = $.extend(true, original, add);
  return obj;
}

export default mergeObject;
