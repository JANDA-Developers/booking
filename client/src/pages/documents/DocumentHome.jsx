/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Icon from '../../atoms/icons/Icons';
import './DocumentHome.scss';
// MD 파일을 적는방법
// 우선은 선행으로 웹팩을 공부한후 fs 를 가져와 reafile 해낸후 markdown을 이용하여 생성하세요
const DocumentHome = () => (
  <div className="container">
    <div className="docs-section showComponent">
      <h1>Hellow This is a Document page</h1>
      <div>
        <h6>
          <a className="JDanchor" href="https://github.com/BaeKY/jd-api-server">
            {'깃허브'}
            <Icon icon="github" />
          </a>
        </h6>
        <h6>
          <a className="JDanchor" href="https://github.com/BaeKY/jd-api-server">
            {'트랠로'}
            <Icon icon="checkList" />
          </a>
        </h6>
        <h6>
          <a className="JDanchor" href="https://github.com/BaeKY/jd-api-server">
            {'슬랙'}
            <Icon icon="slack" />
          </a>
        </h6>
      </div>
    </div>
  </div>
);

export default DocumentHome;
