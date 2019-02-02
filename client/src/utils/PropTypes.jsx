// 이부분 해체 해산 할것

import PropTypes from 'prop-types';
import { emBol } from './Enums';

// 모아놓고 한번에 정리 ㄱㄱ
const Forms = {
  disabled: PropTypes.bool, // Unity
  validation: PropTypes.func, // Unity
  label: PropTypes.string, // Unity
  classes: PropTypes.arrayOf(PropTypes.string), // Unity
  ltxt: PropTypes.string, // Switch , CheckBox
  rtxt: PropTypes.string, // Switch , CheckBox
  checked: PropTypes.bool, // Switch , CheckBox
  max: PropTypes.number, // Input TextArea
  readOnly: PropTypes.bool, // Input, TesxtArea
  value: PropTypes.string, // Input, TesxtArea
  groupName: PropTypes.string, // Radio
  id: PropTypes.string, // Radio
  selected: PropTypes.string, // SelectBox
};

const FormsDefault = {
  disabled: false,
  validation: () => emBol.NEUTRAL,
  max: 10000,
  label: '',
  classes: [''],
  ltxt: '',
  rtxt: '',
  readOnly: false,
  checked: false,
  groupName: '',
  id: '',
  selected: '',
};

export { Forms, FormsDefault };
