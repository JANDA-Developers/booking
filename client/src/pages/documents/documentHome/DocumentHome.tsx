/* eslint-disable global-require */
/* eslint-disable react/forbid-prop-types */
import Markdown from "markdown-to-jsx";
import React from "react";
import Icon from "../../../atoms/icons/Icons";
import $ from "jquery";
import "./DocumentHome.scss";
import {JDtabs, Tab, TabList, TabPanel} from "../../../atoms/tabs/tabs";

interface IProps {
  loading: boolean;
  allReadMe: string[];
  markDownTxt: string;
  setReadMePath: React.Dispatch<React.SetStateAction<string>>;
}

const DocumentHome: React.FC<IProps> = ({
  loading,
  allReadMe,
  markDownTxt,
  setReadMePath
}) => {
  const atomReadMe = allReadMe.filter(path => path.includes("atom"));
  const componentReadMe = allReadMe.filter(path => path.includes("components"));
  const pageReadMe = allReadMe.filter(path => path.includes("page"));
  const elseReadMe = allReadMe.filter(
    path =>
      $.inArray(path, atomReadMe.concat(componentReadMe).concat(pageReadMe)) ===
      -1
  );

  const onSelectTap = (path: string) => {
    setReadMePath(path);
  };

  const getFileName = (path: string): string => {
    const sliptedPath = path.split("\\");
    return sliptedPath[sliptedPath.length - 2];
  };

  return (
    <div id="DocumentHome" className="container">
      <div className="docs-section">
        <h1>Document Page</h1>
        <div>
          <span className="documentHome__anchorContainer">
            <a
              className="JDanchor"
              href="https://github.com/BaeKY/jd-api-server"
            >
              {"GitHub"}
              <Icon icon="github" />
            </a>
          </span>
          <span className="documentHome__anchorContainer">
            <a
              className="JDanchor"
              href="https://github.com/BaeKY/jd-api-server"
            >
              {"Trello"}
              <Icon icon="checkList" />
            </a>
          </span>
          <span className="documentHome__anchorContainer">
            <a
              className="JDanchor"
              href="https://github.com/BaeKY/jd-api-server"
            >
              {"Slack"}
              <Icon icon="slack" />
            </a>
          </span>
        </div>
        <JDtabs>
          {/* 상위탭 */}
          <div className="documentHome__tabs-higher">
            <TabList>
              <Tab> Atoms</Tab>
              <Tab> Components</Tab>
              <Tab> Pages</Tab>
              <Tab> Eelse</Tab>
            </TabList>
          </div>

          {/* 아톰 ATOM */}
          <TabPanel>
            <JDtabs
              styleMode="button"
              onSelect={index => onSelectTap(atomReadMe[index])}
            >
              <TabList>
                {atomReadMe.map(path => (
                  <Tab>{getFileName(path)}</Tab>
                ))}
              </TabList>
            </JDtabs>
          </TabPanel>
          {/* 컴포넌트 Component */}
          <TabPanel>
            <JDtabs onSelect={index => onSelectTap(componentReadMe[index])}>
              <TabList>
                {componentReadMe.map(path => (
                  <Tab>{getFileName(path)}</Tab>
                ))}
              </TabList>
            </JDtabs>
          </TabPanel>
          {/* 페이지 PAGE */}
          <TabPanel>
            <JDtabs onSelect={index => onSelectTap(pageReadMe[index])}>
              <TabList>
                {pageReadMe.map(path => (
                  <Tab>{getFileName(path)}</Tab>
                ))}
              </TabList>
            </JDtabs>
          </TabPanel>
          {/* 페이지 PAGE */}
          <TabPanel>
            <JDtabs onSelect={index => onSelectTap(pageReadMe[index])}>
              <TabList>
                {elseReadMe.map(path => (
                  <Tab>{getFileName(path)}</Tab>
                ))}
              </TabList>
            </JDtabs>
          </TabPanel>
        </JDtabs>
        {typeof markDownTxt === "string" ? (
          <article className="markdown-body">
            <Markdown>{markDownTxt}</Markdown>
          </article>
        ) : (
          <h1>Error</h1>
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
