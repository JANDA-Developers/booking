import React from 'react';
import InputText from '../../../../atoms/forms/InputText';
import { useInput } from '../../../../actions/hook';

interface IProps {
  group: any;
}

const LAST_GROUP = 'unRendered';

// 그룹 렌더링
const ModifyGroupRendererFn: React.SFC<IProps> = ({ group }) => {
  const roomGroupStyle = {
    height: 36, // 여기다가 * group.roomType.roomCount 곱함
  };

  const groupNameHook = useInput(group.title);
  return (
    <div>
      <div className="modifyGroups custom-group">
        {/* {LAST_GROUP ==='group.roomType.name' && <div>   } */}
        <div className="modifyGroups__roomGroup" style={roomGroupStyle}>
          {'룸그룹'}
        </div>
        <span className="title">
          <InputText {...groupNameHook} className="modifyGroups__input" />
          {group.belongsIn}
        </span>
        <p className="tip">{group.tip}</p>
      </div>
    </div>
  );
};

export default ModifyGroupRendererFn;
