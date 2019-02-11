/* eslint-disable max-len */
// 참고: https://codepen.io/manpreet/pen/EyXwrE
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import List from './list';
import './searchInput.scss';
import Icon from '../../atoms/icons/Icons';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = props;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const self = this;
    const { userList } = this.props;
    console.log(userList);
    const filteredItems = userList.filter(item => item.name.toLowerCase().includes(self.search.value.toLowerCase()));
    this.setState(
      {
        userList: filteredItems,
      },
      () => {
        console.log(userList);
      },
    );
  }

  render() {
    // todo: 이제알겠다 class 자체를 state에 두지말고 render에 둔뒤 그 상태값만 관리하면됨
    const { show, children } = this.props;
    const classes = classNames({
      JDsearchInput: true,
      'JDsearchInput--showList': show === true,
    });

    return (
      <div className={classes}>
        <div className="JDsearchInput__input_wrapper">
          <input
            ref={(ref) => {
              this.search = ref;
            }}
            className="JDsearchInput__input"
            onChange={this.handleChange}
            placeholder={children}
          />
          <span className="JDsearchInput__icon">
            <Icon icon="magnifier" />
          </span>
        </div>
        {<List {...this.state} />}
      </div>
    );
  }
}

export default SearchInput;
