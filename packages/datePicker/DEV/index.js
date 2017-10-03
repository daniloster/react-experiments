import React, {
  Component,
} from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import DatePicker, {
  DatePickerModel,
} from '../src';

// const DatePickerConnected = observer(DatePicker);

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

@observer class App extends Component {
  render() {
    const {
      dateModel,
    } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px' }}>
        <DatePicker
          shouldKeepCalendarWhileSelecting
          hasWeekdays
          {... dateModel}
          onChange={dateModel.onChange}
          onTextChange={dateModel.onTextChange}
          onRestore={dateModel.onRestore}
        />
      </div>
    );
  }
}

render(
  <App dateModel={new DatePickerModel()}/>,
  div,
);
