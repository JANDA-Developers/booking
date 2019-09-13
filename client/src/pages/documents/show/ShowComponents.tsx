import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import faker from "faker";
import Tooltip from "../../../atoms/tooltip/Tooltip";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import Switch from "../../../atoms/forms/switch/Switch";
import InputText from "../../../atoms/forms/inputText/InputText";
import Radio from "../../../atoms/forms/radio/Radio";
import SearchInput from "../../../atoms/searchInput/SearchInput";
import SideNav from "../../../components/sideNav/SideNav";
import SelectBox from "../../../atoms/forms/selectBox/SelectBox";
import JDbadge from "../../../atoms/badge/Badge";
import DayPicker from "../../../atoms/dayPicker/DayPicker";
import Pagination from "../../../atoms/pagination/Pagination";
import ImageUploader from "../../../atoms/imageUploader/ImageUploader";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import Button from "../../../atoms/button/Button";
import Preloader from "../../../atoms/preloader/Preloader";
import SliderExample from "./examples/example_slider";
import SliderExample2 from "./examples/example_slider2";
import JDlabel from "../../../atoms/label/JDLabel";
import JDmodal from "../../../atoms/modal/Modal";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import {Tab, TabList, TabPanel, JDtabs} from "../../../atoms/tabs/tabs";
import utils from "../../../utils/utils";
import Icon, {icons} from "../../../atoms/icons/Icons";
import {
  useInput,
  useCheckBox,
  useRadio,
  useSwitch,
  useSelect,
  useToggle,
  useImageUploader,
  useColorPicker,
  useDayPicker,
  useModal
} from "../../../actions/hook";
import "./ShowComponent.scss";
import JDcolorPicker from "../../../atoms/colorPicker/ColorPicker";
import DrragList from "../../../atoms/animation/DrragList";
import Card from "../../../atoms/cards/Card";
import JDbox from "../../../atoms/box/JDbox";
import {CellInfo} from "react-table";
import {UserRole} from "../../../types/enum";
import JDrange from "../../../atoms/forms/range/range";

