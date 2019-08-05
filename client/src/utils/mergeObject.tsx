import $ from "jquery";

function mergeObject<T>(original: any, add: any): T {
  const obj = $.extend(true, original, add);
  return obj;
}

export default mergeObject;
