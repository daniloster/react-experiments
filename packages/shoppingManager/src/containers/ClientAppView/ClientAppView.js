import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './ClientAppView.scss';

export default class ClientAppView extends PureComponent {
  static propTypes = {
    /**
     * className for changing styles on the container.
     */
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const {
      className,
    } = this.props;
    const finalClassName = classnames(styles.welcome, { [className]: className });

    return (
      <div className={finalClassName}>
        <h2>Bem-vindo!</h2>
        <p>
          Esta aplicação provê para você uma visualização geral de seus agendamentos e
          se o serviço atual para seus cachorros está pronto.
        </p>
      </div>
    );
  }
}
