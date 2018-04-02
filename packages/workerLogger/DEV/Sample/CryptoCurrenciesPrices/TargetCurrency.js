import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export default class TargetCurrency extends PureComponent {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.id = `currency-${uuid()}`;
  }

  render() {
    const { currency, isChecked, onChange } = this.props;

    return (
      <label htmlFor={this.id}>
        <input
          data-currency={currency}
          id={this.id}
          checked={isChecked === true}
          onChange={onChange}
          type="checkbox"
        />
        <span>{currency}</span>
      </label>
    );
  }
}
