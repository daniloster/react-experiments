import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackgroundContext from './BackgroundContext';

export default class Text extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  renderCount = 0;

  render() {
    const { children } = this.props;
    this.renderCount += 1;
    return (
      <BackgroundContext.Consumer>
        {backgroundColor => (
          <div
            className={`textBlock ${backgroundColor}`}
            style={{
              backgroundColor,
              paddingLeft: '15px',
              margin: '0 0 0 15px',
            }}
          >
            {children}
          </div>
        )}
      </BackgroundContext.Consumer>
    );
  }
}
