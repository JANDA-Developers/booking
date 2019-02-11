import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    const self = this;
    return (
      <ul className="JDsearchInput__ul">
        {self.props.userList.map((user, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="JDsearchInput__li" key={index}>
            {user.name}
          </div>
        ))}
      </ul>
    );
  }
}

export default List;
