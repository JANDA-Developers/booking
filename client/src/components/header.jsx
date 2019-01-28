import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import ErrProtecter from '../utils/ErrProtecter';

const Header = () => (
  <div className="header">
    <div className="flex-grid">
      <NavLink exact className="flex-grid__col header__link" to="/" activeClassName="active">
        {'Home'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/margin" activeClassName="active">
        {'Margin'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/post" activeClassName="active">
        {'POST'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/mypage" activeClassName="active">
        {'MyPage'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/login" activeClassName="active">
        {'Login'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/search" activeClassName="active">
        {'검색'}
      </NavLink>
      <NavLink
        className="flex-grid__col header__link"
        to="/showComponents"
        activeClassName="active"
      >
        {'컴포넌트들'}
      </NavLink>
    </div>
  </div>
);

export default ErrProtecter(Header);
