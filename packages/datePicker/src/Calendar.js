import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import If from 'daniloster-if';
import NavigationButton from './NavigationButton';
import Weekdays from './Weekdays';
import Weeks from './Weeks';
import {
  getMoment,
  getCalendar,
} from './datePickerUtils';

import styles from './DatePicker.scss';

/**
 * Calendar
 * Component for picking a date on the calendar.
 */
class Calendar extends PureComponent {
  state = {
    currentMonth: null,
    month: null,
    year: null,
    calendar: null,
  }

  componentWillMount() {
    const {
      value: initialValue,
      isUtc: initialIsUtc,
    } = this.props;
    const initialCurrentMonth = getMoment(initialIsUtc)(initialValue);
    const initialMonth = initialCurrentMonth.month();
    const initialYear = initialCurrentMonth.year();

    this.setState({
      currentMonth: initialCurrentMonth,
      month: initialMonth,
      year: initialYear,
      calendar: getCalendar({
        year: initialYear,
        month: initialMonth,
        isUtc: initialIsUtc,
      }),
    });

    this.onClick = (e) => {
      const {
        isUtc,
        format,
        onChange,
      } = this.props;
      const item = e.currentTarget;
      const value = Number(item.getAttribute('data-value'));
      const isActive = item.getAttribute('data-active') === 'true';
      if (!isActive) {
        const currentMonth = getMoment(isUtc)(value);
        const month = currentMonth.month();
        const year = currentMonth.year();
        const nextState = {
          currentMonth,
          month,
          year,
          calendar: getCalendar({ year, month, isUtc }),
        };
        this.setState(nextState);
      } else {
        onChange({
          format,
          isUtc,
          value,
          isActive,
        });
      }
    };

    this.nextMonth = (e) => {
      e.preventDefault();
      const {
        currentMonth: m,
      } = this.state;
      const {
        isUtc,
      } = this.props;

      const currentMonth = m.clone().add(1, 'month');
      const month = currentMonth.month();
      const year = currentMonth.year();
      const nextState = {
        currentMonth,
        month,
        year,
        calendar: getCalendar({ year, month, isUtc }),
      };
      this.setState(nextState);
    };

    this.previousMonth = (e) => {
      e.preventDefault();
      const {
        currentMonth: m,
      } = this.state;
      const {
        isUtc,
      } = this.props;

      const currentMonth = m.clone().subtract(1, 'month');
      const month = currentMonth.month();
      const year = currentMonth.year();
      const nextState = {
        currentMonth,
        month,
        year,
        calendar: getCalendar({ year, month, isUtc }),
      };
      this.setState(nextState);
    };
  }

  render() {
    const {
      className,
      isUtc,
      hasWeekdays,
      format,
      value,
    } = this.props;
    const {
      month,
      year,
      calendar,
    } = this.state;
    const m = getMoment(isUtc);
    const currentDate = m(value);
    const currentMonth = m([year, month]);

    return (
      <div className={[styles.calendar, className].join(' ')}>
        <NavigationButton
          className={styles.calendarPreviousMonth}
          navigate={this.previousMonth}
        >
          &lt;
        </NavigationButton>
        <div className={styles.calendarHeaderText}>
          <span>
            {currentMonth.format('MMM YYYY')}
          </span>
        </div>
        <NavigationButton
          className={styles.calendarNextMonth}
          navigate={this.nextMonth}
        >
          &gt;
        </NavigationButton>
        <If
          expression={hasWeekdays}
          then={() => <Weekdays />}
        />
        <Weeks
          isUtc={isUtc}
          month={month}
          value={value}
          calendar={calendar}
          onClickItem={this.onClick}
        />
        <div className={styles.footer}>
          {currentDate.format(format)}
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  className: '',
  isUtc: false,
  hasWeekdays: false,
};

Calendar.propTypes = {
  /**
   * Outer world class to modify internal styles.
   */
  className: PropTypes.string,
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
  format: PropTypes.string.isRequired,
  /**
   * A utc timestamp.
   */
  value: PropTypes.number.isRequired,
  /**
   * Handler dispatched when the value gets changed.
   */
  onChange: PropTypes.func.isRequired,
};

export default Calendar;
