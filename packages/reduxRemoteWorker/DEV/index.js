import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'daniloster-utils';
import ProxyStore from '../src/ProxyStore';
import DatePicker, { initialState as datePicker } from './Sample/DatePicker';
import CryptoCurrenciesPrices, { initialState as crypto } from './Sample/CryptoCurrenciesPrices';

const store = new ProxyStore('./remote-store.js', { datePicker, crypto });

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

const App = () => (
  <div style={{ marginLeft: '120px', width: '320px', display: 'flex', flexDirection: 'column' }}>
    <Provider store={store}>
      <div>
        <DatePicker shouldKeepCalendarWhileSelecting hasWeekdays />
        <CryptoCurrenciesPrices />
      </div>
    </Provider>
  </div>
);

render(<App />, div);
