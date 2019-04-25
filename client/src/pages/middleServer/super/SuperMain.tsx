import React, { Fragment } from 'react';
import { getHousesForSU_GetHousesForSU_houses as Ihouse } from '../../../types/api';
import { IUseModal } from '../../../actions/hook';
import Preloader from '../../../atoms/preloader/Preloader';
import './SuperMain.scss';
import JDPagination from '../../../components/pagination/Pagination';
import HouseCard from './components/houseCard';
import { IPageInfo } from '../../../types/interface';
import UserModal from './components/userModalWrap';

interface Iprops {
  page: number;
  setPage: any;
  houseData: any;
  loading: boolean;
  userModal: IUseModal;
  pageData: IPageInfo | undefined | null;
}

const SuperMain: React.SFC<Iprops> = ({
  userModal, houseData, loading, pageData, page, setPage,
}) => (
  <div id="superMain" className="container container--sm">
    <div className="docs-section">
      <Fragment>
        {loading && <Preloader />}
        <div className="docs-section__box">
          {houseData.reverse().map((house: Ihouse) => (
            <HouseCard houseData={house} userModal={userModal} />
          ))}
        </div>

        <JDPagination
          onPageChange={(selectedItem) => {
            setPage(selectedItem.selected + 1);
          }}
          pageCount={pageData ? pageData.totalPage : 1}
          pageRangeDisplayed={1}
          marginPagesDisplayed={4}
        />
        {userModal.isOpen && <UserModal modalHook={userModal} />}
      </Fragment>
    </div>
  </div>
);

export default SuperMain;
