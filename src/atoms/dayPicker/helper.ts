import { LANG } from "../../hooks/hook";

export const getDateCharLang = () => {
  const MONTHS = [
    `1${LANG("month")}`,
    `2${LANG("month")}`,
    `3${LANG("month")}`,
    `4${LANG("month")}`,
    `5${LANG("month")}`,
    `6${LANG("month")}`,
    `7${LANG("month")}`,
    `8${LANG("month")}`,
    `9${LANG("month")}`,
    `10${LANG("month")}`,
    `11${LANG("month")}`,
    `12${LANG("month")}`
  ];
  const WEEKDAYS_LONG = [
    LANG("sun"),
    LANG("mon"),
    LANG("tue"),
    LANG("wed"),
    LANG("thu"),
    LANG("fri"),
    LANG("sat")
  ];
  const WEEKDAYS_SHORT = [
    LANG("sun"),
    LANG("mon"),
    LANG("tue"),
    LANG("wed"),
    LANG("thu"),
    LANG("fri"),
    LANG("sat")
  ];
  return { WEEKDAYS_SHORT, WEEKDAYS_LONG, MONTHS };
};
