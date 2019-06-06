import * as _ from "lodash";
export const removeUndefined = (obj: object) => {
    return _.pickBy(obj, _.identity);
};
