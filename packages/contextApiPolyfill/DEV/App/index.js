import React, { PureComponent } from 'react';
import ComplexBlock from './ComplexBlock';
import Switcher from './Switcher';
import Text from './Text';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Switcher>
          <Text>
            <ComplexBlock />
            <hr />
            <ComplexBlock />
            <hr />
            <ComplexBlock />
          </Text>
        </Switcher>
      </div>
    );
  }
}
