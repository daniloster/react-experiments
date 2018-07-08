import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppModel from './AppModel';
import AppStateForm from './AppStateForm';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <AppModel />
        <AppStateForm />
      </ErrorBoundary>
    );
  }
}
