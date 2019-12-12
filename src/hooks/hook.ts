import randomColor from "randomcolor";
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback
} from "react";
import Axios from "axios";
import { IselectedOption } from "../atoms/forms/selectBox/SelectBox";
import { IHolidaysByApi, JdFile } from "../types/interface";
import moment from "moment";
import {
  muResult,
  targetBlink,
  onCompletedMessage,
  instanceOfA
} from "../utils/utils";
import { JDlang as originJDlang } from "../langs/JDlang";
import { TLanguageShort } from "../types/enum";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_FILE } from "../apollo/queries";
import client from "../apollo/apolloClient";
import { singleUpload, singleUploadVariables } from "../types/api";
// @ts-ignore 타입이 존재하지않는 모듈
import Resizer from "react-image-file-resizer";
import { ExecutionResult } from "graphql";
// @ts-ignore
import omitDeep from "omit-deep";
import { DEFAULT_IMAGEUP_LOADER_OPTION } from "../types/defaults";

export type IUseFetch = [
  any,
  boolean,
  boolean,
  (url: string | undefined) => void
];

const useShouldSave = (updateValue: any[]) => {
  const isInitialMount = useRef(true);
  const [shouldSave, setShouldSave] = useState(false);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShouldSave(true);
      // Your useEffect code here to be run on update
    }
  }, updateValue);

  return { shouldSave, setShouldSave };
};

