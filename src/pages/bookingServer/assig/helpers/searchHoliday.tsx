import { IHolidaysByApi } from "../../../../types/interface";
import moment from "moment";

// holiday api 관련
const searchHoliday = (time: Date, holidays: IHolidaysByApi[]) => {
  return holidays.find(holiday => {
    const result = moment(holiday.locdate, "YYYYMMDD").isSame(time, "day");

    return result;
  });
};

export default searchHoliday;
