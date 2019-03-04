/* eslint-disable global-require */
/* eslint-disable react/forbid-prop-types */
import Markdown from 'markdown-to-jsx';
import React, { useState, useEffect } from 'react';
import Icon from '../../atoms/icons/Icons';
import Preloader from '../../atoms/preloader/Preloader';
import './DocumentHome.scss';
import {
  Tab, Tabs, TabList, TabPanel,
} from '../../atoms/tabs/tabs';
import { useFetch } from '../../actions/hook';
import test from './ReadMe.md';

const DocumentHome = () => {
  const [markDownTxt, setMarkDownTxt] = useState('');
  const [mdSource, mdIsLoading, mdError, getMD] = useFetch(test);
  // const readMe = require(readMePath);

  const atomOnSelectTab = (value) => {
    let path = '';
    //  forms
    if (value === 0) path = require('../../atoms/forms/ReadMe.md');
    //  buttons
    if (value === 1) path = require('../../atoms/button/ReadMe.md');
    //  preloader
    if (value === 2) path = require('../../atoms/preloader/ReadMe.md');
    //  icons
    if (value === 3) path = require('../../atoms/icons/ReadMe.md');
    //  label
    if (value === 4) path = require('../../atoms/label/ReadMe.md');
    //  preloader
    if (value === 5) path = require('../../atoms/preloader/ReadMe.md');
    //  tabs
    if (value === 6) path = require('../../atoms/tabs/ReadMe.md');
    //  tooltip
    if (value === 7) path = require('../../atoms/tooltip/ReadMe.md');
    //  modal
    if (value === 7) path = require('../../atoms/modal/ReadMe.md');

    getMD(path);
  };

  /*  ------------------------------- components ------------------------------- */
  const componentsOnSelectTab = (value) => {
    let path = '';

    //  dayPicker
    if (value === 0) path = require('../../components/dayPicker/ReadMe.md');
    //  headers
    if (value === 1) path = require('../../components/headers/ReadMe.md');
    //  pagination
    if (value === 2) path = require('../../components/pagination/ReadMe.md');
    //  searchInput
    if (value === 3) path = require('../../components/searchInput/ReadMe.md');
    //  sidNav
    if (value === 4) path = require('../../components/sideNav/ReadMe.md');
    //  timeline
    if (value === 5) path = require('../../components/timeline/ReadMe.md');

    getMD(path);
  };

  useEffect(() => {
    if (typeof mdSource === 'string') setMarkDownTxt(mdSource);
    console.log(mdSource);
  }, [mdSource]);
  return (
    <div id="DocumentHome" className="container">
      <div className="docs-section">
        <h1>Document Page</h1>
        <div>
          <span className="documentHome__anchorContainer">
            <a className="JDanchor" href="https://github.com/BaeKY/jd-api-server">
              {'GitHub'}
              <Icon icon="github" />
            </a>
          </span>
          <span className="documentHome__anchorContainer">
            <a className="JDanchor" href="https://github.com/BaeKY/jd-api-server">
              {'Trello'}
              <Icon icon="checkList" />
            </a>
          </span>
          <span className="documentHome__anchorContainer">
            <a className="JDanchor" href="https://github.com/BaeKY/jd-api-server">
              {'Slack'}
              <Icon icon="slack" />
            </a>
          </span>
        </div>
        <Tabs>
          <div className="documentHome__tabs-higher">
            <TabList>
              <Tab> Atoms</Tab>
              <Tab> Components</Tab>
            </TabList>
          </div>
          <TabPanel>
            <Tabs onSelect={atomOnSelectTab}>
              <TabList>
                <Tab>forms</Tab>
                <Tab>buttons</Tab>
                <Tab>preloader</Tab>
                <Tab>icons</Tab>
                <Tab>label</Tab>
                <Tab>preloader</Tab>
                <Tab>tabs</Tab>
                <Tab>tooltip</Tab>
              </TabList>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs onSelect={componentsOnSelectTab}>
              <TabList>
                <Tab>dayPicker</Tab>
                <Tab>headers</Tab>
                <Tab>pagination</Tab>
                <Tab>searchInput</Tab>
                <Tab>sidNav</Tab>
                <Tab>timeline</Tab>
              </TabList>
            </Tabs>
          </TabPanel>
        </Tabs>
        {mdError ? (
          'sorrySomethingWrong'
        ) : (
          <article className="markdown-body">
            {mdIsLoading ? <Preloader /> : <Markdown>{markDownTxt}</Markdown>}
          </article>
        )}
      </div>
    </div>
  );
};

export default DocumentHome;

// MD 파일을 적는방법
// https://stackoverflow.com/questions/42928530/how-do-i-load-a-markdown-file-into-a-react-component
// todo:  more up grade
// eslint-disable-next-line max-len
// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
