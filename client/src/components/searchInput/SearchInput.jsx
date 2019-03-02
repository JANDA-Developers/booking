// 참고: https://codepen.io/manpreet/pen/EyXwrE
import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import List from './list';
import './searchInput.scss';
import Icon from '../../atoms/icons/Icons';

function SearchInput({
  userList,
  staticList,
  placeholder,
  label,
  onSearch,
  unfilter,
  onTypeChange,
  onTypeValue,
  isMatched,
  setIsMatched,
  alwaysListShow,
}) {
  const [inUserList, inSetUserList] = useState(userList); // * 필터에 의해서 걸러진 유저 리스트
  const inputRef = useRef(null);
  const ulRef = useRef(null);

  // 리스트를 여러가지 조건으로 분기 필터
  const setList = (value = inputRef.current.value) => {
    if (!unfilter) {
      let filteredItems = [];
      if (value !== '') {
        filteredItems = userList.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      }
      inSetUserList(filteredItems);
    } else if (value !== '' || alwaysListShow) {
      // 필터를 사용안하는 조건이면 현재 리스트는 Prop의 리스트와 동일
      inSetUserList(userList);
    }
    if (value === '') {
      inSetUserList([]);
    }
  };

  // input값이 바뀔때
  const handleChange = ({ target: { value } }) => {
    // 값이 바뀌지 않는 조건이 아니라면
    if (!unfilter) {
      setList(value);
    }
    // 칠때마다 값을 반환하는 조건이라면
    if (onTypeChange) onSearch(value);
  };

  //  리스트를 클릭했을때
  const handleOnListClick = (e) => {
    onSearch($(e.target).attr('value'));
  };

  //  리스트에 포커스후 키를 눌를떄  -- 현재 의미없습니다
  const handleOnListKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  // 포커싱 키클릭
  const handleOnKeyPress = (e) => {
    // 엔터를 누를경우
    if (e.key === 'Enter') {
      const selectedNode = $(ulRef.current).find('.JDsearchInput__li--active');
      if (selectedNode.length) {
        onSearch($(selectedNode).attr('value'));
      } else {
        onSearch(inputRef.current.value);
      }
    }
    // 위 아래 화살표 일경우
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (ulRef.current.children.length) {
        const selectedNode = $(ulRef.current).find('.JDsearchInput__li--active');
        if (selectedNode.length) {
          if (e.key === 'ArrowUp') {
            $(selectedNode)
              .prev()
              .addClass('JDsearchInput__li--active');
          } else {
            $(selectedNode)
              .next()
              .addClass('JDsearchInput__li--active');
          }
          $(selectedNode).removeClass('JDsearchInput__li--active');
        } else if (e.key === 'ArrowDown') {
          ulRef.current.children[0].classList.add('JDsearchInput__li--active');
        }
      }
    }
  };

  // 서치 아이콘을 누를경우
  const handleOnSearchClick = () => {
    onSearch(inputRef.current.value);
  };

  const classes = classNames({
    JDsearchInput: true,
    'JDsearchInput--staticList': staticList === true,
  });

  useEffect(setList, [userList]); // 유저 리스트가 변할때마다 새롭게 리스트를 작성해줍니다
  useEffect(() => {
    if (isMatched) $(inputRef.current).addClass('JDsearchInput__input--valid');
  }); // 매칭된 리스트일경우에 인풋에 밸리

  return (
    <div className={classes}>
      <div className="JDsearchInput__input_wrapper">
        <span className="JDsearchInput__label">{label}</span>
        <input
          onKeyDown={handleOnKeyPress}
          ref={inputRef}
          className="JDsearchInput__input"
          onChange={handleChange}
          placeholder={placeholder}
          value={onTypeValue || undefined}
        />
        <span
          tabIndex="0"
          role="button"
          onClick={handleOnSearchClick}
          onKeyDown={handleOnKeyPress}
          className="JDsearchInput__icon"
        >
          <Icon hover icon="magnifier" />
        </span>
      </div>
      <List
        currentValue={onTypeValue}
        onListKeyPress={handleOnListKeyPress}
        onListClick={handleOnListClick}
        refContainer={ulRef}
        userList={inUserList}
        setIsMatched={setIsMatched}
      />
    </div>
  );
}

SearchInput.propTypes = {
  userList: PropTypes.array,
  staticList: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onSearch: PropTypes.func,
  setIsMatched: PropTypes.func,
  unfilter: PropTypes.bool,
  onTypeChange: PropTypes.bool,
  isMatched: PropTypes.bool,
  alwaysListShow: PropTypes.bool,
  onTypeValue: PropTypes.string,
};

SearchInput.defaultProps = {
  userList: {},
  staticList: false,
  placeholder: 'search',
  label: '',
  onSearch: () => {},
  unfilter: false,
  onTypeChange: false,
  isMatched: false,
  alwaysListShow: false,
  onTypeValue: '',
  setIsMatched: () => {},
};
export default SearchInput;
