import React from 'react';

export default {
  'contacts[].value': {
    $validate: value => !!value,
    // eslint-disable-next-line
    $getMessage: (_, $validateOutput) => (!$validateOutput ? <span>Contact is required</span> : null),
  },
  'attributes[]': {
    $validate: value => !!value,
    // eslint-disable-next-line
    $getMessage: (_, $validateOutput) => (!$validateOutput ? <span>Attribute is required</span> : null),
  },
  firstname: {
    $validate: value => !!value,
    // eslint-disable-next-line
    $getMessage: (_, $validateOutput) => (!$validateOutput ? <span>Firstname is required</span> : null),
  },
  age: {
    $validate: value => !!value && /\d+$/g.test(value),
    // eslint-disable-next-line
    $getMessage: (_, $validateOutput) =>
      !$validateOutput ? <span>Age is required and only accepts numbers</span> : null,
  },
  lastname: {
    $validate: value => !!value,
    // eslint-disable-next-line
    $getMessage: (_, $validateOutput) => (!$validateOutput ? <span>Lastname is required</span> : null),
  },
  title: {
    $validate: value => /^(([mM][rR])([sS]?))/g.test(value),
    $getMessage: (value, $validateOutput) =>
      !$validateOutput && (
        <div>
          {value ? (
            <span>
              Invalid certificate title {'"'}
              {value}
              {'"'}.
            </span>
          ) : (
            <span>Certificate title is required!</span>
          )}
          <span>
            The only allowed ones are {'"Mr"'} or {'"Mrs"'}.
          </span>
        </div>
      ),
  },
  'certificate.description': {
    $validate: value => /^(((\w+)\s+){9}(\w+))/g.test(value),
    $getMessage: (value, $validateOutput) =>
      !$validateOutput && (
        <div>
          {value ? (
            <span>Certificate description is invalid.</span>
          ) : (
            <span>Certificate description is required!</span>
          )}
          <span>It requires 10 words as description at least.</span>
        </div>
      ),
  },
};
