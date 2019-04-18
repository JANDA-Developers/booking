import React, { Fragment } from 'react';
import { getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse as allHouse } from '../../../types/api';
import { IUseModal } from '../../../actions/hook';
import Preloader from '../../../atoms/preloader/Preloader';
import './SuperMain.scss';
import JDPagination from '../../../components/pagination/Pagination';
import HouseCard from './components/houseCard';

interface Iprops {
  houseData: allHouse[];
  loading: boolean;
  userModal: IUseModal;
}

const SuperMain: React.SFC<Iprops> = ({ userModal, houseData, loading }) => (
  <div id="superMain" className="container container--sm">
    <div className="docs-section">
      <Fragment>
        {loading && <Preloader />}
        <div className="docs-section__box">
          {houseData.map((house: allHouse) => (
            <HouseCard houseData={house} userModal={userModal} />
          ))}
        </div>
        <JDPagination pageCount={4} pageRangeDisplayed={5} marginPagesDisplayed={4} />
      </Fragment>
    </div>
  </div>
);

export default SuperMain;
