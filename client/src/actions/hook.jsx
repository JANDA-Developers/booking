/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';
import Axios from 'axios';

// 한방에 패치
// A X I O S  : (http://codeheaven.io/how-to-use-axios-as-your-http-client/)
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [inUrl, setInUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

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

  const doGet = (url) => {
    setInUrl(url);
  };

  return [data, isLoading, isError, doGet];
};

// 밸리데이션을 포함한 훅 리턴
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState('');

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

// OnChnage 로서 리턴
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

function useRadio(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (value) => {
    setValue(value);
  };

  return [value, onChange];
}

function useSwitch(defaultValue) {
  const [checked, setChecked] = useState(defaultValue);

  const onChange = (value) => {
    setChecked(value);
  };

  return { checked, onChange };
}

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

export {
  useInput, useCheckBox, useRadio, useSwitch, useSelect, useToggle, useFetch, useModal,
};
