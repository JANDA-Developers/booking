/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useBookPOP, useToggle } from '../../../../actions/hook';
import ModifyShowTimeline from './ShowTimeline';
import { defaultProps, initItems } from './timelineConfig';

const ModifyTimelineWrap = () => {
  const [_, setConfigMode] = useToggle(false);
  console.log(_);
  const bookerModal = useBookPOP(false);

  return (
    <ModifyShowTimeline
      bookerModal={bookerModal}
      setConfigMode={setConfigMode}
      defaultProps={defaultProps}
      items={initItems}
    />
  );
};

export default ModifyTimelineWrap;
