import React from 'react';

// 그룹 렌더링
const groupRendererFn = ({ group }) => (
  <div>
    <div className="custom-group">
      <span className="title">
        {group.title}
        {group.belongsIn}
      </span>
      <p className="tip">{group.tip}</p>
    </div>
  </div>
);

export default groupRendererFn;
