/* eslint-disable no-restricted-syntax */

const searchListCreater = (dataList: Array<any>, asName?: string, asDetail?: string, asId?: string) => {
  let formatedArray: { name: string; detail?: string }[] = [];
  if (dataList) {
    formatedArray = dataList.map((value) => {
      const tempObject = { name: 'asName Not Matched', detail: undefined, id: undefined };
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const inValue = value[key];
          if (key === asName) {
            tempObject.name = inValue;
          }
          if (key === asDetail) {
            tempObject.detail = inValue;
          }
          if (key === asId) {
            tempObject.id = inValue;
          }
        }
      }
      return tempObject;
    });
  }
  return formatedArray;
};

export default searchListCreater;
