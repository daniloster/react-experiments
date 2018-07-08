import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Input extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    type: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    type: 'text',
    value: '',
  };

  render() {
    return <input {...this.props} />;
  }
}
