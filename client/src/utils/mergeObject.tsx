import $ from "jquery";

function mergeObject<T>(original: any, add: any): T {
  console.log("original");
  console.log(original);
  console.log("add");
  console.log(add);
  console.log("obj");
  const obj = $.extend(true, original, add);
  console.log(obj);
  return obj;
}

export default mergeObject;
