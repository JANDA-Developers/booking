import React from 'react';
import 'moment/locale/ko';
import DayPicker from '../../../components/dayPicker/DayPicker';
import Timeline from '../../../components/timeline/Timeline';
import ErrProtecter from '../../../utils/ErrProtecter';
import Button from '../../../atoms/button/Buttons';
import './ModifyTimeline.scss';

interface IProps {
  setConfigMode: any;
  defaultProps: any;
  items: any;
  props: any;
  data: any;
  roomTypeModal: any;
}

const ModifyTimeline: React.SFC<IProps> = ({
  roomTypeModal, data, setConfigMode, defaultProps, items, ...props
}) => (
  <div id="ModifyTimeline" className="container container--full">
    <div className="docs-section">
      <div className="flex-grid flex-grid--end">
        <div className="flex-grid__col col--full-4 col--lg-4 col--md-6">
          <h3>방생성 및 수정</h3>
        </div>
        <Button float="right" onClick={setConfigMode} icon="persons" label="배정화면으로" />
      </div>
      <Timeline
        {...defaultProps}
        {...props}
        items={items}
        // 아래 속성은 퍼포먼스에 민감하게 작용합니다.
        verticalLineClassNamesForTime={(timeStart: any, timeEnd: any) => {
          if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
          return ['verticalLine'];
        }}
        horizontalLineClassNamesForGroup={(group: any) => ['group']}
      />
      <div className="ModifyTimeline__bottom">
        <Button onClick={roomTypeModal.openModal} label="추가" />
      </div>
    </div>
  </div>
);

export default ErrProtecter(ModifyTimeline);
