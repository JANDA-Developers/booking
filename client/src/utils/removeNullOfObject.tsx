export const removeNullOfObject = (obj: any) => {
  if (typeof obj === "object") {
    for (let [key, value] of Object.entries(obj)) {
      if (value === null) delete obj[key];
      else if (typeof value === "object") removeNullOfObject(value);
    }
  }
};
export default removeNullOfObject;
