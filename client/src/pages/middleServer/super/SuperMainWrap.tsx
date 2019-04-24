import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { getHousesForSU, getHousesForSUVariables } from '../../../types/api';
import SuperMain from './SuperMain';
import { GET_HOUSES_FOR_SU } from '../../../queries';
import QueryError from '../../../utils/QueryError';
import { isEmpty, QueryDataFormater, pageNationFormater } from '../../../utils/utils';
import { useModal2 } from '../../../actions/hook';
import Modal from '../../../atoms/modal/Modal';

class GetAllHouse extends Query<getHousesForSU, getHousesForSUVariables> {}

interface Iprops {}

const SuperMainWrap: React.SFC<Iprops> = () => {
  const userModal = useModal2(false);

  return (
    <GetAllHouse
      query={GET_HOUSES_FOR_SU}
      variables={{
        page: 1,
        count: 9999,
      }}
    >
      {({ data: housePages, loading, error }) => {
        QueryError(error);
        const housePageData = pageNationFormater<false>(housePages, 'GetHousesForSU', false, true);

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
