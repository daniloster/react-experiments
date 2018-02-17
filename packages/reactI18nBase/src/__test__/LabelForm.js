import React from 'react';
import Italic from './Italic';

export default ({ i18n, hasError, hasSucceed }) => (
  <div>
    <h2>{i18n.title}</h2>
    <form>
      <div>{i18n.description}</div>
      <input type="text" />
      <div>{i18n.color}</div>
      <input type="text" />

      {hasError && (
        <div style={{ color: 'red' }}>
          {i18n.errorMessage(Italic, 'b')}
        </div>
      )}
      {hasSucceed && (
        <div style={{ color: 'green' }}>
          {i18n.successMessage(Italic, 'b')}
        </div>
      )}
      <button type="submit">{i18n.button}</button>
    </form>
  </div>
);
