/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { useBookPOP, useToggle } from '../../../../actions/hook';
import ModifyShowTimeline from './ShowTimeline';
import { ModifydefaultProps, initItems } from './timelineConfig';

const ModifyTimelineWrap = () => {
  const [_, setConfigMode] = useToggle(false);
  console.log(_);
  const bookerModal = useBookPOP(false);

  return (
    <ModifyShowTimeline
      bookerModal={bookerModal}
      setConfigMode={setConfigMode}
      defaultProps={ModifydefaultProps}
      items={initItems}
    />
  );
  // return (
  //   <Query fetchPolicy="no-cahce" query={XXXX} skip={!houseModalId} variables={{ houseId: houseModalId }}>
  //     {roomsInfo => (
  //       <Mutation mutation={XXXXX}>
  //         {createHouseMutation => (
  //           <ModifyShowTimeline
  //             bookerModal={bookerModal}
  //             setConfigMode={setConfigMode}
  //             defaultProps={ModifydefaultProps}
  //             items={initItems}
  //           />
  //         )}
  //       </Mutation>
  //     )}
  //   </Query>
  // );
};

export default ModifyTimelineWrap;
