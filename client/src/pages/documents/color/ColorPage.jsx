import React from 'react';

import ColorBox from './components/ColorBox';
import './ColorPage.scss';

const ColorPage = () => (
  <div className="colorPage">
    <div className="container ">
      <div className="docs-section">
        <div className="flex-grid flex-grid--around">
          <div className="flex-grid__col col--full-6 col--wmd-6">
            <ColorBox color="primary" summary="" txt="primary" />
          </div>
          <div className="flex-grid__col col--full-3 col--wmd-6">
            <ColorBox color="primary-light" summary="" txt="primary-light" />
          </div>
          <div className="flex-grid__col col--full-3 col--wmd-6">
            <ColorBox color="primary-dark" summary="" txt="primary-dark" />
          </div>
        </div>
        <div className="flex-grid flex-grid--around">
          <div className="flex-grid__col col--full-6 col--wmd-6">
            <ColorBox color="secondary" summary="" txt="secondary" />
          </div>
          <div className="flex-grid__col col--full-3 col--wmd-6">
            <ColorBox color="secondary-light" summary="" txt="secondary-light" />
          </div>
          <div className="flex-grid__col col--full-3 col--wmd-6">
            <ColorBox color="secondary-dark" summary="" txt="secondary-dark" />
          </div>
        </div>
        <div className="flex-grid flex-grid--around">
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="link" summary="" txt="link-color" />
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="success" summary="" txt="success-color" />
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="error" summary="" txt="error-color" />
          </div>
        </div>
        <div className="flex-grid flex-grid--around">
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="html-color" summary="" txt="html-color" />
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="background-color" summary="" txt="background-color" />
          </div>
        </div>
        <div className="flex-grid flex-grid--around">
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="grey-level1" summary="" txt="grey-level1" />
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="grey-level2" summary="" txt="grey-level2" />
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-6">
            <ColorBox color="grey-level3" summary="" txt="grey-level3" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ColorPage;
