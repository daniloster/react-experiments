import React from 'react';
import { render } from 'react-dom';
// import * as Zone from 'zone.js/dist/zone.js';
// import 'zone.js/dist/long-stack-trace-zone';
import App from '../src';

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
link.rel = 'stylesheet';
link.crossorigin = 'anonymous';

document.head.appendChild(link);

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

// function onReady(yourMethod) {
//   if (document.readyState === 'complete' && window.Zone.current) { // Or also compare to 'interactive'
//     setTimeout(yourMethod, 1); // Schedule to run immediately
//   }
//   else {
//     const readyStateCheckInterval = setInterval(function() {
//       if (document.readyState === 'complete' && window.Zone.current) { // Or also compare to 'interactive'
//         clearInterval(readyStateCheckInterval);
//         yourMethod();
//       }
//     }, 10);
//   }
// }

// onReady(() => {
//   window.Zone.current.run(() => {
//     render(<SampleApp />, div);
//   });
// });
render(<App />, div);
