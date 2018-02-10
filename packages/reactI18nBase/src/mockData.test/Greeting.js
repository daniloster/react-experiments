import React from 'react';
import Italic from './Italic';

export default ({ i18n, name }) => (
  <div>
    <h2>{i18n.greeting(name, Italic)}</h2>
    <div>{i18n.message('strong')}</div>
  </div>
);