const useFetch = (url: string | undefined = ""): IUseFetch => {
  const [data, setData] = useState([]);
  const [inUrl, setInUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsError(false);

    try {
      const result = await Axios(inUrl);
      setData(result.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inUrl]);

  // 내부에 STATE URL을 바꾸어서 다시동작
  const doGet = (url: string | undefined) => {
    setIsLoading(true);
    url && setInUrl(url);
  };

  return [data, isLoading, isError, doGet];
};

// 이미지업로더
export interface IuseImageUploaderOP {
  file?: JdFile | null;
  uploading?: boolean;
  onChangeFile?(event: React.ChangeEvent<HTMLInputElement | undefined>): void;
}

export interface IuseImageUploader {
  file?: JdFile | null;
  uploading: boolean;
  isError: boolean;
  onChangeFile(event: React.ChangeEvent<HTMLInputElement | undefined>): void;
  option?: IuseImageUploaderOption;
}

export interface IuseImageUploaderOption {
  resizeMaxWidth?: number;
  resizeMaxHeight?: number;
  quality?: number;
}

//  이미지 업로더
const useImageUploader = (
  defaultFile?: JdFile | null,
  propOption?: IuseImageUploaderOption
): IuseImageUploader => {
  const [file, setFile] = useState(defaultFile);
  const [uploading, setUploading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [uploadMutation] = useMutation<singleUpload, singleUploadVariables>(
    UPLOAD_FILE,
    {
      client,
      onCompleted: ({ SingleUpload }) => {
        onCompletedMessage(
          SingleUpload,
          LANG("uploade_compelte"),
          LANG("uploade_fail")
        );
      }
    }
  );

  let option = propOption || DEFAULT_IMAGEUP_LOADER_OPTION;

  // 화면에 나타는 이미지처리
  const setFileView = (result: ExecutionResult<singleUpload>) => {
    const file = muResult(result, "SingleUpload", "jdFile");

    if (!file) {
      setIsError(true);
    } else {
      setFile(omitDeep(file, ["__typename"]));
    }

    setUploading(false);
  };

  // S3로 업로드
  const uploadImg = async (
    // Blob === video, File === img
    uriOrFile: File | Blob,
    fileName?: string,
    fileType?: string
  ) => {
    let file: File;
    const isVideo = instanceOfA(uriOrFile, "name");

    if (isVideo) file = uriOrFile as File;
    else file = new File([uriOrFile], fileName!, { type: fileType });

    console.info("upload file parameter");
    console.log(file);
    const result = await uploadMutation({ variables: { file } });

    if (muResult(result, "SingleUpload")) setFileView(result);
  };

  //  이벤트 객체 => uploadImg(파일객체);
  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setUploading(true);

    const {
      target: { files, validity }
    } = event;

    if (!validity || !files || files.length !== 1 || !files[0]) return;

    const file = files[0];
    const isVideo = file.type.includes("video");

    if (isVideo) {
      uploadImg(file);
    } else {
      // 이미지인경우 리사이즈 해서 업로드
      Resizer.imageFileResizer(
        file,
        option.resizeMaxWidth,
        option.resizeMaxHeight,
        "JPEG",
        option.quality,
        0,
        async (uri: any) => {
          uploadImg(uri, file.name, file.type);
        },
        "blob"
      );
    }
  };

  return {
    file,
    uploading,
    onChangeFile,
    isError,
    option: propOption
  };
};

// 디바운스 정
function useDebounce(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export interface TUseInput<T = string> {
  value: T;
  onChangeValid: (value: boolean | string) => void;
  onChange: (foo: any) => any;
  isValid: any;
}

export type TUseRedirect = [boolean, string, (url: string) => void];

function useRedirect(
  inFlag: boolean = false,
  inUrl: string = ""
): TUseRedirect {
  const [flag, setFlag] = useState(inFlag);
  const [url, inSetRedirect] = useState(inUrl);

  const setRedirect = (redirectUrl: string) => {
    inSetRedirect(redirectUrl);
    setFlag(true);
  };

  return [flag, url, setRedirect];
}

// 밸리데이션을 포함한 훅 리턴
function useInput<T = string>(
  defaultValue: T,
  defulatValid: boolean | string = "",
  prefix?: any = "",
  suffix?: any = ""
): TUseInput<T> {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState(defulatValid);

  const onChange = useCallback((value: any) => {
    setValue(prefix + value + suffix);
  }, []);

  const onChangeValid = useCallback((value: boolean | string) => {
    setIsValid(value);
  }, []);

  return {
    value,
    onChange,
    isValid,
    onChangeValid
  };
}

// 체크박스
function useCheckBox(defaultValue: boolean) {
  const [checked, setChecked] = useState(defaultValue);

  const onChange = (value: boolean) => {
    setChecked(value);
  };

  return {
    checked,
    onChange
  };
}

// 데이트 픽커
export interface IUseDayPicker {
  from: Date | null;
  setFrom: React.Dispatch<React.SetStateAction<Date | null>>;
  to: Date | null;
  setTo: React.Dispatch<React.SetStateAction<Date | null>>;
  entered: Date | null;
  setEntered: React.Dispatch<React.SetStateAction<Date | null>>;
  setDate: (date: Date) => void;
}

function useDayPicker(
  defaultFrom: Date | null | string,
  defaultTo: Date | null | string
): IUseDayPicker {
  let fromTemp: Date | null | string = defaultFrom;
  let toTemp: Date | null | string = defaultTo;
  if (typeof defaultFrom === "string") fromTemp = moment(defaultFrom).toDate();
  if (typeof defaultTo === "string") toTemp = moment(defaultTo).toDate();
  if (typeof fromTemp === "string") throw Error;
  if (typeof toTemp === "string") throw Error;
  const [from, setFrom] = useState<Date | null>(fromTemp);
  const [entered, setEntered] = useState<Date | null>(toTemp);
  const [to, setTo]: any = useState<Date | null>(toTemp);

  const setDate = useCallback((date: Date) => {
    setFrom(date);
    setEntered(date);
    setTo(date);
  }, []);

  return {
    from,
    to,
    entered,
    setFrom,
    setTo,
    setEntered,
    setDate
  };
}

// 색상 필커
export interface IUseColor {
  color: string;
  setColor: (inInfo: string) => void;
  setDisplay: (inInfo: boolean) => void;
  display: boolean;
}

// NAME SPACE
function useColorPicker(defaultValue: string | null): IUseColor {
  let defaultColor: string = "";
  if (!defaultValue) {
    const temp: any = randomColor();
    if (temp instanceof Array) {
      defaultColor = temp[0];
    }
  } else {
    defaultColor = defaultValue;
  }

  const [color, inSetColor] = useState(defaultColor);
  const [display, inSetDisplay] = useState(false);

  const setColor = (value: string) => {
    inSetColor(value);
  };

  const setDisplay = (value: boolean) => {
    inSetDisplay(value);
  };

  return {
    color,
    setColor,
    setDisplay,
    display
  };
}

// 라디오 훅
function useRadio(defaultValue: any = "") {
  const [value, setValue] = useState(defaultValue);

  const onChange = (value: any) => {
    setValue(value);
  };

  return [value, onChange];
}

// 스위치 훅
function useSwitch(defaultValue: boolean) {
  const [checked, setChecked] = useState(defaultValue);

  const onChange = (value: boolean) => {
    setChecked(value);
  };

  return { checked, onChange };
}

function useDrawer(defaultValue: boolean) {
  const [open, setOpen] = useState(defaultValue);

  const onClick = (e: any) => {
    setOpen(!open);
  };

  return { open, onClick };
}

// useRange
function useRange(defaultValue: number, maxValue?: number, minValue?: number) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (value: any) => {
    setValue(value);
  };

  return { value, onChange, maxValue, minValue };
}

export interface IUseSelect<V = any> {
  selectedOption: IselectedOption<V> | null;
  onChange(foo: IselectedOption<V>): void;
}

export interface IUseDrawer {
  onClick: (e: any) => void;
  open: boolean;
}

// 셀렉트박스 훅
function useSelect<V = any>(
  defaultValue: IselectedOption<V> | null
): IUseSelect<V> {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const onChange = useCallback((value: IselectedOption<V>) => {
    setSelectedOption(value);
  }, []);

  return { selectedOption, onChange };
}

// 투글 훅
function useToggle(defaultValue: boolean): [boolean, any] {
  const [toggle, setToggle] = useState(defaultValue);

  const onClick = () => {
    setToggle(!toggle);
  };

  return [toggle, onClick];
}

export interface IUseSideNav {
  sideNavIsOpen: boolean;
  setSideNavIsOpen: (flag?: boolean | undefined) => void;
}

// 사이드 네비
function useSideNav(): IUseSideNav {
  let defaultValue = true;
  const navRecord = localStorage.getItem("JDsideOpen");
  defaultValue = navRecord === "Y";
  const [sideNavIsOpen, setOpen] = useState(defaultValue);

  const setSideNavIsOpen = useCallback(
    (flag?: boolean) => {
      localStorage.setItem("JDsideOpen", sideNavIsOpen ? "N" : "Y");
      setOpen(flag ? flag : !sideNavIsOpen);
    },
    [sideNavIsOpen]
  );

  return { sideNavIsOpen, setSideNavIsOpen };
}

// 투글 훅
function usePagiNation(defaultValue: number): [number, (page: number) => void] {
  const [page, inSetPage] = useState(defaultValue);

  const setPage = (foo: number) => {
    inSetPage(foo);
  };

  return [page, setPage];
}

export interface IUseModal<T = any> {
  isOpen: boolean;
  openModal: (inInfo?: T) => void;
  closeModal: () => void;
  info: T;
}
interface IModalBtn {
  msg: string;
  callBackKey: string;
}

interface IOpenModalInfo {
  [key: string]: any;
  trueBtns?: IModalBtn;
  falseBtns?: IModalBtn;
  txt?: string;
  children?: any;
  callBack?(flag: boolean, callBackKey?: string): void;
}

// 모달훅
function useModal<T = any>(
  defaultValue: boolean = false,
  defaultInfo: any = {}
): IUseModal<T> {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const [info, setInfo] = useState(defaultInfo);

  const openModal = (inInfo?: any) => {
    setIsOpen(true);
    setInfo(inInfo);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    info
  };
}

export let CURRENT_LANG: TLanguageShort = "kr";

// 언어가 결합된 LANG 함수
export let LANG: (key: string, key2?: string) => any = key => {
  return;
};

const useLang = (defaultLang: TLanguageShort) => {
  const [currentLang, setCurrentLang] = useState(defaultLang);

  const changeLang = (lang: TLanguageShort) => {
    CURRENT_LANG = lang;
    setCurrentLang(lang);
  };

  LANG = originJDlang.bind(originJDlang, currentLang);

  return { currentLang, changeLang, JDlang: LANG };
};

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

export interface IUseCheckBoxTable {
  onToogleRow: (key: string) => void;
  checkedIds: string[];
  setCheckedIds: Dispatch<SetStateAction<string[]>>;
  selectAll: any;
  setSelectAll: any;
  onToogleAllRow: () => void;
  isSelected: (key: string) => any;
}

const useCheckBoxTable = (
  defaultCheckIds: string[] = [],
  allIds: string[] = []
): IUseCheckBoxTable => {
  const [checkedIds, setCheckedIds] = useState<string[]>(defaultCheckIds);
  const [selectAll, setSelectAll]: any = useState(false);

  //    모든 라인들에대한 아이디를 투글함
  const onToogleAllRow = () => {
    const updateSelecetedes = allIds.map(id =>
      checkedIds.includes(id) ? "" : id
    );
    setCheckedIds(updateSelecetedes);
    setSelectAll(!selectAll);
  };

  const onToogleRow = (key: string) => {
    if (checkedIds.includes(key)) {
      setCheckedIds([...checkedIds.filter(value => value !== key)]);
    } else {
      setCheckedIds([...checkedIds, key]);
    }
  };

  const isSelected = (key: string) => checkedIds.includes(key);

  return {
    onToogleRow,
    onToogleAllRow,
    checkedIds,
    setCheckedIds,
    selectAll,
    setSelectAll,
    isSelected
  };
};

export {
  useInput,
  useCheckBox,
  useRadio,
  useSwitch,
  useSelect,
  useToggle,
  useFetch,
  useModal,
  useSideNav,
  useRange,
  useDebounce,
  useDrawer,
  useLang,
  useImageUploader,
  useShouldSave,
  useColorPicker,
  useDayPicker,
  getKoreaSpecificDayHook,
  usePagiNation,
  useRedirect,
  useCheckBoxTable
};
