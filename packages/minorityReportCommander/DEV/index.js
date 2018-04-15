// import React from 'react';
// import { render } from 'react-dom';
import VoiceModule from '../src/VoiceModule';

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

// render(<HelloWorld>daniloster</HelloWorld>, div);

const voice = new VoiceModule();

voice
  .bootstrap()
  .addContextualCommands('hello', () => {
    voice.module.say('Hi there! How can I help you today?');
  })
  .addContextualCommands(
    'would you know *',
    (_, wildcard) => {
      voice.module.say(`You said ${wildcard}`);
    },
    { smart: true },
  )
  .init({ debug: true, speed: 0.9 });
