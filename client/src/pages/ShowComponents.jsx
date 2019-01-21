import React from 'react';
import CheckBox from '../atoms/forms/CheckBox';
import Switch from '../atoms/forms/Switch';
import InputText from '../atoms/forms/InputText';
import Textarea from '../atoms/forms/Textarea';
import utils from '../utils/utils';

const ShowComponents = () => (
  <div className="container">
    <div className="docs_section">
      <div className="docs_section__box">
        <h6>Check Box</h6>

        <CheckBox label="normal" />

        <CheckBox label="disabled" disabled />
      </div>
      <div className="docs_section__box">
        <h6>Switch</h6>

        <Switch ltxt="normal" />

        <Switch ltxt="disabled" disabled />
      </div>
      <h6>InputText</h6>
      <div className="flex-grid flex-grid--md docs_section__box">
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
      </div>
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
    </div>
  </div>
);

export default ShowComponents;
