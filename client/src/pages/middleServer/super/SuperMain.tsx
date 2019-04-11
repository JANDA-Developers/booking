import React, { Fragment } from 'react';
import { getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse as allHouse } from '../../../types/api';
import Card from '../../../atoms/cards/Card';
import { IUseModal } from '../../../actions/hook';
import Button from '../../../atoms/button/Button';
import Badge, { BADGE_THEMA } from '../../../atoms/badge/Badge';
import ProfileCircle from '../../../atoms/profileCircle/ProfileCircle';
import Preloader from '../../../atoms/preloader/Preloader';
import './SuperMain.scss';
import JDPagination from '../../../components/pagination/Pagination';

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
            <Card className="houseCard">
              <ProfileCircle onClick={userModal.openModal} small className="houseCard__profile" />
              <div className="houseCard__gird flex-grid">
                <div className="flex-grid__col col--full-9">
                  <span className="JDlarge-text">{house.name}</span>
                  <Badge thema={BADGE_THEMA.NEW}>new</Badge>
                  <div className="houseCard__phoneNumber">{house.user.phoneNumber}</div>
                </div>
                <div className="flex-grid__col col--full-3">
                  <div className="houseCard__product">
                    {house.product ? (
                      <Button mode="flat" thema="grey" label={house.product.name} />
                    ) : (
                      <Button mode="flat" thema="grey" label="상품없음" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <JDPagination pageCount={4} pageRangeDisplayed={5} marginPagesDisplayed={4} />
      </Fragment>
    </div>
  </div>
);

export default SuperMain;
