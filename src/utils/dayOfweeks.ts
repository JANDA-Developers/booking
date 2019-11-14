import { DayOfWeekPriceInput } from "../types/api";

const dayarrEnToValueArr = (dayArr: DayOfWeekPriceInput[]) => {
  const sun = dayArr.find(d => d.day === "SUN") || null;
  const sunPrice = sun ? sun.price : null;
  const mon = dayArr.find(d => d.day === "MON") || null;
  const monPrice = mon ? mon.price : null;
  const tue = dayArr.find(d => d.day === "TUE") || null;
  const tuePrice = tue ? tue.price : null;
  const wed = dayArr.find(d => d.day === "WED") || null;
  const wedPrice = wed ? wed.price : null;
  const thr = dayArr.find(d => d.day === "THU") || null;
  const thrPrice = thr ? thr.price : null;
  const fri = dayArr.find(d => d.day === "FRI") || null;
  const friPrice = fri ? fri.price : null;
  const sat = dayArr.find(d => d.day === "SAT") || null;
  const satPrice = sat ? sat.price : null;

  return [sunPrice, monPrice, tuePrice, wedPrice, thrPrice, friPrice, satPrice];
};

export default dayarrEnToValueArr;
