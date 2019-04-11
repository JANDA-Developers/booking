import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import {
  getAllHouseForSuperUser,
  getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse as allHouse,
} from '../../../types/api';
import SuperMain from './SuperMain';
import { GEA_All_HOUSE_SUPER_USER } from '../../../queries';
import QueryError from '../../../utils/QueryError';
import { isEmpty } from '../../../utils/utils';
import { useModal2 } from '../../../actions/hook';
import Modal from '../../../atoms/modal/Modal';
import { MyPage } from '../../pages';
import QueryDataFormater from '../../../utils/QueryDataFormat';

class GetAllHouse extends Query<getAllHouseForSuperUser> {}

interface Iprops {}

const SuperMainWrap: React.SFC<Iprops> = () => {
  const userModal = useModal2(false);
  return (
    <GetAllHouse query={GEA_All_HOUSE_SUPER_USER}>
      {({ data: houseData, loading, error }) => {
        QueryError(error);

        const formatedHouseData: allHouse[] = QueryDataFormater(
          houseData,
          'GetAllHouseForSuperUser',
          'allHouse',
          []
        );

        return (
          <Fragment>
            <SuperMain userModal={userModal} houseData={formatedHouseData || []} loading={loading} />
            {/* <MyPageModal {...userModal} userId={userModal.info.userId} /> */}
          </Fragment>
        );
      }}
    </GetAllHouse>
  );
};

export default SuperMainWrap;
