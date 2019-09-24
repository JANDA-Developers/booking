import {IHolidaysByApi} from "../types/interface";
import moment from "moment";

const searchHoliday = (time: Date, holidays: IHolidaysByApi[]) => {
  return holidays.find(holiday => {
    const result = moment(holiday.locdate, "YYYYMMDD").isSame(time, "day");

    return result;
  });
};

export default searchHoliday;
