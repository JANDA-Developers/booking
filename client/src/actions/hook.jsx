/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { CLOUDINARY_KEY } from '../keys';

// 한방에 패치
// A X I O S  : (http://codeheaven.io/how-to-use-axios-as-your-http-client/)
const useFetch = (url) => {
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
  const doGet = (url) => {
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

  const onChange = async (event) => {
    if (event) {
      const {
        target: { name, value, files },
      } = event;
      if (files) {
        setUploading(true);
        const formData = new FormData();
        formData.append('api_key', CLOUDINARY_KEY);
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

  useEffect(() => {
    onChange();
  });

  return {
    fileUrl,
    uploading,
    isError,
    onChange,
  };
};

// Our hook
function useDebounce(value, delay) {
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

// 밸리데이션을 포함한 훅 리턴
function useInput(defaultValue, defulatValid = '') {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState(defulatValid);

  const onChange = (value) => {
    setValue(value);
  };

  const onChangeValid = (value) => {
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
function useCheckBox(defaultValue) {
  const [checked, setChecked] = useState(defaultValue);

  const onChange = (value) => {
    setChecked(value);
  };

  return {
    checked,
    onChange,
  };
}

// NAME SPACE
function useRadio(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (value) => {
    setValue(value);
  };

  return [value, onChange];
}

// NAME SPACE
function useSwitch(defaultValue) {
  const [checked, setChecked] = useState(defaultValue);

  const onChange = (value) => {
    setChecked(value);
  };

  return { checked, onChange };
}

// NAME SPACE
function useSelect(defaultValue) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const onChange = (value) => {
    setSelectedOption(value);
  };

  return { selectedOption, onChange };
}

function useToggle(defaultValue) {
  const [toggle, setToggle] = useState(defaultValue);

  const onClick = () => {
    setToggle(!toggle);
  };

  return [toggle, onClick];
}

// 없어질겁니다
function useModal(defaultValue) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return [isOpen, openModal, closeModal];
}

function useModal2(defaultValue, defaultInfo = '') {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const [info, setInfo] = useState(defaultInfo);

  const openModal = (inInfo) => {
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

// booker ID 를 모달 여기 함수에 전달하고 booker info를 리턴하도록 설계
function useBookPOP(defaultValue) {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const [bookerInfo, inSetPOPInfo] = useState(null);

  const openModal = (tmp, tmp2) => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    inSetPOPInfo(null);
  };

  const setModalInfo = (info) => {
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
