import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  shouldComponentUpdate,
} from 'daniloster-utils';
import If from 'daniloster-if';
import DateInputField from './DateInputField';
import Calendar from './Calendar';

import styles from './DatePicker.scss';

/**
 * DatePicker
 * Component for date selection.
 */
class DatePicker extends Component {
  state = {
    isMonthViewDisplayed: false,
    isComponentReady: false,
  }

  componentWillMount() {
    this.showDateMonthView = () => {
      this.setState({ isMonthViewDisplayed: true });
    };

    this.hideDateMonthView = () => {
      this.setState({ isMonthViewDisplayed: false });
    };

    this.isValidDismissEvent = (e) => {
      const target = e.relatedTarget
        || e.explicitOriginalTarget
        || (e.nativeEvent || {}).explicitOriginalTarget
        || (e.target && e.target.tagName !== 'input')
          ? e.target : document.activeElement;

      return !(
        !this.state.isMonthViewDisplayed
        || (
          target
          && this.container
          && this.container.contains(target)
        )
      );
    };

    this.onLeave = ({ e, forceClose }) => {
      if (forceClose || this.isValidDismissEvent(e)) {
        this.hideDateMonthView();
      }
    };

    this.onClickOut = (e) => {
      this.onLeave({ e });
    };

    this.setContainer = (el) => { this.container = el; };

    document.on('click', this.onClickOut);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isComponentReady: true }), 500);
  }

  componentWillReceiveProps(nextProps) {
    const hasValueChange = !nextProps.shouldKeepCalendarWhileSelecting
      && shouldComponentUpdate(
        ['value'],
        this.props,
        nextProps,
      );
    if (hasValueChange) {
      this.hideDateMonthView();
    }
  }

  componentWillUnmount() {
    document.off('click', this.onClickOut);
  }

  render() {
    const {
      className,
      shouldChangeValueOnBlur,
      onRestore,
      onTextChange,
      onChange,
      format,
      isUtc,
      hasWeekdays,
      value,
      textDate,
      isValid,
    } = this.props;
    const {
      isMonthViewDisplayed,
      isComponentReady,
    } = this.state;

    const composedClassName = [
      styles.datePickerContainer,
      className,
    ].join(' ');

    return (
      <div
        className={composedClassName}
        ref={this.setContainer}
      >
        <If
          expression={isComponentReady}
          then={() => (
            <i
              className={styles.iconDatePickerIcon}
              onClick={this.showDateMonthView}
              title="Date picker, press space to open it"
            />
          )}
        />
        <DateInputField
          shouldChangeValueOnBlur={shouldChangeValueOnBlur}
          isUtc={isUtc}
          isValid={isValid}
          format={format}
          textDate={textDate}
          onChange={onTextChange}
          onRestore={onRestore}
          onLeave={this.onLeave}
          onFocus={this.showDateMonthView}
        />
        <If
          expression={isMonthViewDisplayed}
          then={() => (
            <Calendar
              format="DD MMM YYYY"
              isUtc={isUtc}
              value={value}
              hasWeekdays={hasWeekdays}
              onChange={onChange}
            />
          )}
        />
      </div>
    );
  }
}

DatePicker.defaultProps = {
  className: '',
  shouldKeepCalendarWhileSelecting: false,
  shouldChangeValueOnBlur: false,
  isUtc: false,
  hasWeekdays: false,
  format: 'DD MMM YYYY',
};

DatePicker.propTypes = {
  /**
   * Outer world class to modify internal styles.
   */
  className: PropTypes.string,
  /**
   * Flag to identify if it should apply value during on blur event.
   */
  shouldChangeValueOnBlur: PropTypes.bool,
  /* eslint-disable */
  /**
   * Flag to identify if it should apply value during on blur event.
   */
  shouldKeepCalendarWhileSelecting: PropTypes.bool,
  /* eslint-enable */
  /**
   * Identify when date object must be treated as UTC/LocalTime.
   */
  isUtc: PropTypes.bool,
  /**
   * Identify when should display the weekdays or not.
   */
  hasWeekdays: PropTypes.bool,
  /**
   * Date format e.g. "DD/MM/YYYY".
   */
  format: PropTypes.string,
  /**
   * A utc timestamp.
   */
  value: PropTypes.number.isRequired,
  /**
   * A text date.
   */
  textDate: PropTypes.string.isRequired,
  /**
   * A text date.
   */
  isValid: PropTypes.bool.isRequired,
  /**
   * Handler dispatched when the value gets changed.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Handler dispatched when the text gets changed.
   */
  onTextChange: PropTypes.func.isRequired,
  /**
   * Handler dispatched when the restore button is clicked.
   */
  onRestore: PropTypes.func.isRequired,
};

export default DatePicker;
