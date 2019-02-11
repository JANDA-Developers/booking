import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNav.scss';
import ErrProtecter from '../../utils/ErrProtecter';

const SideNav = () => (
  <div className="sideNav">
    <NavLink />
    <NavLink />
    <NavLink />
    <NavLink />
    <NavLink />
  </div>
);

export default ErrProtecter(SideNav);
