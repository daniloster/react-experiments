import React, { Component } from 'react';
import { render } from 'react-dom';
import ToggleButton from '../src/ToggleButton';

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);


class Example extends Component {
  state = {
    isLightOn: false,
  }

  toggle = () => {
    this.setState(({ isLightOn }) => ({ isLightOn: !isLightOn }));
  }

  render() {
    return (
      <div style={{ padding: '80px' }}>
        <ToggleButton
          onChange={this.toggle}
          isChecked={this.state.isLightOn}
        >
          Lights
        </ToggleButton>
      </div>
    );
  }
}

render(<Example />, div);
