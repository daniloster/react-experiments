import React, {
  PureComponent,
} from 'react';
import moment from 'moment';

import styles from './DatePicker.scss';

class Weekdays extends PureComponent {
  render() {
    return (
      moment.weekdaysShort().map(weekday => (
        <div
          key={`calendarWeekday${weekday}`}
          className={[
            styles.calendarWeekday,
            styles[weekday.toLowerCase()],
          ].join(' ')}
        >
          {weekday}
        </div>
      ))
    );
  }
}

export default Weekdays;
