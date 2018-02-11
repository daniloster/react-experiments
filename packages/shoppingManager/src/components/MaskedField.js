import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { shouldComponentUpdate } from 'daniloster-utils';

import Field from './Field';

const identity = () => {
  // do nothing
};

function isDigit(char) {
  return /\d/.test(char);
}

const BACKSPACE = 'Backspace';
const DELETE = 'Delete';
const HANDLED_KEYS = [BACKSPACE, DELETE, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const EMPTY_STRING = '';
function stripMask(maskedData) {
  return Array.slice(maskedData || EMPTY_STRING).filter(isDigit);
}

function getMaskedValue(mask, field, keys) {
  const { selectionStart, selectionEnd } = field;
  const data = [
    ...Array.slice(
      stripMask(
        field.value.substring(0, selectionStart),
      ),
    ),
    ...Array.slice(
      stripMask(
        keys,
      ),
    ),
    ...Array.slice(
      stripMask(
        field.value.substring(selectionEnd),
      ),
    ),
  ];
  return mask.map(function (char) {
    if (char !== '_' || data.length === 0) {
      return char;
    }

    return data.shift();
  }).join('');
}

function getStateFromProp(props) {
  const mask = Array.slice(props.mask);
  return {
    mask,
    value: getMaskedValue(
      mask,
      { selectionStart: 0, selectionEnd: 0, value: '' },
      props.value,
    ),
  };
}

function setCaretPosition(field, start, end) {
  const finalEnd = start >= end ? start : end || start;
  if (field.createTextRange) {
    const range = field.createTextRange();
    range.moveEnd('character', finalEnd);
    range.moveStart('character', start);
    range.select();
  } else if (field.setSelectionRange) {
    field.focus();
    field.setSelectionRange(start, finalEnd);
  } else {
    field.focus();
  }
}

/**
 * MaskedField
 * This component is based on the following mask implementation:
 * https://jsfiddle.net/qmyo6a1h/1/
 */
export default class MaskedField extends Component {
  static propTypes = {
    /**
     * Mask pattern e.g. "(__) ___-____"
     */
    mask: PropTypes.string.isRequired,
    /**
     * Handler for change event.
     */
    onChange: PropTypes.func,
    /**
     * Handler for key down event.
     */
    onKeyDown: PropTypes.func,
    /**
     * Value with mask pattern.
     */
    value: PropTypes.string,
  }

  static defaultProps = {
    onChange: identity,
    onClick: identity,
    onKeyDown: identity,
    value: '',
  }

  componentWillMount() {
    this.state = {
      ...getStateFromProp(this.props),
      selectionStart: 0,
      selectionEnd: 0,
    };
  }

  componentDidUpdate() {
    if (this.field.value) {
      /**
       * To set the caret position is required to detach from
       * the function from the react stacktrace.
       */
      setTimeout(() => setCaretPosition(
        this.field,
        this.state.selectionStart,
        this.state.selectionEnd,
      ), 0);
    }
  }

  updateStateForEvent = (e) => {
    if (!HANDLED_KEYS.includes(e.key)) {
      return;
    }
    const {
      mask,
      value,
    } = this.state;
    const field = e.target;
    const newState = {};
    let oldStart = field.selectionStart;
    const oldEnd = field.selectionEnd;
    const isRemovalOperation = [BACKSPACE, DELETE].includes(e.key);
    const key = isRemovalOperation
    ? ''
    : e.key;

    if (oldStart === oldEnd && BACKSPACE === e.key && field.selectionStart > 0) {
      oldStart -= 1;
      field.selectionStart = oldStart;
    }
    field.value = getMaskedValue(mask, field, key);
    newState.value = field.value;
    if (oldStart === oldEnd && BACKSPACE !== e.key) {
      const positionsAvailable = mask.map((char, index) => ({ char, index }))
        .filter(({ char, index }) => index >= oldStart && char === '_');
      if (positionsAvailable.length > 1) {
        oldStart = positionsAvailable[1].index;
      } else {
        oldStart = oldStart + 1;
      }
    }
    newState.selectionStart = oldStart;
    newState.selectionEnd = newState.selectionStart;

    this.setState(newState, () => this.props.onChange({ target: field }));
  }

  onKeyDown = (e) => {
    this.updateStateForEvent(e);
    this.props.onKeyDown(e);
  }

  setElement = input => {
    this.field = input;
  }

  render() {
    const {
      mask: initialMask,
      value: initialValue,
      onChange,
      onKeyDown,
      ...otherProps,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <Field
        componentRef={this.setElement}
        value={value === initialMask ? '' : value}
        placeholder={initialMask}
        {...otherProps}
        onKeyDown={this.onKeyDown}
      />
    );
  }
}

const MASKED_FIELD_PROP_KEYS = Object.keys(MaskedField.propTypes);
