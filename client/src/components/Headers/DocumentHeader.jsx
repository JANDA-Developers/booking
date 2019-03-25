import React from 'react';
import './DocumentHeader.scss';
import { NavLink } from 'react-router-dom';
import ErrProtecter from '../../utils/ErrProtecter';

const Header = () => (
  <div className="doc-header">
    <div className="flex-grid">
      <NavLink exact className="flex-grid__col doc-header__link" to="/documents" activeClassName="active">
        {'Home'}
      </NavLink>

      <NavLink className="flex-grid__col doc-header__link" to="/documents/margin" activeClassName="active">
        {'Margin'}
      </NavLink>

      <NavLink className="flex-grid__col doc-header__link" to="/documents/brand" activeClassName="active">
        {'Brand'}
      </NavLink>

      <NavLink className="flex-grid__col doc-header__link" to="/documents/color" activeClassName="active">
        {'Color'}
      </NavLink>

      <NavLink className="flex-grid__col doc-header__link" to="/documents/grid" activeClassName="active">
        {'Grid'}
      </NavLink>

      <NavLink className="flex-grid__col doc-header__link" to="/documents/showComponents" activeClassName="active">
        {'컴포넌트'}
      </NavLink>
    </div>
  </div>
);

export default ErrProtecter(Header);
