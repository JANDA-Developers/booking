/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
const searchListMaker = (data, AsName) => {
  const formatedArray = [];
  if (data) {
    data.map((value) => {
      const tempObject = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const inValue = value[key];
          if (key === AsName) {
            tempObject.name = inValue;
          }
        }
      }
      formatedArray.push(tempObject);
    });
  }
  return formatedArray;
};

export default searchListMaker;
