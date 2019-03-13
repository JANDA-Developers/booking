/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

function List({
  dataList, refContainer, onListClick, onListKeyPress, currentValue, setIsMatched,
}) {
  return (
    <ul ref={refContainer} className="JDsearchInput__ul">
      {dataList.map((data, index) => {
        if (currentValue === data.name) {
          setIsMatched(true);
        }
        const classes = classNames({
          JDsearchInput__li: true,
          'JDsearchInput__li--selected': currentValue === data.name,
          'JDsearchInput__li--unDetail': !data.detail,
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
  );
}

List.propTypes = {
  dataList: PropTypes.array,
  refContainer: PropTypes.object,
  onListClick: PropTypes.func,
  onListKeyPress: PropTypes.func,
  setIsMatched: PropTypes.func,
  currentValue: PropTypes.string.isRequired,
};

List.defaultProps = {
  dataList: [],
  refContainer: {},
  onListClick: PropTypes.func,
  onListKeyPress: PropTypes.func,
  setIsMatched: () => {},
};
export default List;
