import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppModel from './AppModel';
import AppModelList from './AppModelList';
import AppFormState from './AppFormState';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <AppModel />
        <hr />
        <AppModelList />
        <hr />
        <AppFormState />
      </ErrorBoundary>
    );
  }
}
