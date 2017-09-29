import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import styles from './DatePicker.scss';

/**
 * DateInputField
 * Component for text date on key stroke.
 */
class DateInputField extends PureComponent {
  componentWillMount() {
    this.onChange = (e) => {
      this.changeDate(e.target.value);
    };

    this.changeDate = (textDate, isSubmitting = false) => {
      const {
        isUtc,
        format,
        onChange,
      } = this.props;
      onChange({ textDate, format, isUtc, isSubmitting });
    };

    this.onBlur = (e) => {
      const {
        shouldChangeValueOnBlur,
        isValid,
        textDate,
        onLeave,
      } = this.props;
      if (shouldChangeValueOnBlur && isValid) {
        this.changeDate(textDate, true);
      } else {
        onLeave({ e });
      }
    };

    this.onKeyDown = (e) => {
      const {
        isValid,
        shouldChangeValueOnBlur,
        onRestore,
        onLeave,
      } = this.props;
      if (e.key === 'Enter' && isValid) {
        this.changeDate(e.target.value, true);
      } else if (e.key === 'Tab' && !shouldChangeValueOnBlur) {
        e.stopPropagation();
        onLeave({ forceClose: true });
      } else if (e.key === 'Escape') {
        onRestore();
      }
    };
  }

  render() {
    const {
      textDate,
      isValid,
      onFocus,
    } = this.props;

    return (
      <input
        type="text"
        className={[
          isValid ? styles.valid : styles.invalid,
          styles.dateField,
          this.props.className,
        ].join(' ')}
        value={textDate}
        onFocus={onFocus}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
      />
    );
  }
}

DateInputField.defaultProps = {
  className: '',
  shouldChangeValueOnBlur: false,
  isUtc: false,
  format: 'DD MMM YYYY',
};

DateInputField.propTypes = {
  /**
   * Outer world class to modify internal styles.
   */
  className: PropTypes.string,
  /**
   * Flag to identify if it should apply value during on blur event.
   */
  shouldChangeValueOnBlur: PropTypes.bool,
  /**
   * Identify when date object must be treated as UTC/LocalTime.
   */
  isUtc: PropTypes.bool,
  /**
   * Identify when the text date is valid.
   */
  isValid: PropTypes.bool.isRequired,
  /**
   * Date format e.g. "DD/MM/YYYY".
   */
  format: PropTypes.string,
  /**
   * A utc timestamp.
   */
  textDate: PropTypes.string.isRequired,
  /**
   * Handler dispatched when the value gets changed.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Handler dispatched when the field gets focused.
   */
  onFocus: PropTypes.func.isRequired,
  /**
   * Handler dispatched when the field losts focus.
   */
  onLeave: PropTypes.func.isRequired,
  /**
   * Handler dispatched when the 'Escape' key is pressed.
   */
  onRestore: PropTypes.func.isRequired,
};

export default DateInputField;