function ShowComponents() {
  const defaultColor = faker.commerce.color();
  const defaultColor2 = faker.commerce.color();
  const defaultColor3 = faker.commerce.color();
  const useModalHook = useModal(false);
  const inputVali = useInput("1232");
  const checkHook = useCheckBox(false);
  const [value, setValue] = useRadio("");
  const useSelect1 = useSelect(null);
  const useSelect2 = useSelect(null);
  const useSelect3 = useSelect(null);
  const [range, setRange] = useState<any>(0);
  const [onTypeValue, onTypeChange] = useState<any>("");
  const colorPickerHook = useColorPicker(defaultColor);
  const colorPickerHook2 = useColorPicker(defaultColor2);
  const colorPickerHook3 = useColorPicker(defaultColor3);
  const dayPickerHook = useDayPicker(null, null);
  const switchHook = useSwitch(false);
  const refContainer = useRef();
  const [SideNavIsOpen, setSideNavIsOpen] = useToggle(false);
  const imageUploaderHook = useImageUploader();

  const searchDummyData = [
    {name: "Manpreet Singh", pic: ""},
    {name: "Abhimanyu Kapoor", pic: ""},
    {name: "Richard B. Gomes", pic: ""},
    {name: "Utkarsh Jain", pic: ""}
  ];

  const selectDummyOptions = [
    {value: "chocolate", label: "Chocolate"},
    {value: "strawberry", label: "Strawberry"},
    {value: "vanilla", label: "Vanilla"}
  ];

  const TableData = [
    {color: "blue", food: "food", actor: "i"},
    {color: "blue", food: "food", actor: "i"},
    {color: "blue", food: "food", actor: "i"}
  ];

  const dummyDrragData = [
    {
      color: "#FF5500",
      title: "Senior Product Designer",
      text: "Senior Product Designer"
    },
    {
      color: "#5FC296",
      title: "Senior Animator",
      text: "Senior Animator"
    },
    {
      color: "#2DB7F5",
      title: "Visual Designer",
      text: "Visual Designer"
    }
  ];

  const anyProp: any = {};
  const TableColumns = [
    {
      Header: "번호",
      accessor: "index",
      Cell: ({index}: CellInfo) => <span>{index}</span>
    },
    {
      Header: "우선순위",
      accessor: "priority"
    },
    {
      Header: "시즌명",
      accessor: "name"
    },
    {
      Header: "시즌기간",
      accessor: "term"
    },
    {
      Header: "대표색",
      accessor: "color"
    },
    {
      Header: "삭제/생성",
      accessor: "controll",
      Cell: (props: CellInfo) => <Button thema="error" label="삭제" />
    }
  ];

  return (
    <div className="container">
      <div className="docs-section showComponent">
        {/* 더 많은 컴포넌트 보기 */}
        <div>
          <h6>
            <NavLink
              className="JDanchor showComponent__float-link"
              to="./showComponents/timeline"
            >
              {"NEXT :: Timeline"}
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

          <Switch {...switchHook} label="normal" />

          <Switch {...switchHook} ltxt="normal" />

          <Switch {...switchHook} rtxt="normal" />

          <Switch ltxt="disabled" disabled />
        </div>
        {/* 라디오 */}
        <div className="docs-section__box">
          <h6>Radio</h6>
          <Radio
            onChange={setValue}
            value="Y"
            label="홈페이지 사용을 희망합니다."
            checked
            id="RD1--1"
            groupName="RD1"
          />
          <Radio
            onChange={setValue}
            value="N"
            label="홈페이지 사용을 희망하지 않습니다."
            checked
            id="RD1--2"
            groupName="RD1"
          />
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
              <InputText
                label="validation isName ?"
                validation={utils.isName}
              />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText value="you can't fix this" readOnly label="readOnly" />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
              <InputText
                label="Vaild Message - is phone"
                validation={utils.isPhone}
                dataError="Wrong"
                dataSuccess="Checked"
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
            <div className="flex-grid__col col--full-3 col--lg-3 col--md-6">
              <InputText label="noraml" textarea />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-3 col--md-4">
              <InputText label="scroll" scroll textarea />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-3 col--md-4">
              <InputText disabled label="disabled" textarea />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-3 col--md-4">
              <InputText doubleHeight label="doubleHeight" textarea />
            </div>
            <div className="flex-grid__col col--full-3 col--lg-3 col--md-4">
              <InputText halfHeight label="halfHeight" textarea />
            </div>
          </div>
        </div>
        {/* 서치바 */}
        <h6>SearchInput</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <SearchInput
              onTypeValue={onTypeValue}
              onTypeChange={onTypeChange}
              onFindOne={onTypeChange}
              feedBackMessage="feedBackMessage"
              staticList
              dataList={searchDummyData}
              filter
              label="normal"
            />
          </div>
        </div>
        {/* 레인지 */}
        <h6>Range</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <JDrange
              maxValue={20}
              minValue={0}
              value={range}
              onChange={setRange}
            />
          </div>
        </div>
        {/* 탭바 */}
        <h6>Tabs</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <JDlabel txt="Normal" />
            <JDtabs>
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
            </JDtabs>
          </div>
          <div className="flex-grid__col">
            <JDlabel txt="styleMode Button" />
            <JDtabs styleMode="button">
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
            </JDtabs>
          </div>
        </div>
        {/* 토스트 알림 */}
        <h6>Toast</h6>
        <div className="flex-grid-grow flex-grid--md docs-section__box">
          <div className="flex-grid__col">
            <Button
              label="noraml"
              icon="notify"
              onClick={() => toast("noraml")}
            />
            <Button
              label="warning"
              icon="notify"
              onClick={() => toast.warn("warning")}
            />
            <Button
              label="success"
              icon="notify"
              onClick={() => toast.success("success")}
            />
          </div>
        </div>
        {/* 셀렉트박스 */}
        <h6>SelectBox</h6>
        <div className="flex-grid-grow docs-section__box">
          <div className="flex-grid__col">
            <SelectBox
              {...useSelect1}
              options={selectDummyOptions}
              isOpen
              label="normal"
            />
          </div>
          <div className="flex-grid__col">
            <SelectBox
              {...useSelect2}
              options={selectDummyOptions}
              disabled
              label="disalbed"
            />
          </div>
          <div className="flex-grid__col">
            <SelectBox
              {...useSelect3}
              options={selectDummyOptions}
              isMulti
              label="multi"
            />
          </div>
        </div>
        flex-grid = row flex-gird__col = row
        {/* 달력 */}
        <h6>DatePicker</h6>
        <div className="flex-grid docs-section__box">
          <div className="flex-grid__col col--full-4 col--wmd-12">
            <div className="showComponent__container">
              <JDlabel txt="horizen" />
              <DayPicker canSelectBeforeDay={false} {...dayPickerHook} horizen />
            </div>
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-12">
            <JDlabel txt="normal" />
            <DayPicker {...dayPickerHook} canSelectBeforeDay={false} />
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-12">
            <DayPicker
              {...dayPickerHook}
              canSelectBeforeDay={false}
              input
              label="input"
              isRange
            />
          </div>
          <div className="flex-grid__col col--full-4 col--wmd-12">
            <DayPicker
              {...dayPickerHook}
              input
              label="input"
              canSelectBeforeDay={false}
              isRange={false}
            />
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
        {/* 이미지 업로더 */}
        <h6>Image Uploader</h6>
        <div className="docs-section__box flex-grid">
          <div className="flex-grid__col col--full-4 col--wmd-12">
            <ImageUploader minHeight="200px" {...imageUploaderHook} />
          </div>
        </div>
        {/* 뱃지 */}
        <h6>Badge</h6>
        <div className="docs-section__box">
          <JDbadge thema={"white"}>white</JDbadge>
          <JDbadge thema={"black"}>black</JDbadge>
          <JDbadge thema={"primary"}>primary</JDbadge>
          <JDbadge thema={"point"}>point</JDbadge>
          <JDbadge thema={"new"}>new</JDbadge>
        </div>
        {/* 테이블 */}
        <h6>Table</h6>
        <div className="docs-section__box flex-grid">
          <JDtable
            {...ReactTableDefault}
            columns={TableColumns}
            data={TableData}
            showPagination={false}
            loading={false}
            align="center"
            minRows={0}
          />
        </div>
        {/* 컬러픽커 */}
        <h6>ColorPikcer</h6>
        <div className="docs-section__box">
          <JDcolorPicker colorHook={colorPickerHook} />
          <JDcolorPicker colorHook={colorPickerHook2} />
          <JDcolorPicker colorHook={colorPickerHook3} />
        </div>
        {/* 버튼 */}
        <h6>Buttons</h6>
        <div className="docs-section__box">
          <div className="flex-grid__col">
            <Button label="noraml" icon="arrowRight" />
            <Button label="disabled" disabled />
            <Button label="large" size="large" />
            <Button thema="normal" label="small" size="small" />
            <Button thema="error" label="small" size="small" />
            <Button thema="positive" label="small" size="small" />
            <Button thema="warn" label="small" size="small" />
            <Button thema="new" label="small" size="small" />
            <Button thema="error" label="small" size="small" />
            <Button thema="black" label="small" size="small" />
            <Button label="flat" />
          </div>
          <div className="flex-grid__col">
            <Button label="primary" thema="primary" size="large" />
            <Button label="point" thema="point" size="large" />
            <Button hrefOpen="./sss" label="" preloader icon="arrowRight" />
            <CircleIcon darkWave>
              <Icon icon="arrowLeft" />
            </CircleIcon>
            <CircleIcon wave thema="greybg">
              <Icon icon="arrowLeft" />
            </CircleIcon>
          </div>
        </div>
        {/* 모달 */}
        <div className="docs-section__box">
          <h6>Modal & SideNav</h6>
          <Button label="Open Modal" onClick={useModalHook.openModal} />
          <Button
            icon="menue"
            label="Open SideNav"
            onClick={setSideNavIsOpen}
          />
          <JDmodal {...useModalHook}>
            <p>Modal text!</p>
            <div className="JDmodal__endSection">
              <Button label="Close Modal" onClick={useModalHook.closeModal} />
            </div>
          </JDmodal>
        </div>
        s{/* 툴팁 */}
        <div className="docs-section__box">
          <h6>Tooltip</h6>

          <Button
            dataTip
            dataFor="tooltip__C"
            label="Some Btn"
            className="JDbtn--small"
          />

          <Button
            dataTip
            dataFor="tooltip__D"
            label="Some Btn"
            className="JDbtn--small"
          />

          <Button
            dataTip
            dataFor="tooltip__E"
            label="Some Btn"
            className="JDbtn--small"
          />

          <Tooltip id="tooltip__C" type="success" effect="solid">
            <span>some txt</span>
          </Tooltip>

          <Tooltip id="tooltip__E" type="error" effect="solid">
            <span>some txt</span>
          </Tooltip>

          <Tooltip id="tooltip__D" type="dark" effect="solid">
            <span>some txt</span>
          </Tooltip>
        </div>
        {/* 아이콘들 */}
        <h6>Icons</h6>
        <div className=" docs-section__box">
          {Object.keys(icons).map((key: any) => (
            <div
              key={`showComponent__${key}`}
              className="showComponent__icon_box"
            >
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
          <Pagination
            pageCount={13}
            initialPage={0}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
          />
        </div>
        {/* 드래그리스트 */}
        <h6>DragList</h6>
        <div className="docs-section__box clear-fix">
          <DrragList data={dummyDrragData} rowKey="tittle">
            {(recode: any, index: any) => (
              <Card key={index}>
                <h6>this can Drragable</h6> {recode.title}
              </Card>
            )}
          </DrragList>
        </div>
        {/* JDbox */}
        <h6>JDbox</h6>
        <div className="docs-section__box clear-fix">
          <JDbox label="Box Label">boxContent</JDbox>
          <JDbox mode="table">
            <table>
              <thead>
                <tr>
                  <th>TH</th>
                  <th>TH</th>
                  <th>TH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TD</td>
                  <td>TD</td>
                  <td>TD</td>
                </tr>
              </tbody>
            </table>
          </JDbox>
          <JDbox
            mode="border"
            icon="apps"
            topLabel="Top Box Label"
            label="Box Label"
          >
            {"boxContent"}
          </JDbox>
        </div>
        {/* 그외 것들 */}
        <h6>ElseThings</h6>
        <div className="docs-section__box clear-fix">
          <Preloader loading={true} />
          <span className="showComponent__elseThings JDtext-blink showComponent__blink JDtext-blink--infinity">
            {"Blink"}
          </span>
          <span className="showComponent__elseThings showComponent__pulse">
            <Button label="pulse" pulse thema="primary" />
          </span>
          <span className="showComponent__elseThings">
            <ProfileCircle isBordered />
          </span>
        </div>
      </div>
    </div>
  );
}
export default ShowComponents;
