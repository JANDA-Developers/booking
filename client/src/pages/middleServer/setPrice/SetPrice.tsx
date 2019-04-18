import React from 'react';
import ErrProtecter from '../../../utils/ErrProtecter';
import './SetPrice.scss';
import SeasonTable from './components/seasonTableWrap';

import { IUseModal } from '../../../actions/hook';

interface IProps {
  loading: boolean;
  seasonData: any;
  seasonModal: IUseModal;
}

const SetPrice: React.SFC<IProps> = ({ loading, seasonData, seasonModal }) => (
  <div id="seasonTable" className="seasonT container">
    <div className="docs-section">
      <h3>가격설정</h3>
      <SeasonTable />
    </div>
  </div>
);

export default ErrProtecter(SetPrice);
