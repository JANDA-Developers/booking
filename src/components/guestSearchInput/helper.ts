import _ from "lodash";
import { isNumberMinMax, isYYYYMMDD } from "../../utils/inputValidations";
import { GetBookingsFilterInput } from "../../types/api";

// check value type for filter
const findSearchType = (
    value: string
): "phoneNumnber" | "name" | "stayDate" => {
    const isPhoneNumber = isNumberMinMax(value, 4, 11);
    if (isYYYYMMDD(value)) return "stayDate";
    else if (isPhoneNumber) return "phoneNumnber";
    else return "name";
};


// search filter object create
const searchFilterCreater = (value: string): GetBookingsFilterInput => {
    const target = findSearchType(value);

    if (target === "name") {
        return {
            name: value
        };
    } else if (target === "phoneNumnber") {
        return {
            phoneNumnber: value
        };
    } else if (target === "stayDate") {
        return {
            stayDate: {
                checkIn: value,
                checkOut: value
            }
        };
    } else {
        return {};
    }
};

export const debouncedFilterCreater = _.debounce(searchFilterCreater, undefined, {
    trailing: true,
    leading: true,
});
