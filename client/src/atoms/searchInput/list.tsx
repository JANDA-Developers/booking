/* eslint-disable react/no-array-index-key */
import React, {Fragment} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {isEmpty} from "../../utils/utils";

interface IProps {
  dataList: Array<any>;
  refContainer: React.MutableRefObject<null>;
  onListKeyPress: any;
  onListClick(e: React.MouseEvent<HTMLElement>): any;
  setIsMatched?(foo?: boolean): any;
  currentValue?: string;
}

const List: React.FC<IProps> = ({
  dataList,
  refContainer,
  onListClick,
  onListKeyPress,
  currentValue,
  setIsMatched
}) =>
  !isEmpty(dataList) ? (
    <ul ref={refContainer} className="JDsearchInput__ul">
      {setIsMatched && setIsMatched(false)}
      {dataList.map((data, index) => {
        // 현재값이 데이터 와 일치되는것이 있다면
        if (currentValue === data.name) {
          setIsMatched && setIsMatched(true);
        }
        const classes = classNames({
          JDsearchInput__li: true,
          "JDsearchInput__li--selected": currentValue === data.name,
          "JDsearchInput__li--unDetail": !data.detail
        });

        return (
          // eslint-disable-next-line react/no-array-index-key
          <li
            role="menuitem"
            onKeyPress={onListKeyPress}
            onClick={onListClick}
            className={classes}
            key={`list${data}${index}`}
            value={data.name}
            id={data.id}
          >
            <span>
              {data.name}
              {data.detail && (
                <Fragment>
                  <br />
                  <span className="JDsearchInput__detail">{data.detail}</span>
                </Fragment>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  ) : (
    <div />
  );

export default List;
