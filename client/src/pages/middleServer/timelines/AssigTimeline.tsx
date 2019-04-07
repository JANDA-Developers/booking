import React from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/ko';
import DayPicker from '../../../components/dayPicker/DayPicker';
import Timeline from '../../../components/timeline/Timeline';
import ErrProtecter from '../../../utils/ErrProtecter';
import Button from '../../../atoms/button/Buttons';
import POPbookerInfo from '../../../components/bookerInfo/BookerModal';

interface IProps {
  handleCanvasDoubleClick(): void;
  handleItemResize(): void;
  bookerModal: any;
  defaultProps: any;
  items: any;
  handleItemMove(): void;
  handleItemDoubleClick(): void;
  isConfigMode: boolean;
  setConfigMode(): void;
}

const ShowTimeline: React.SFC<IProps> = ({
  handleCanvasDoubleClick,
  bookerModal,
  handleItemResize,
  handleItemMove,
  handleItemDoubleClick,
  isConfigMode,
  setConfigMode,
  defaultProps,
  items,
}) => {
  console.log(defaultProps);
  console.log(defaultProps);
  console.log(defaultProps);
  return (
    <div id="ShowTimeline" className="container container--full">
      <div className="docs-section">
        <div className="flex-grid flex-grid--end">
          <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
            <DayPicker input label="input" isRange={false} />
          </div>
          <Link to="/middleServer/timelineConfig">
            <Button float="right" onClick={setConfigMode} icon="roomChange" label="방구조 변경" />
          </Link>
        </div>
        <Timeline
          {...defaultProps}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={items}
          // 아래 속성은 퍼포먼스에 민감하게 작용합니다.
          verticalLineClassNamesForTime={(timeStart: any, timeEnd: any) => {
            if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
            return ['verticalLine'];
          }}
          horizontalLineClassNamesForGroup={(group: any) => ['group']}
          onItemDoubleClick={handleItemDoubleClick}
          onCanvasDoubleClick={handleCanvasDoubleClick}
        />
        <POPbookerInfo
          bookerInfo={undefined}
          bookerModalIsOpen={bookerModal.isOpen}
          bookerModalClose={bookerModal.closeModal}
        />
      </div>
    </div>
  );
};

ShowTimeline.defaultProps = {
  handleCanvasDoubleClick: () => {},
  handleItemResize: () => {},
  bookerModal: {},
  defaultProps: {},
  items: {},
  handleItemMove: () => {},
  handleItemDoubleClick: () => {},
  isConfigMode: false,
  setConfigMode: () => {},
};

export default ErrProtecter(ShowTimeline);
