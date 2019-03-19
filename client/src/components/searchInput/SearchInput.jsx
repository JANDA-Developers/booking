// 참고: https://codepen.io/manpreet/pen/EyXwrE
import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import List from './list';
import './searchInput.scss';
import Icon from '../../atoms/icons/Icons';
import Preloader from '../../atoms/preloader/Preloader';
import searchListFormat from '../../utils/SearchListFormat';

function SearchInput({
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
}) {
  // Naming Format
  const formatDataList = searchListFormat(dataList && dataList.slice(0, maxCount), asName, asDetail);
  const [filteredDataList, SetFilteredDataList] = useState(formatDataList);
  const inputRef = useRef(null);
  const ulRef = useRef(null);

  //  Check it is matched and set filteredDataList
  const setList = (value = inputRef.current.value) => {
    // CASE: do filter
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
  const handleOnKeyPress = (e) => {
    // CASE: press Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const selectedNode = $(ulRef.current)
        .find('.JDsearchInput__li--active')
        .get(0);
      // CASE: children select
      if (selectedNode) {
        // CASE: uncontrolled value change
        onSearch($(selectedNode).attr('value'));
        if (!isTypeChange) inputRef.current.value = $(selectedNode).attr('value');
        $(inputRef.current).blur();
      } else {
        // ConSearchASE: input select
        onSearch(inputRef.current.value);
      }
    }

    // CASE: press up && down
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

  // Handler - input : onChange
  const handleChange = (e) => {
    e.preventDefault();
    if (filter) setList(e.target.value);
    if (isTypeChange) onTypeChange(e.target.value);
  };

  // Handler - input : onFocus
  const handleOnFocus = (e) => {
    e.preventDefault();
    setTimeout(() => {
      $(ulRef.current).show();
    }, 100);
  };

  // Handler - input : onBlur
  const handleOnBlur = (e) => {
    e.preventDefault();
    setTimeout(() => {
      $(ulRef.current).hide();
    }, 100);
  };

  // Handler - list : onClick
  const handleOnListClick = (e) => {
    e.preventDefault();
    const value = $(e.currentTarget).attr('value');
    $(inputRef.current).val(value);
    onSearch(value);
  };

  // Handler - list : onKeyPress - 🚫 useless
  const handleOnListKeyPress = (e) => {
    e.preventDefault();
  };

  // Handler - icon : onKeyPress
  const handleOnSearchClick = () => {
    onSearch(inputRef.current.value);
  };

  const classes = classNames({
    JDsearchInput: true,
    'JDsearchInput--staticList': staticList === true,
  });

  useEffect(setList, [dataList]); // 유저 리스트가 변할때마다 새롭게 리스트를 작성해줍니다
  useEffect(() => {
    if (isMatched) $(inputRef.current).addClass('JDsearchInput__input--matched');
  }); // 매칭된 리스트일경우에 인풋에 밸리

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
          tabIndex="0"
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
        asName={asName}
        asDetail={asDetail}
      />
    </div>
  );
}

SearchInput.propTypes = {
  dataList: PropTypes.array,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onSearch: PropTypes.func,
  setIsMatched: PropTypes.func,
  onTypeChange: PropTypes.func,
  staticList: PropTypes.bool,
  filter: PropTypes.bool,
  isTypeChange: PropTypes.bool,
  isMatched: PropTypes.bool,
  isLoading: PropTypes.bool,
  alwaysListShow: PropTypes.bool,
  onTypeValue: PropTypes.string,
  asName: PropTypes.string,
  asDetail: PropTypes.string,
  feedBackMessage: PropTypes.string,
  maxCount: PropTypes.number,
};

SearchInput.defaultProps = {
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
export default SearchInput;
