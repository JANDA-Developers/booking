import ReactModal from 'react-modal';
import React, { useState, useRef } from 'react';
import Tooltip from '../../../atoms/tooltip';
import CheckBox from '../../../atoms/forms/CheckBox';
import Switch from '../../../atoms/forms/Switch';
import InputText from '../../../atoms/forms/InputText';
import Radio from '../../../atoms/forms/Radio';
import SearchInput from '../../../components/searchInput/SearchInput';
import SideNav from '../../../components/sideNav/SideNav';
import SelectBox from '../../../atoms/forms/SelectBox';
import DayPicker from '../../../components/dayPicker/DayPicker';
import CircleIcon from '../../../atoms/CircleIcon';
import Button from '../../../atoms/Buttons';
import Preloader from '../../../atoms/Preloader';
import SliderExample from './examples/example_slider';
import JDLabel from '../../../atoms/JDLabel';
import utils from '../../../utils/utils';
import Icon, { icons } from '../../../atoms/icons/Icons';
import {
  useInput, useCheckBox, useRadio, useSwitch, useSelect, useToggle,
} from '../../../actions/hook';
import './showComponent.scss';
import '../../../atoms/Modal.scss';
import '../../../atoms/tooltip.scss';

function ShowComponents() {
  const [showModal, setShowModal] = useState(false);
  // the wayMake a Controlled Value
  const inputVali = useInput('1232');
  const checkHook = useCheckBox();
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useRadio('');
  const useSelect1 = useSelect(null);
  const useSelect2 = useSelect(null);
  const useSelect3 = useSelect(null);
  const switchHook = useSwitch(false);
  const refContainer = useRef(null);
  const [SideNavIsOpen, setSideNavIsOpen] = useToggle(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const searchDummyData = [
    { name: 'Manpreet Singh', pic: '' },
    { name: 'Abhimanyu Kapoor', pic: '' },
    { name: 'Richard B. Gomes', pic: '' },
    { name: 'Utkarsh Jain', pic: '' },
  ];

  const selectDummyOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div className="container">
      <div className="docs-section showComponent">
        {/* 체크박스 */}
        <div className="docs-section__box">
          <h6>Check Box</h6>

          <CheckBox {...checkHook} label="normal" />

          <CheckBox {...checkHook} label="disabled" disabled />
        </div>

        {/* 스위치 */}
        <div className="docs-section__box">
          <h6>Switch</h6>

          <Switch {...switchHook} ltxt="normal" />

          <Switch ltxt="disabled" disabled />
        </div>

        {/* 라디오 */}
        <div className="docs-section__box">
          <h6>Radio</h6>
          <Radio onChange={setValue} value="rd1" checked id="RD1--1" groupName="RD1" />
          <Radio onChange={setValue} value="rd2" id="RD1--2" groupName="RD1" />
          <Radio onChange={setValue} value="rd3" id="RD1--3" groupName="RD1" />
          <Radio onChange={setValue} value="rd4" id="RD1--4" groupName="RD1" />
          <Radio id="RD2--1" label="라벨" groupName="RD2" />
          <Radio id="RD2--2" label="라벨2" groupName="RD2" />
        </div>

        {/* 인풋 텍스트 */}
        <div className="docs-section__box">
          <h6>InputText</h6>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText
                {...inputVali}
                refContainer={refContainer}
                label="noraml"
              />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText
                label="validation MaxOver 10 ?"
                validation={utils.isMaxOver}
                max={10}
              />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText label="validation isName ?" validation={utils.isName} />
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
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText label="disabled" disabled />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6" />
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6" />
          </div>
        </div>

        {/* 텍스트 어리어 */}
        <div className="docs-section__box">
          <h6>TextArea</h6>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText
                label="noraml"
                textarea
              />
            </div>
            <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
              <InputText
                label="scroll"
                scroll
                textarea
              />
            </div>
            <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
              <InputText
                disabled
                label="disabled"
                textarea
              />
            </div>
          </div>
        </div>


        {/* 서치바 */}
        <h6>SearchInput</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <SearchInput show userList={searchDummyData} label="normal" />
          </div>
        </div>

        {/* 셀렉트박스 */}
        <h6>SelectBox</h6>
        <div className="flex-grid-grow docs-section__box">
          <div className="flex-grid__col">
            <SelectBox {...useSelect1} options={selectDummyOptions} isOpen label="normal" />
          </div>
          <div className="flex-grid__col">
            <SelectBox {...useSelect2} options={selectDummyOptions} disabled label="disalbed" />
          </div>
          <div className="flex-grid__col">
            <SelectBox {...useSelect3} options={selectDummyOptions} isMulti label="multi" />
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
            {/* 아래내용은 서클형태의 버튼으로 아직까지 활용가치가 없습니다. */}
            {/* <Button label="floating" classes={['JDbtn--floating']} /> */}
            {/* <Button label="floating-large"
          classes={['JDbtn--floating', 'JDbtn--floating-large']} /> */}
          </div>
          <div className="flex-grid__col">
            <Button label="primary" thema="primary" mode="large" />
            <Button label="secondary" thema="secondary" mode="large" />
            <Button label="" preloader icon="arrow_right" />
            <CircleIcon darkWave>
              <Icon icon="arrow_left" />
            </CircleIcon>
            <CircleIcon wave thema="greybg">
              <Icon icon="arrow_left" />
            </CircleIcon>
          </div>
        </div>

        {/* 모달 */}
        <div className="docs-section__box">
          <h6>Modal & SideNav</h6>
          <Button label="Open Modal" onClick={handleOpenModal} />
          <Button icon="menue" label="Open SideNav" onClick={setSideNavIsOpen} />
          <Tooltip
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            className="Modal"
            overlayClassName="Overlay"
          >
            <p>Modal text!</p>
            <div className="ReactModal__EndSection">
              <Button label="Close Modal" onClick={handleCloseModal} />
            </div>
          </Tooltip>
        </div>

        {/* 툴팁 */}
        <div className="docs-section__box">
          <h6>tooltip</h6>

          <Button dataTip dataFor="tooltip__C" label="Some Btn" classes={['JDbtn--small']} />

          <Button dataTip dataFor="tooltip__D" label="Some Btn" classes={['JDbtn--small']} />

          <Button dataTip dataFor="tooltip__E" label="Some Btn" classes={['JDbtn--small']} />

          <Tooltip class="JDtooltip" id="tooltip__C" type="success" effect="solid">
            <span>some txt</span>
          </Tooltip>

          <Tooltip class="JDtooltip" id="tooltip__E" type="error" effect="solid">
            <span>some txt</span>
          </Tooltip>

          <Tooltip class="JDtooltip" id="tooltip__D" type="dark" effect="solid">
            <span>some txt</span>
          </Tooltip>

        </div>

        {/* 아이콘들 */}
        <h6>Icons</h6>
        <div className="flex-grid-grow docs-section__box">
          { Object.keys(icons).map(key => (
            <div key={`showComponent__${key}`} className="showComponent__icon_box">
              <Icon label={key} icon={key} />
            </div>
          ))
          }
        </div>

        {/* 타이포그래피  */}
        <h6>TyphoGraphy</h6>
        <div className="docs-section__box">
          <h1>H1: Lorem Text</h1>
          <h2>H2: Lorem Text</h2>
          <h3>H3: Lorem Text</h3>
          <h4>H4: Lorem Text</h4>
          <h5>H5: Lorem Text</h5>
          <h6>H6: Lorem Text</h6>
          <p className="showComponent__large"> large: Lorem Text </p>
          <p>Normal: Lorem Text</p>
          <JDLabel txt="small: Lorem Text" />
          <p className="showComponent__tiny"> tiny: Lorem Text </p>
        </div>

        {/* Slider 슬라이더 */}
        <h6>Slider</h6>
        <div className="docs-section__box">
          <SliderExample />
        </div>

        {/* sideNav */}
        <SideNav isOpen={SideNavIsOpen} setIsOpen={setSideNavIsOpen} />


        <h6>elseThings</h6>
        <div className="docs-section__box clear-fix">
          <Preloader />
          <span className="JDtext-blink showComponent__blink JDtext-blink--infinity">Blink</span>
          <span className="showComponent__pulse">
            <Button label="pulse" pulse thema="primary" />
          </span>
        </div>
      </div>
    </div>
  );
}
export default ShowComponents;
