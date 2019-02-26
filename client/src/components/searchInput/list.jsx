/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function List({
  userList, refContainer, onListClick, onListKeyPress, currentValue, setIsMatched,
}) {
  return (
    <ul ref={refContainer} className="JDsearchInput__ul">
      {userList.map((user, index) => {
        let classes = 'JDsearchInput__li';
        if (currentValue === user.name) {
          classes = 'JDsearchInput__li JDsearchInput__li--selected';
          setIsMatched(true);
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li
            role="menuitem"
            onKeyPress={onListKeyPress}
            onClick={onListClick}
            className={classes}
            key={`list${user}${index}`}
            value={user.name}
          >
            {user.name}
          </li>
        );
      })}
    </ul>
  );
}

List.propTypes = {
  userList: PropTypes.array,
  refContainer: PropTypes.object,
  onListClick: PropTypes.func,
  onListKeyPress: PropTypes.func,
};

List.defaultProps = {
  userList: [],
  refContainer: {},
  onListClick: PropTypes.func,
  onListKeyPress: PropTypes.func,
};
export default List;
