/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useBookPOP, useToggle } from '../../../../actions/hook';
import ModifyShowTimeline from './ShowTimeline';
import { defaultProps, initGroups, initItems } from './timelineConfig';

const ModifyTimelineWrap = () => {
  const [items, setItems] = useState(initItems);
  const [_, setConfigMode] = useToggle(false);
  console.log(_);
  const bookerModal = useBookPOP(false);

  return (
    <ModifyShowTimeline
      bookerModal={bookerModal}
      setConfigMode={setConfigMode}
      defaultProps={defaultProps}
      items={items}
    />
  );
};

export default ModifyTimelineWrap;
