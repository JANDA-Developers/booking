// 참고: https://codepen.io/manpreet/pen/EyXwrE
import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import List from './list';
import './searchInput.scss';
import Icon from '../icons/Icons';
import Preloader from '../preloader/Preloader';
import searchListFormat from '../../utils/SearchListFormat';
import { isEmpty } from '../../utils/utils';

interface IProps {
  dataList: Array<any>;
  placeholder?: string;
  label?: string;
  onSearch?(foo?: string | null): any;
  setIsMatched?(foo?: boolean): any;
  onTypeChange?(foo?: string): any;
  staticList?: boolean;
  filter?: boolean;
  isTypeChange?: boolean;
  isMatched?: boolean;
  isLoading?: boolean;
  alwaysListShow?: boolean;
  onTypeValue?: string;
  asName?: string;
  asDetail?: string;
  feedBackMessage?: string;
  maxCount?: number;
}

const JDsearchInput: React.FC<IProps> = ({
  dataList,
  staticList,
  placeholder,
  label,
  onSearch,
  filter,
  isTypeChange,
  onTypeChange,
  onTypeValue,
  isMatched,
  setIsMatched,
  alwaysListShow,
  asName,
  asDetail,
  isLoading,
  feedBackMessage,
  maxCount,
}) => {
  // Naming Format
  const formatDataList: Array<any> = searchListFormat(dataList && dataList.slice(0, maxCount), asName, asDetail);
  const [filteredDataList, SetFilteredDataList] = useState(formatDataList);
  const inputRef: any = useRef(null);
  const ulRef: any = useRef(null);

  //  value와 메치되는 리스트를 찾습니다.
  const setList = (value = inputRef.current.value) => {
    // CASE: 필터할경우
    if (filter) {
      let filteredItems = []; // if value == '' filter all
      if (value !== '') {
        filteredItems = formatDataList.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      }
      SetFilteredDataList(filteredItems);
    } else if (value !== '' || alwaysListShow) SetFilteredDataList(formatDataList);
    // CASE: input has no value
    if (value === '' && !alwaysListShow) SetFilteredDataList([]);
  };

  // Handler - input : onKeyPress
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // CASE: 엔터를 쳤을경우에
    if (e.key === 'Enter') {
      e.preventDefault();
      const selectedNode = $(ulRef.current)
        .find('.JDsearchInput__li--active')
        .get(0);
      // CASE: 키보드상 선택된 노드가 있을경우에
      if (selectedNode) {
        // 노드의 값을 방출
        onSearch && onSearch($(selectedNode).attr('value'));
        // ❓ 왜 분기처리 했는지 기억안남
        if (!isTypeChange) inputRef.current.value = $(selectedNode).attr('value');
        $(inputRef.current).blur();
      } else {
        // ❓ 이게 필요한가? 무조건 노드가 있을것 같은데.
        onSearch && onSearch(inputRef.current.value);
      }
    }

    // ⌨️ 키보드 위아래로 움직일경우에 노드 선택
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      // CASE: ul has no children
      if (!ulRef.current.children.length) return;

      const selectedNode = $(ulRef.current).find('.JDsearchInput__li--active');

      // CASE: li is selected
      if (selectedNode.length) {
        // active select
        if (e.key === 'ArrowUp') {
          $(selectedNode)
            .prev()
            .addClass('JDsearchInput__li--active');
        } else {
          $(selectedNode)
            .next()
            .addClass('JDsearchInput__li--active');
        }
        // remove select
        $(selectedNode).removeClass('JDsearchInput__li--active');

        // first select
      } else if (e.key === 'ArrowDown') ulRef.current.children[0].classList.add('JDsearchInput__li--active');
    }
  };

  // Handler - 인풋 : onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (filter) setList(e.target.value);
    if (isTypeChange && onTypeChange) onTypeChange(e.target.value);
  };

  // Handler - 인풋 : onFocus
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTimeout(() => {
      $(ulRef.current).show();
    }, 100);
  };

  // Handler - 인풋 : onBlur
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTimeout(() => {
      $(ulRef.current).hide();
    }, 100);
  };

  // Handler - 리스트 : onClick
  const handleOnListClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const value = $(e.currentTarget).attr('value');
    $(inputRef.current).val(value || '');
    onSearch && onSearch(value);
  };

  // Handler - 리스트 : onKeyPress - 🚫 useless
  const handleOnListKeyPress = (e: any) => {
    e.preventDefault();
  };

  // Handler - 아이콘 : onClick
  const handleOnSearchClick = () => {
    if (onSearch) onSearch(inputRef.current.value);
  };

  const classes = classNames({
    JDsearchInput: true,
    'JDsearchInput--staticList': staticList === true,
    'JDsearchInput--labeled': label !== undefined,
  });

  useEffect(setList, [dataList]); // 유저 리스트가 변할때마다 새롭게 리스트를 찾습니다.
  // 매칭된 리스트가 있을경우에 클래스를 붙여줍니다.
  useEffect(() => {
    if (isMatched) $(inputRef.current).addClass('JDsearchInput__input--matched');
  }, [isMatched]);

  return (
    <div className={classes}>
      <div className="JDsearchInput__input_wrapper">
        <span className="JDsearchInput__label">{label}</span>
        <input
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={handleOnKeyPress}
          ref={inputRef}
          className="JDsearchInput__input"
          onChange={handleChange}
          placeholder={placeholder}
          value={onTypeValue}
        />
        <span
          tabIndex={0}
          role="button"
          onClick={handleOnSearchClick}
          onKeyDown={handleOnKeyPress}
          className="JDsearchInput__icon"
        >
          {isLoading ? <Preloader /> : <Icon hover icon="magnifier" />}
        </span>
        {feedBackMessage !== '' && <span className="JDsearchInput__feedBack">{`${feedBackMessage}`}</span>}
      </div>
      <List
        currentValue={onTypeValue}
        onListKeyPress={handleOnListKeyPress}
        onListClick={handleOnListClick}
        refContainer={ulRef}
        dataList={filteredDataList}
        setIsMatched={setIsMatched}
      />
    </div>
  );
};

JDsearchInput.defaultProps = {
  dataList: [],
  staticList: false,
  filter: true,
  isTypeChange: false,
  isMatched: false,
  alwaysListShow: false,
  isLoading: false,
  label: '',
  onTypeValue: '',
  feedBackMessage: '',
  placeholder: 'search',
  asName: 'name',
  asDetail: 'detail',
  onSearch: () => {},
  setIsMatched: () => {},
  onTypeChange: () => {},
  maxCount: 999,
};
export default JDsearchInput;
