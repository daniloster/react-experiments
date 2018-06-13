import React, { PureComponent } from 'react';
import Switcher from './Switcher';
import Text from './Text';

export default class ComplexBlock extends PureComponent {
  render() {
    return (
      <div>
        <Switcher>
          <Text>Text one!</Text>
          <Text>Text one!</Text>
        </Switcher>
        <Switcher>
          <Text>
            <span>Text two!</span>
            <Switcher>
              <Text>Awesome text with custom background color!</Text>
              <Text>Awesome text with custom background color!</Text>
              <Text>Awesome text with custom background color!</Text>
            </Switcher>
          </Text>
        </Switcher>
      </div>
    );
  }
}
