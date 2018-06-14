import React from 'react';
import { render } from 'react-dom';
import App from './App';

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

render(<App />, div);
