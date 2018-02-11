import React, {
  PureComponent,
} from 'react';
import classnames from 'classnames';

const identity = () => {
  // do nothing
};

export default class Footer extends PureComponent {
  render() {
    return (
      <div className={''}>
        <a
          href="https://www.flaticon.com/authors/freepik"
          rel="noopener noreferrer"
          target="_blank"
        >
          Icons designed by Freepik from Flaticon
        </a>
        <a
          href="https://material.io/icons"
          rel="noopener noreferrer"
          target="_blank"
        >
          Icons designed by Google
        </a>
      </div>
    );
  }
}
