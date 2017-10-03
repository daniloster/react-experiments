import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import styles from './DatePicker.scss';

/**
 * NavigationButton
 * They are button to move forward and backward through the months.
 */
class NavigationButton extends PureComponent {
  render() {
    const {
      className,
      navigate,
      children,
    } = this.props;
    return (
      <button
        type="button"
        className={[
          styles.calendarNavigation,
          className,
        ].join(' ')}
        onClick={navigate}
      >
        {children}
      </button>
    );
  }
}

NavigationButton.propTypes = {
  /**
   * Outer world class to modify internal styles.
   */
  className: PropTypes.string,
  /**
   * Representation of what must be considered part of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Action associated as a handle. Note: expect the action to handle the event agurment.
   */
  navigate: PropTypes.func.isRequired,
};

NavigationButton.defaultProps = {
  className: '',
};

export default NavigationButton;
