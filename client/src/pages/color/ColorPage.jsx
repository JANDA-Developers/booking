import React from 'react';

import ColorBox from './components/ColorBox';
import './ColorPage.scss';

const ColorPage = () => (
  <div className="colorPage">
    <div className="container ">
      <div className="docs_section">
        <div className="flex-grid flex-grid--md ">
          <div className="flex-grid__col">
            <ColorBox color="primary" summary="" txt="primary" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="primary-light" summary="" txt="primary-light" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="primary-dark" summary="" txt="primary-dark" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="" summary="" txt="" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="" summary="" txt="" />
          </div>
        </div>
        <div className="flex-grid flex-grid--md">
          <div className="flex-grid__col">
            <ColorBox color="secondary" summary="" txt="secondary" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="secondary-light" summary="" txt="secondary-light" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="secondary-dark" summary="" txt="secondary-dark" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="" summary="" txt="" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="" summary="" txt="" />
          </div>
        </div>
        <div className="flex-grid flex-grid--md">
          <div className="flex-grid__col">
            <ColorBox color="button-disabled" summary="" txt="button-disabled" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="html-color" summary="" txt="html-color" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="success" summary="" txt="success-color" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="error" summary="" txt="error-color" />
          </div>
          <div className="flex-grid__col">
            <ColorBox color="link" summary="" txt="link-color" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ColorPage;
