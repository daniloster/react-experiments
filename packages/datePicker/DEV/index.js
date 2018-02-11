import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { observer } from 'mobx-react';
import DatePicker, { DatePickerModel, createReduxStoreSection } from '../src';

const { reducers, mapDispatchToProp } = createReduxStoreSection('datePicker');

function mapStateToProps({ datePicker }, ownProps) {
  return {
    ...datePicker,
    ...ownProps,
  };
}

const ConnectedDatePicker = connect(mapStateToProps, mapDispatchToProp)(DatePicker);

const store = createStore(
  combineReducers({
    ...reducers,
  }),
);

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

@observer
class App extends Component {
  static propTypes = {
    dateModel: PropTypes.shape({}),
  };

  render() {
    const { dateModel } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', padding: '60px' }}>
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column' }}>
          <DatePicker
            shouldKeepCalendarWhileSelecting
            hasWeekdays
            {...dateModel}
            onChange={dateModel.onChange}
            onTextChange={dateModel.onTextChange}
            onRestore={dateModel.onRestore}
          />
        </div>
        <div
          style={{ marginLeft: '120px', width: '320px', display: 'flex', flexDirection: 'column' }}
        >
          <Provider store={store}>
            <ConnectedDatePicker shouldKeepCalendarWhileSelecting hasWeekdays />
          </Provider>
        </div>
      </div>
    );
  }
}

render(<App dateModel={new DatePickerModel()} />, div);
