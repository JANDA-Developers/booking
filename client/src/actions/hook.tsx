/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* ts-ignore */
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { bool } from 'prop-types';
import { CLOUDINARY_KEY } from '../keys';

// 한방에 패치
// A X I O S  : (http://codeheaven.io/how-to-use-axios-as-your-http-client/)

interface useFetchProp {
  url: string | undefined;
}

const useFetch = (url: useFetchProp) => {
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
  const doGet = (url: useFetchProp) => {
    setIsLoading(true);
    setInUrl(url);
  };

  return [data, isLoading, isError, doGet];
};

//  이미지 업로더
const useImageUploader = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onChange = async (event: React.ChangeEventHandler<HTMLInputElement | undefined>) => {
    if (event) {
      const {
        target: { name, value, files },
      }: any = event;
      if (files) {
        setUploading(true);
        const formData = new FormData();
        formData.append('api_key', CLOUDINARY_KEY || '');
        formData.append('upload_preset', 'jandaAPP');
        formData.append('file', files[0]);
        formData.append('timestamp', String(Date.now() / 1000));
        try {
          const {
            data: { secure_url },
          } = await Axios.post('https://api.cloudinary.com/v1_1/stayjanda-com/image/upload', formData);
          if (secure_url) {
            setFileUrl(secure_url);
          }
        } catch (error) {
          setIsError(true);
          console.error(error);
          toast.error(error);
        } finally {
          setUploading(false);
        }
      }
    }
  };

  return {
    fileUrl,
    uploading,
    isError,
    onChange,
    setFileUrl,
  };
};

// Our hook
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

export interface TUseInput {
  value: string;
  openModal: (inInfo: any) => void;
  onChange: (foo: string) => void;
  info: any;
}

// 밸리데이션을 포함한 훅 리턴
function useInput<TUseInput>(defaultValue: string, defulatValid: boolean | string = '') {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState(defulatValid);

  const onChange = (value: string) => {
    setValue(value);
  };

  const onChangeValid = (value: boolean | string) => {
    setIsValid(value);
  };

  return {
    value,
    onChange,
    isValid,
    onChangeValid,
  };
}

// NAME SPACE
function useCheckBox(defaultValue: boolean) {
  const [checked, setChecked] = useState(defaultValue);

  const onChange = (value: boolean) => {
    setChecked(value);
  };

  return {
    checked,
    onChange,
  };
}

// NAME SPACE
function useRadio(defaultValue: any = '') {
  const [value, setValue] = useState(defaultValue);

  const onChange = (value: any) => {
    setValue(value);
  };

  return [value, onChange];
}

// NAME SPACE
function useSwitch(defaultValue: boolean) {
  const [checked, setChecked] = useState(defaultValue);

  const onChange = (value: boolean) => {
    setChecked(value);
  };

  return { checked, onChange };
}

// NAME SPACE
function useSelect(defaultValue: any = {}) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const onChange = (value: any) => {
    setSelectedOption(value);
  };

  return { selectedOption, onChange };
}

function useToggle(defaultValue: any) {
  const [toggle, setToggle] = useState(defaultValue);

  const onClick = () => {
    setToggle(!toggle);
  };

  return [toggle, onClick];
}

// 없어질겁니다
function useModal(defaultValue: boolean) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return [isOpen, openModal, closeModal];
}

export interface TUseModal {
  isOpen: boolean;
  openModal: (inInfo: any) => void;
  closeModal: () => void;
  info: any;
}

function useModal2<TUseModal>(defaultValue: boolean, defaultInfo: any = {}) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const [info, setInfo] = useState(defaultInfo);

  const openModal = (inInfo: any) => {
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
    info,
  };
}

// 🚫 Depreacted 될겁니다.
// booker ID 를 모달 여기 함수에 전달하고 booker info를 리턴하도록 설계
function useBookPOP(defaultValue: boolean) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const [bookerInfo, inSetPOPInfo] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    inSetPOPInfo(null);
  };

  const setModalInfo = (info: any) => {
    inSetPOPInfo(info);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    setModalInfo,
    bookerInfo,
  };
}

export {
  useInput,
  useCheckBox,
  useRadio,
  useSwitch,
  useSelect,
  useToggle,
  useFetch,
  useModal,
  useBookPOP,
  useModal2,
  useDebounce,
  useImageUploader,
};
