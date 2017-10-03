import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  getMoment,
} from './datePickerUtils';

import styles from './DatePicker.scss';

class Weeks extends PureComponent {
  render() {
    const {
      className,
      isUtc,
      month,
      value,
      calendar,
      onClickItem,
    } = this.props;
    const m = getMoment(isUtc);
    return (
      <div className={[styles.calendarDays, className].join(' ')}>
        {calendar.reduce((allDays, week) => {
          const weekdays = Array(7).fill(0)
            .map((v, idx) => week.start.clone().add(idx, 'days'))
            .map((day) => {
              const currentDay = m([day.year(), day.month(), day.date()]);
              const isCurrentMonth = currentDay.month() === month;
              const isToday = currentDay.format('DD-MM-YYYY') === m().format('DD-MM-YYYY');
              const isSelected = currentDay.format('DD-MM-YYYY') === m(value).format('DD-MM-YYYY');
              const dayClasses = [styles.calendarDay];

              if (isSelected) {
                dayClasses.push(styles.calendarSelectedDay);
              }
              if (isToday) {
                dayClasses.push(styles.calendarToday);
              }

              return (
                <button
                  type="button"
                  className={dayClasses.join(' ')}
                  onClick={onClickItem}
                  key={currentDay.valueOf()}
                  data-value={currentDay.valueOf()}
                  data-active={isCurrentMonth}
                >
                  {currentDay.format('D')}
                </button>
              );
            });
          return allDays.concat(weekdays);
        }, [])}
      </div>
    );
  }
}

Weeks.propTypes = {
  /**
   * Outer world class to modify internal styles.
   */
  className: PropTypes.string,
  /**
   * Identify when date object must be treated as UTC/LocalTime.
   */
  isUtc: PropTypes.bool.isRequired,
  /**
   * A number [0-11] representing the month for the calendar.
   */
  month: PropTypes.number.isRequired,
  /**
   * A utc timestamp.
   */
  value: PropTypes.number.isRequired,
  /**
   * The calendar to display. It is an array of objects with
   * start and end dates representing the week.
   */
  calendar: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.object,
      end: PropTypes.object,
    }),
  ).isRequired,
  /**
   * Action to be associated as handler to click event on each date
   * of the calendar.
   */
  onClickItem: PropTypes.func.isRequired,
};

Weeks.defaultProps = {
  className: '',
};

export default Weeks;
