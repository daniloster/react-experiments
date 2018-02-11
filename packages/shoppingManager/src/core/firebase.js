import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAVI3nEaZpj_OP6B1WmMa_vlu124BfH3io",
  authDomain: "shopping-manager-d7a11.firebaseapp.com",
  databaseURL: "https://shopping-manager-d7a11.firebaseio.com",
  projectId: "shopping-manager-d7a11",
  storageBucket: "shopping-manager-d7a11.appspot.com",
  messagingSenderId: "1814266883"
};

firebase.initializeApp(config);
const TEN_SECONDS = 10 * 1000;

export const onFirebase = () => new Promise((resolve, reject) => {
  const connectedRef = firebase.database().ref(".info/connected");
  // Timing out connection after 10 seconds without response
  const timeoutFirebase = setTimeout(reject, TEN_SECONDS);
  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      // Connected
      clearTimeout(timeoutFirebase);
      resolve();
    }
  });
});

export const onSessionUser = () => new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      resolve({ data: { user } });
    } else {
      // No user is signed in
      reject();
    }
  });
});

export function convertToPassiveError(resolve) {
  return (error, status) => {
    console.log('convertToPassiveError:', error, status);
    resolve({
      error,
      status: error.code || error.status || status,
    })
  };
}

export default firebase;
