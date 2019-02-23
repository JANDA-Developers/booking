// 참고: https://codepen.io/manpreet/pen/EyXwrE
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import List from './list';
import './searchInput.scss';
import Icon from '../../atoms/icons/Icons';

function SearchInput({
  userList, show, children, label,
}) {
  const [inUserList, inSetUserList] = useState(userList);
  console.log(inUserList);
  const handleChange = ({ target: { value } }) => {
    let filteredItems = [];
    if (value !== '') {
      filteredItems = userList.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    } else {
      filteredItems = [];
    }
    inSetUserList(filteredItems);
  };

  const classes = classNames({
    JDsearchInput: true,
    'JDsearchInput--showList': show === true,
  });

  return (
    <div className={classes}>
      <div className="JDsearchInput__input_wrapper">
        <span className="JDsearchInput__label">{label}</span>
        <input className="JDsearchInput__input" onChange={handleChange} placeholder={children} />
        <span className="JDsearchInput__icon">
          <Icon hover icon="magnifier" />
        </span>
      </div>
      {<List userList={inUserList} />}
    </div>
  );
}

SearchInput.propTypes = {
  userList: PropTypes.object,
  show: PropTypes.bool,
  children: PropTypes.node || PropTypes.string,
  label: PropTypes.string,
};

SearchInput.defaultProps = {
  userList: {},
  show: false,
  children: 'search',
  label: '',
};
export default SearchInput;
