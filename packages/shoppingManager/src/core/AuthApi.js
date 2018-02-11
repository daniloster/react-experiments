import firebase, {
  convertToPassiveError,
} from './firebase';
import RestApi from './RestApi';

export default class AuthApi {

  // static create = (email, password, shouldReset = false) => {
  //   return new Promise((resolve) => {
  //     firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then(data => {
  //       const getOut = args => {
  //         AuthApi.logout().then(() => {
  //           resolve(args);
  //         });
  //       };
  //       AuthApi.login(email, password)
  //       .then(response => {
  //         if (shouldReset) {
  //           return AuthApi.resetPassword(email)
  //           .then(error => {
  //             if (error) {
  //               const errorMessage = 'It has not been possible to send email to reset password.';
  //               return firebase.auth().currentUser.delete()
  //                 .then(() => {
  //                   AuthApi.logout().then(() => {
  //                     resolve({ error: errorMessage, status: 500 });
  //                   });
  //                 })
  //                 .catch(convertToPassiveError(getOut));
  //             }
  //             AuthApi.logout().then(() => {
  //               resolve(response.uid ? { data: response } : response);
  //             });
  //           })
  //           .catch(convertToPassiveError(getOut));
  //         }

  //         resolve(response.uid ? { data: response } : response);
  //       })
  //       .catch(convertToPassiveError(resolve));
  //     })
  //     .catch(convertToPassiveError(resolve));
  //   });
  // }

  static create = (email, password) => {
    return new Promise((resolve) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => resolve({ data }))
      .catch(convertToPassiveError(resolve));
    });
  }

  static login = (email, password) => {
    return new Promise((resolve) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => resolve(response.uid ? { data: response } : response))
      .catch(convertToPassiveError(resolve));
    });
  }

  static logout = (email, password) => {
    return new Promise((resolve) => {
      firebase.auth().signOut()
      .then(resolve)
      .catch(convertToPassiveError(resolve));
    });
  }

  static authAnonymously = () => {
    return new Promise((resolve) => {
      firebase.auth().signInAnonymously()
      .then(resolve)
      .catch(resolve);
    });
  }

  static resetPassword = (email) => {
    return new Promise((resolve) => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => resolve({ data: { email, status: 'Reset' } }))
      // .catch(error => resolve(error))
      .catch(convertToPassiveError(resolve));
    });
  }

  static confirmResetPassword = (code, newPassword) => {
    return new Promise((resolve) => {
      firebase.auth().confirmPasswordReset(code, newPassword)
      .then(() => resolve(false))
      // .catch(error => resolve(error))
      .catch(convertToPassiveError(resolve));
    });
  }
}
