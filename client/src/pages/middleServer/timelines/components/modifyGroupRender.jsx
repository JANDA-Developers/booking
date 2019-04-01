import React from 'react';

// 그룹 렌더링
const ModifyGroupRendererFn = ({ group }) => (
  <div>
    <div className="modifyGroups custom-group">
      <span className="title">
        {group.title}
        {group.belongsIn}
      </span>
      <p className="tip">{group.tip}</p>
    </div>
  </div>
);

export default ModifyGroupRendererFn;
