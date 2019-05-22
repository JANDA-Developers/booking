import moment from "moment";
import {TimePerMs} from "../types/enum";

// 밀리세컨드 타임 스탬프를  00:00:00:00 으로 만들어줍니다.

const parallax = () => new Date().getTimezoneOffset() * 1000 * 60;
const setMidNight = (date: number) =>
  Math.floor(date / TimePerMs.DAY) * TimePerMs.DAY - 32400 * 1000;
const setYYYYMMDD = (date: any) => {
  if (!date) {
    return moment()
      .toISOString()
      .split("T")[0];
  }
  return moment(date)
    .toISOString()
    .split("T")[0];
};
export default setMidNight;
export {parallax, setYYYYMMDD};
