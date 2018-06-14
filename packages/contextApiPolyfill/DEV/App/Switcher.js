import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackgroundContext from './BackgroundContext';

export default class Switcher extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    backgroundColor: BackgroundContext.initialValue,
  };

  toggleBgColor = () => {
    this.setState(({ backgroundColor }) => ({
      backgroundColor: backgroundColor === 'red' ? 'blue' : 'red',
    }));
  };

  render() {
    const { children } = this.props;
    const { backgroundColor } = this.state;

    return (
      <div>
        <button type="button" onClick={this.toggleBgColor}>
          Toggle Bg Color
        </button>
        <BackgroundContext.Provider value={backgroundColor}>{children}</BackgroundContext.Provider>
      </div>
    );
  }
}
