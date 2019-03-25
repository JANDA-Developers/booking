/* eslint-disable no-restricted-syntax */

const searchListMaker = (dataList, asName, asDetail) => {
  let formatedArray = [];
  if (dataList) {
    formatedArray = dataList.map((value) => {
      const tempObject = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const inValue = value[key];
          if (key === asName) {
            tempObject.name = inValue;
          }
          if (key === asDetail) {
            tempObject.detail = inValue;
          }
        }
      }
      return tempObject;
      // formatedArray.push(tempObject);
    });
  }
  return formatedArray;
};

export default searchListMaker;
