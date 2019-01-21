import PropTypes from 'prop-types';
import { emBol } from './Enums';

const Forms = {
  disabled: PropTypes.bool,
  validation: PropTypes.func,
  max: PropTypes.number,
  label: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string),
  ltxt: PropTypes.string,
  rtxt: PropTypes.string,
};

const FormsDefault = {
  disabled: false,
  validation: () => emBol.NEUTRAL,
  max: 10000,
  label: '',
  classes: [''],
  ltxt: '',
  rtxt: '',
};

export { Forms, FormsDefault };
