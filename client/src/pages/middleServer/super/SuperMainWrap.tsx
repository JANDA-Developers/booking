import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { getHousesForSU, getHousesForSUVariables } from '../../../types/api';
import SuperMain from './SuperMain';
import { GEA_All_HOUSE_SUPER_USER } from '../../../queries';
import QueryError from '../../../utils/QueryError';
import { isEmpty } from '../../../utils/utils';
import { useModal2 } from '../../../actions/hook';
import Modal from '../../../atoms/modal/Modal';
import QueryDataFormater, { pageNationFormater } from '../../../utils/QueryDataFormat';

class GetAllHouse extends Query<getHousesForSU, getHousesForSUVariables> {}

interface Iprops {}

const SuperMainWrap: React.SFC<Iprops> = () => {
  const userModal = useModal2(false);
  return (
    <GetAllHouse
      query={GEA_All_HOUSE_SUPER_USER}
      variables={{
        first: 20,
      }}
    >
      {({ data: housePages, loading, error }) => {
        QueryError(error);
        const housePageData = pageNationFormater<false>(housePages, 'GetHousesForSU', false, true);

        console.log(housePageData);
        console.log(housePageData);
        console.log(housePageData);

        return (
          <Fragment>
            <SuperMain
              userModal={userModal}
              pageData={housePageData ? housePageData.pageInfo : {}}
              houseData={housePageData ? housePageData.origin : []}
              loading={loading}
            />
            {/* <MyPageModal {...userModal} userId={userModal.info.userId} /> */}
          </Fragment>
        );
      }}
    </GetAllHouse>
  );
};

export default SuperMainWrap;
