import React, {
  Component, PureComponent,
} from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import If from 'daniloster-if';
import configureStore, {
  createMapStateToProps,
  mapDispatchToProps,
} from './configureStore';
import firebase, {
  onFirebase,
  onSessionUser,
} from './core/firebase';
import RestApi from './core/RestApi';
import AuthApi from './core/AuthApi';

import AppView from './containers/AppView';
import ConnectedResetPassword from './containers/Account/ResetPassword';

import styles from './App.scss';

const store = configureStore();

const actions = mapDispatchToProps(store);
const ConnectedAppView = connect(createMapStateToProps(actions))(AppView);

class MainPage extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/reset-password" component={ConnectedResetPassword} />
        <Route path="/" component={ConnectedAppView} />
      </Switch>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Route path="/" component={MainPage} />
          </Router>
        </Provider>
      </div>
    )
  }
}

onFirebase().then(() => {
  onSessionUser().then(({ data }) => {
    actions.authActions.loadAuthenticatedUser(data.user.uid);
  })
  .catch(actions.authActions.setApplicationReady);
})
.catch(actions.authActions.setApplicationReady);

export { mapDispatchToProps };
export { createMapStateToProps };
export { configureStore };
export { Application };
