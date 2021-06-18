import { IHolidaysByApi } from "../types/interface";
import dayjs from "dayjs";

const searchHoliday = (time: Date, holidays: IHolidaysByApi[]) => {
  return holidays.find(holiday => {
    const result = dayjs(holiday.locdate, "YYYYMMDD").isSame(time, "day");

    return result;
  });
};

export default searchHoliday;
