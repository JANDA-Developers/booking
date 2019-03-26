/* eslint-disable react/forbid-prop-types */
import React from 'react';
import logo from '../../img/logo/JD_logo_example.jpg';
import logoBlack from '../../img/logo/JD_logo_example--black.jpg';
import logoComplex from '../../img/logo/JD_logo_example--complex.jpg';
import JDLabel from '../../atoms/label/JDLabel';
import './Brand.scss';

const Brand = () => (
  <div id="brand" className="container">
    <div className="docs-section">
      <div className="docs-section__box">
        <h6>logo</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4  col--md-12">
            <JDLabel txt="일반 로고" />
            <img className="brand__logo" src={logo} alt="" />
          </div>
          <div className="flex-grid__col col--full-4  col--md-12">
            <JDLabel txt="검은 배경 위 사용예시" />
            <img className="brand__logo" src={logoBlack} alt="" />
          </div>
          <div className="flex-grid__col col--full-4  col--md-12">
            <JDLabel txt="복잡한 배경 위 사용예시" />
            <img className="brand__logo" src={logoComplex} alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Brand;
