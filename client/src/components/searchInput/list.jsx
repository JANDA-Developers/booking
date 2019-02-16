import React from 'react';

function List({ userList }) {
  return (
    <ul className="JDsearchInput__ul">
      {userList.map((user, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="JDsearchInput__li" key={`list${index}`}>
          {user.name}
        </div>
      ))}
    </ul>
  );
}

export default List;
