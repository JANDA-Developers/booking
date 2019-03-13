import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Tooltip from '../../../atoms/tooltip/tooltip';
import CheckBox from '../../../atoms/forms/CheckBox';
import Switch from '../../../atoms/forms/Switch';
import InputText from '../../../atoms/forms/InputText';
import Radio from '../../../atoms/forms/Radio';
import SearchInput from '../../../components/searchInput/SearchInput';
import SideNav from '../../../components/sideNav/SideNav';
import SelectBox from '../../../atoms/forms/SelectBox';
import DayPicker from '../../../components/dayPicker/DayPicker';
import Pagination from '../../../components/pagination/Pagination';
import CircleIcon from '../../../atoms/circleIcon/CircleIcon';
import Button from '../../../atoms/button/Buttons';
import Preloader from '../../../atoms/preloader/Preloader';
import SliderExample from './examples/example_slider';
import SliderExample2 from './examples/example_slider2';
import JDlabel from '../../../atoms/label/JDLabel';
import JDmodal from '../../../atoms/modal/Modal';
import ProfileCircle from '../../../atoms/profileCircle/ProfileCircle';
import {
  Tab, Tabs, TabList, TabPanel,
} from '../../../atoms/tabs/tabs';
import utils from '../../../utils/utils';
import Icon, { icons } from '../../../atoms/icons/Icons';
import {
  useInput, useCheckBox, useRadio, useSwitch, useSelect, useToggle, useModal,
} from '../../../actions/hook';
import './ShowComponent.scss';

function ShowComponents() {
  const [isOpen, openModal, closeModal] = useModal(false);
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
        {/* 더 많은 컴포넌트 보기 */}
        <div>
          <h6>
            <NavLink className="JDanchor showComponent__float-link" to="./showComponents/timeline">
              {'NEXT :: Timeline'}
            </NavLink>
          </h6>
        </div>

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
              <InputText {...inputVali} refContainer={refContainer} label="noraml" />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText label="validation MaxOver 10 ?" validation={utils.isMaxOver} max={10} />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText label="validation isName ?" validation={utils.isName} />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText value="you can't fix this" readOnly label="readOnly" />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText label="Vaild Message" isValid dataError="Wrong" dataSuccess="Checked" />
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
              <InputText label="noraml" textarea />
            </div>
            <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
              <InputText label="scroll" scroll textarea />
            </div>
            <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
              <InputText disabled label="disabled" textarea />
            </div>
          </div>
        </div>

        {/* 서치바 */}
        <h6>SearchInput</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <SearchInput staticList dataList={searchDummyData} filter label="normal" />
          </div>
        </div>

        {/* 탭바 */}
        <h6>Tabs</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <Tabs>
              <TabList>
                <Tab>Title 1</Tab>
                <Tab>Title 2</Tab>
              </TabList>

              <TabPanel>
                <h2>Any content 1</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
          </div>
        </div>

        {/* 토스트 알림 */}
        <h6>Toast</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <Button label="noraml" icon="notify" onClick={() => toast('noraml')} />
            <Button label="warning" icon="notify" onClick={() => toast.warn('warning')} />
            <Button label="success" icon="notify" onClick={() => toast.success('success')} />
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
        <h6>DatePicker</h6>
        <div className="flex-grid-grow flex-grid--wmd docs-section__box">
          <div className="flex-grid__col">
            <div className="showComponent__container">
              <JDlabel txt="horizen" />
              <DayPicker horizen />
            </div>
          </div>
          <div className="flex-grid__col">
            <JDlabel txt="normal" />
            <DayPicker />
          </div>
          <div className="flex-grid__col">
            <DayPicker input label="input" isRange={false} />
          </div>
        </div>

        {/* Slider 슬라이더 */}
        <h6>Slider</h6>
        <div className="docs-section__box flex-grid">
          <div className="flex-grid__col col--full-6 col--wmd-12">
            <SliderExample />
          </div>
          <div className="flex-grid__col col--full-6 col--wmd-12">
            <SliderExample2 />
          </div>
        </div>

        {/* 버튼 */}
        <h6>Buttons</h6>
        <div className="docs-section__box">
          <div className="flex-grid__col">
            {/* todo: 버튼 노멀 없애기 */}
            <Button label="noraml" icon="arrow_right" />
            <Button label="disabled" disabled />
            <Button label="large" mode="large" />
            <Button label="small" mode="small" />
            {/* 플랫은 화이트 배경뿐입니다.--지금은  */}
            <Button label="flat" mode="flat" />
          </div>
          <div className="flex-grid__col">
            <Button label="primary" thema="primary" mode="large" />
            <Button label="secondary" thema="secondary" mode="large" />
            <Button href="./sss" label="" preloader icon="arrow_right" />
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
          <Button label="Open Modal" onClick={openModal} />
          <Button icon="menue" label="Open SideNav" onClick={setSideNavIsOpen} />
          <JDmodal isOpen={isOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
            <p>Modal text!</p>
            <div className="ReactModal__EndSection">
              <Button label="Close Modal" onClick={closeModal} />
            </div>
          </JDmodal>
        </div>

        {/* 툴팁 */}
        <div className="docs-section__box">
          <h6>Tooltip</h6>

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
          {Object.keys(icons).map(key => (
            <div key={`showComponent__${key}`} className="showComponent__icon_box">
              <Icon label={key} icon={key} />
            </div>
          ))}
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
          <JDlabel txt="small: Lorem Text" />
          <p className="showComponent__tiny"> tiny: Lorem Text </p>
        </div>

        {/* 페이지네이션 */}
        <h6>Pagination</h6>
        <div className="docs-section__box clear-fix">
          <Pagination align="left" pageCount={13} initialPage={0} marginPagesDisplayed={1} pageRangeDisplayed={5} />
        </div>

        {/* 그외 것들 */}
        <h6>ElseThings</h6>
        <div className="docs-section__box clear-fix">
          <Preloader />
          <span className="showComponent__elseThings JDtext-blink showComponent__blink JDtext-blink--infinity">
            {'Blink'}
          </span>
          <span className="showComponent__elseThings showComponent__pulse">
            <Button label="pulse" pulse thema="primary" />
          </span>
          <span className="showComponent__elseThings">
            <ProfileCircle isBordered />
          </span>
        </div>

        {/* 사이드네비 sideNav */}
        <SideNav isOpen={SideNavIsOpen} setIsOpen={setSideNavIsOpen} />
      </div>
    </div>
  );
}
export default ShowComponents;
