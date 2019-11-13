import { IHolidaysByApi, JdFile } from "../types/interface";

import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_FILE } from "../apollo/queries";
import client from "../apollo/apolloClient";
import { singleUpload, singleUploadVariables } from "../types/api";
// @ts-ignore
import Resizer from "react-image-file-resizer";


const getKoreaSpecificDayHook = (
    years: string[]
  ): {
    datas: IHolidaysByApi[];
    loading: boolean;
  } => {
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState<IHolidaysByApi[]>([]);
  
    let temp: IHolidaysByApi[] = [];
    const get = async () => {
      outer: for (let year of years) {
        for (let i = 1; i < 13; i++) {
          const url =
            "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
          const queryParams = `?${encodeURIComponent("ServiceKey")}=${
            process.env.REACT_APP_API_SPECIFIC_DAY_KEY
          }&${encodeURIComponent("solYear")}=${encodeURIComponent(
            year
          )}&${encodeURIComponent("solMonth")}=${encodeURIComponent(`0${i}`)}`;
  
          try {
            const { data } = await Axios(url + queryParams);
            const item = data.response.body.items;
            if (Array.isArray(item.item)) {
              item.item.forEach((inItem: any) => {
                if (inItem) {
                  inItem.locdate = inItem.locdate.toString();
                  temp.push(inItem);
                }
              });
            } else {
              if (item.item) {
                item.tiem.locdate = item.item.locdate.toString();
                temp.push(item.item);
              }
            }
          } catch {
            console.error("can't fetch holidays");
            break outer;
          }
        }
      }
    };
  
    useEffect(() => {
      get().finally(() => {
        setDatas(temp);
        setLoading(false);
      });
    }, [years.join()]);
  
    return { datas, loading };
  };
  


// 
// const [uploadMutation] = useMutation<singleUpload, singleUploadVariables>(
//   UPLOAD_FILE,
//   { client }
// );
//       const uploadImg = async (
//     uriOrFile: any,
//     fileName?: string,
//     fileType?: string
//     ) => {
//         let file: any;
//         if (typeof uriOrFile === "string") {
//             file = new File([uriOrFile], fileName!, { type: fileType });
//         } else {
//             file = uriOrFile;
//         }
//         const data = await uploadMutation({ variables: { file: file } });
//         // const file = muResult(data, "SingleUpload", "jdFile");
//         if (data.data) {
//             delete data.data.SingleUpload.__typename;
//             setFileView(data);
//         }
//     };
    
    
