import ReactModal from 'react-modal';
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import CheckBox from '../../atoms/forms/CheckBox';
import Switch from '../../atoms/forms/Switch';
import InputText from '../../atoms/forms/InputText';
import Textarea from '../../atoms/forms/Textarea';
import Radio from '../../atoms/forms/Radio';
import SearchInput from '../../components/searchInput/SearchInput';
import SelectBox from '../../atoms/forms/SelectBox';
import DayPicker from '../../components/dayPicker/DayPicker';
import CicleIcon from '../../atoms/CircleIcon';
import Button from '../../atoms/Buttons';
import JDLabel from '../../atoms/JDLabel';
import utils from '../../utils/utils';
import Icon from '../../atoms/icons/Icons';
import './showComponent.scss';
import '../../atoms/Modal.scss';
import '../../atoms/tooltip.scss';

class ShowComponents extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const dummyData = [
      { name: 'Manpreet Singh', pic: '' },
      { name: 'Abhimanyu Kapoor', pic: '' },
      { name: 'Richard B. Gomes', pic: '' },
      { name: 'Utkarsh Jain', pic: '' },
    ];

    const { showModal } = this.state;
    return (
      <div className="container">
        <div className="docs-section showCompoent">
          {/* 체크박스 */}
          <div className="docs-section__box">
            <h6>Check Box</h6>

            <CheckBox check label="normal" />

            <CheckBox label="disabled" disabled />
          </div>

          {/* 스위치 */}
          <div className="docs-section__box">
            <h6>Switch</h6>

            <Switch checked ltxt="normal" />

            <Switch ltxt="disabled" disabled />
          </div>

          {/* 라디오 */}
          <div className="docs-section__box">
            <h6>Radio</h6>
            <Radio checked id="RD1--1" groupName="RD1" />
            <Radio id="RD1--2" groupName="RD1" />
            <Radio id="RD1--3" groupName="RD1" />
            <Radio id="RD1--4" groupName="RD1" />
            <Radio id="RD2--1" label="라벨" groupName="RD2" />
            <Radio id="RD2--2" label="라벨2" groupName="RD2" />
          </div>

          {/* 인풋 텍스트 */}
          <div className="docs-section__box">
            <h6>InputText</h6>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
                <InputText label="noraml" />
              </div>
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
                <InputText label="validation MaxOver 10 ?" validation={utils.isMaxOver} max={10} />
              </div>
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
                <InputText label="validation isName ?" validation={utils.isName} />
              </div>
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
                <InputText label="disabled" disabled />
              </div>
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
                <InputText label="disabled" disabled />
              </div>
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
                <InputText value="you can't fix this" readOnly label="readOnly" />
              </div>
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
                <InputText
                  label="Vaild Message PH"
                  validation={utils.isPhone}
                  data-error="Wrong"
                  data-success="Checked"
                />
              </div>
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6" />
              <div className="flex-grid__col col--full-3 col--lg-4 col--md-6" />
            </div>
          </div>

          {/* 텍스트어리어 */}
          <h6>Textarea</h6>
          <div className="flex-grid-grow flex-grid--md docs-Section__box">
            <div className="flex-grid__col">
              <Textarea label="normal" />
            </div>
            <div className="flex-grid__col">
              <Textarea label="disabled" disabled />
            </div>
            <div className="flex-grid__col">
              <Textarea label="scrollbar" scroll />
            </div>
          </div>

          {/* 서치바 */}
          <h6>SearchInput</h6>
          <div className="flex-grid-grow flex-grid--md docs-section__box">
            <div className="flex-grid__col">
              <SearchInput show userList={dummyData} label="normal" />
            </div>
          </div>

          {/* 셀렉트박스 */}
          <h6>SelectBox</h6>
          <div className="flex-grid-grow docs-section__box">
            <div className="flex-grid__col">
              <SelectBox isOpen label="normal" />
            </div>
            <div className="flex-grid__col">
              <SelectBox disabled label="disalbed" />
            </div>
            <div className="flex-grid__col">
              <SelectBox isMulti label="multi" />
            </div>
          </div>

          {/* 달력 */}
          <h6>datePicker</h6>
          <div className="flex-grid-grow flex-grid--wmd docs-section__box">
            <div className="flex-grid__col">
              <div className="showComponent__container">
                <JDLabel txt="horizen" />
                <DayPicker horizen />
              </div>
            </div>
            <div className="flex-grid__col">
              <JDLabel txt="normal" />
              <DayPicker />
            </div>
          </div>

          {/* 버튼 */}
          <h6>buttons</h6>
          <div className="docs-section__box">
            <div className="flex-grid__col">
              {/* todo: 버튼 노멀 없애기 */}
              <Button label="noraml" icon="arrow_right" />
              <Button label="disabled" disabled />
              <Button label="large" mode="large" />
              <Button label="small" mode="small" />
              {/* 플랫은 화이트 배경뿐입니다.--지금은  */}
              <Button label="flat" mode="flat" />
              <CicleIcon label="flat" mode="flat">
                <Icon label="arrow_left" icon="arrow_left" />
              </CicleIcon>
              {/* 아래내용은 서클형태의 버튼으로 아직까지 활용가치가 없습니다. */}
              {/* <Button label="floating" classes={['JDbtn--floating']} /> */}
              {/* <Button label="floating-large"
          classes={['JDbtn--floating', 'JDbtn--floating-large']} /> */}
            </div>
          </div>

          {/* 모달 */}
          <div className="docs-section__box">
            <h6>Modal</h6>
            <Button label="Open Modal" onClick={this.handleOpenModal} />
            <ReactModal
              isOpen={showModal}
              onRequestClose={this.handleCloseModal}
              className="Modal"
              overlayClassName="Overlay"
            >
              <p>Modal text!</p>
              <div className="ReactModal__EndSection">
                <Button label="Close Modal" onClick={this.handleCloseModal} />
              </div>
            </ReactModal>
          </div>

          {/* 툴팁 */}
          <div className="docs-section__box">
            <h6>tooltip</h6>

            <Button dataTip dataFor="tooltip__A" label="Some Btn" classes={['JDbtn--small']} />

            <Button dataTip dataFor="tooltip__B" label="Some Btn" classes={['JDbtn--small']} />

            <Button dataTip dataFor="tooltip__C" label="Some Btn" classes={['JDbtn--small']} />

            <Button dataTip dataFor="tooltip__D" label="Some Btn" classes={['JDbtn--small']} />

            <Button dataTip dataFor="tooltip__E" label="Some Btn" classes={['JDbtn--small']} />

            <ReactTooltip class="JDtooltip" id="tooltip__B" type="info" effect="solid">
              <span>some txt</span>
            </ReactTooltip>

            <ReactTooltip class="JDtooltip" id="tooltip__C" type="success" effect="solid">
              <span>some txt</span>
            </ReactTooltip>

            <ReactTooltip class="JDtooltip" id="tooltip__E" type="error" effect="solid">
              <span>some txt</span>
            </ReactTooltip>

            <ReactTooltip class="JDtooltip" id="tooltip__D" type="dark" effect="solid">
              <span>some txt</span>
            </ReactTooltip>

            <ReactTooltip class="JDtooltip" id="tooltip__A" type="warning" effect="solid">
              <span>some txt</span>
            </ReactTooltip>
          </div>

          {/* 아이콘들 */}
          <h6>Icons</h6>
          <div className="flex-grid-grow docs-section__box">
            <div className="showCompoent__icon_box">
              <Icon label="arrow_right" icon="arrow_right" />
            </div>
            <div className="showCompoent__icon_box">
              <Icon label="arrow_left" icon="arrow_left" />
            </div>
            <div className="showCompoent__icon_box">
              <Icon label="magnifier" icon="magnifier" />
            </div>
          </div>

          {/* 타이포그래피  */}
          {/* 타이포그래피에 대한 정의는 추후에 정리가 필요함 */}
          <h6>TyphoGraphy</h6>
          <div className="docs-section__box">
            <h1>H1: Lorem Text</h1>
            <h2>H2: Lorem Text</h2>
            <h3>H3: Lorem Text</h3>
            <h4>H4: Lorem Text</h4>
            <h5>H5: Lorem Text</h5>
            <h6>H6: Lorem Text</h6>
            <p>Normal: Lorem Text</p>
          </div>
          {/* scss변수 연결이 애매해서 이런식으로 놓음 */}
          <h6>elseThings</h6>
          <div className="docs-section__box">
            <JDLabel txt="small: Lorem Text" />
            <p className="showComponent__tiny"> tiny </p>
          </div>
        </div>
      </div>
    );
  }
}
export default ShowComponents;
