import _ from "lodash";

const isDiff = (objects: Array<any>, value: Array<any>) => {
  const diff = _.differenceWith(objects, value, _.isEqual);

  return diff.length !== 0;
};
// => [{ 'x': 2, 'y': 1 }]

export default isDiff;
