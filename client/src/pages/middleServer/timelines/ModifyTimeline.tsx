import React from 'react';
import 'moment/locale/ko';
import DayPicker from '../../../components/dayPicker/DayPicker';
import Timeline from '../../../components/timeline/Timeline';
import ErrProtecter from '../../../utils/ErrProtecter';
import Button from '../../../atoms/button/Buttons';

interface IProps {
  setConfigMode: any;
  defaultProps: any;
  items: any;
}

const ModifyTimeline: React.SFC<IProps> = ({ setConfigMode, defaultProps, items }) => (
  <div id="ShowTimeline" className="container container--full">
    <div className="docs-section">
      <div className="flex-grid flex-grid--end">
        <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
          <DayPicker input label="input" isRange={false} />
        </div>
        <Button float="right" onClick={setConfigMode} icon="persons" label="배정화면으로" />
      </div>
      <Timeline
        {...defaultProps}
        items={items}
        // 아래 속성은 퍼포먼스에 민감하게 작용합니다.
        verticalLineClassNamesForTime={(timeStart: any, timeEnd: any) => {
          if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
          return ['verticalLine'];
        }}
        horizontalLineClassNamesForGroup={(group: any) => ['group']}
      />
    </div>
  </div>
);

export default ErrProtecter(ModifyTimeline);
