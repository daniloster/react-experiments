import React, {
  Component,
} from 'react';
import { connect, Provider } from 'react-redux';
import Application, {
  configureStore,
  mapDispatchToProps,
  createMapStateToProps,
} from '../src';
import firebase, {
  onFirebase,
  onSessionUser,
} from '../src/core/firebase';
import RestApi from '../src/core/RestApi';
import AuthApi from '../src/core/AuthApi';

import styles from './SampleApp.scss';

const store = configureStore();

const actions = mapDispatchToProps(store);
const ConnectedApplication = connect(createMapStateToProps(actions))(Application);

export default class SampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApplication />
      </Provider>
    )
  }
}

onFirebase().then(() => {
  onSessionUser().then(({ data }) => {
    actions.authActions.loadAuthenticatedUser(data.user.uid);
  })
  .catch(() => {
    actions.authActions.setApplicationReady();
  });
})
.catch(() => {
  actions.authActions.setApplicationReady();
});

// export default new Promise(resolve => {

//   onFirebase().then(() => {
//     const email = 'danilocastro@outlook.com';
//     const password = 'gokcou';

    // new Array(11).fill(1).reduce((chainedPromises, val, idx) => {
    //   return new Promise(resolve => {
    //     chainedPromises.then(() => {
    //       setTimeout(() => {
    //         console.log('Creating', idx);
    //         AuthApi.create({
    //           email: `${email}+test${idx}`,
    //           password,
    //           firstname: `Danilo+test${idx}`,
    //           lastname: `Castro+test${idx}`,
    //         }).then(resolve);
    //       }, 2000);
    //     });
    //   });
    // }, Promise.resolve(true));

    // AuthApi.create({
    //   email,
    //   password,
    //   firstname: 'Danilo',
    //   lastname: 'Castro',
    // })
    // .then((data) => {
    //   console.log('data', data);
    // });

    // AuthApi.login(email, password)
    // .then((data) => {
    //   console.log('data', data);
    // });



//     resolve(SampleApp);
//   });
// });
