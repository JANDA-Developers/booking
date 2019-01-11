import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="flex-grid">
      <NavLink exact className="flex-grid__col header__link" to="/" activeClassName="active">
        {'Home'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/test/KMJ" activeClassName="active">
        {'TEST'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/post" activeClassName="active">
        {'POST'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/Mypage" activeClassName="active">
        {'MyPage'}
      </NavLink>
      <NavLink className="flex-grid__col header__link" to="/Login" activeClassName="active">
        {'Login'}
      </NavLink>
    </div>
  </div>
);

export default Header;
