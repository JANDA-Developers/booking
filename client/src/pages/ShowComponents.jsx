import React from 'react';
import CheckBox from '../atoms/forms/CheckBox';
import Switch from '../atoms/forms/Switch';
import InputText from '../atoms/forms/InputText';
import Textarea from '../atoms/forms/Textarea';
import Radio from '../atoms/forms/Radio';
import SelectBox from '../atoms/forms/SelectBox';
import DayPicker from '../components/dayPicker/DayPicker';
import Button from '../atoms/Buttons';
import JDLabel from '../atoms/JDLabel';
import utils from '../utils/utils';
import Icon from '../img/icon/icons';
import './showComponent.scss';

const ShowComponents = () => (
  <div className="container">
    <div className="docs_section showCompoent">
      {/* 체크박스 */}
      <div className="docs_section__box">
        <h6>Check Box</h6>

        <CheckBox checked label="normal" />

        <CheckBox label="disabled" disabled />
      </div>

      {/* 스위치 */}
      <div className="docs_section__box">
        <h6>Switch</h6>

        <Switch checked ltxt="normal" />

        <Switch ltxt="disabled" disabled />
      </div>

      {/* 라디오 */}
      <div className="docs_section__box">
        <h6>Radio</h6>
        <Radio checked id="RD1--1" groupName="RD1" />
        <Radio id="RD1--2" groupName="RD1" />
        <Radio id="RD1--3" groupName="RD1" />
        <Radio id="RD1--4" groupName="RD1" />
      </div>

      {/* 인풋 텍스트 */}
      <div className="docs_section__box">
        <h6>InputText</h6>
        <div className="flex-grid flex-grid--md">
          <div className="flex-grid__col">
            <InputText label="noraml" />
          </div>
          <div className="flex-grid__col">
            <InputText label="validation MaxOver 10 ?" validation={utils.isMaxOver} max={10} />
          </div>
          <div className="flex-grid__col">
            <InputText label="validation isName ?" validation={utils.isName} />
          </div>
          <div className="flex-grid__col">
            <InputText label="disabled" disabled />
          </div>
          <div className="flex-grid__col">
            <InputText label="disabled" disabled />
          </div>
        </div>
        <div className="flex-grid flex-grid--md">
          <div className="flex-grid__col">
            <InputText value="you can't fix this" readOnly label="readOnly" />
          </div>
          <div className="flex-grid__col">
            <InputText
              label="Vaild Message PH"
              validation={utils.isPhone}
              data-error="Wrong"
              data-success="Checked"
            />
          </div>
          <div className="flex-grid__col" />
          <div className="flex-grid__col" />
          <div className="flex-grid__col" />
        </div>
      </div>

      {/* 텍스트어리어 */}
      <h6>Textarea</h6>
      <div className="flex-grid docs_section__box">
        <div className="flex-grid__col">
          <Textarea label="normal" />
        </div>
        <div className="flex-grid__col">
          <Textarea label="disabled" disabled />
        </div>
        <div className="flex-grid__col">
          <Textarea label="scrollbar" classes={['JDtextarea--scroll', 'something']} />
        </div>
      </div>

      {/* 셀렉트박스 */}
      <h6>SelectBox</h6>
      <div className="flex-grid docs_section__box">
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
      <div className="flex-grid docs_section__box">
        <div className="flex-grid__col">
          <div className="showComponent__container">
            <DayPicker horizen />
          </div>
          <DayPicker />
        </div>
      </div>

      {/* 버튼 */}
      <h6>buttons</h6>
      <div className="flex-grid docs_section__box">
        <div className="flex-grid__col">
          <Button label="noraml" icon="arrow_right" />
          <Button label="disabled" disabled />
          <Button label="large" classes={['JDbtn--large']} />
          <Button label="small" classes={['JDbtn--small']} />
          {/* 플랫은 화이트 배경뿐입니다.--지금은  */}
          <Button label="flat" classes={['JDbtn--flat']} />
          {/* 아래내용은 서클형태의 버튼으로 아직까지 활용가치가 없습니다. */}
          {/* <Button label="floating" classes={['JDbtn--floating']} /> */}
          {/* <Button label="floating-large"
          classes={['JDbtn--floating', 'JDbtn--floating-large']} /> */}
        </div>
      </div>

      {/* 아이콘들 */}
      <h6>Icons</h6>
      <div className="flex-grid docs_section__box">
        <div className="showCompoent__icon_box">
          <Icon label="arrow_right" icon="arrow_right" />
        </div>
        <div className="showCompoent__icon_box">
          <Icon label="arrow_left" icon="arrow_left" />
        </div>
      </div>

      {/* 타이포그래피  */}
      {/* 타이포그래피에 대한 정의는 추후에 정리가 필요함 */}
      <h6>TyphoGraphy</h6>
      <div className="docs_section__box">
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
      <div className="docs_section__box">
        <JDLabel txt="small: Lorem Text" />
        <p className="showComponent__tiny"> tiny </p>
      </div>
    </div>
  </div>
);

export default ShowComponents;
