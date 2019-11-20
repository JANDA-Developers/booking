import moment from "moment";
import {TimePerMs} from "../types/enum";

// 밀리세컨드 타임 스탬프를  00:00:00:00 으로 만들어줍니다.
const parallax = () => new Date().getTimezoneOffset() * 1000 * 60;

// 자정으로 시간을 맞춰주는 함수
const setMidNight = (time: number) =>
  Math.floor(time / TimePerMs.DAY) * TimePerMs.DAY - 32400 * 1000;

const to4YMMDD = (date: any) => {
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
export {parallax, to4YMMDD};
