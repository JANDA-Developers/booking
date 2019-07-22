import {useFetch} from "../actions/hook";
import Axios from "axios";

const getKoreaSpecificDay = async () => {
  for (let i = 1; i < 13; i++) {
    const url =
      "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
    const queryParams = `?${encodeURIComponent("ServiceKey")}=${
      process.env.REACT_APP_API_SPECIFIC_DAY_KEY
    }&${encodeURIComponent("solYear")}=${encodeURIComponent(
      "2015"
    )}&${encodeURIComponent("solMonth")}=${encodeURIComponent("08")}`;

    const result = await Axios(url + queryParams);
  }
};

export default getKoreaSpecificDay;
