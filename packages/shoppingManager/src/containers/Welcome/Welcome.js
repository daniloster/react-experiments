import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Welcome.scss';

export default class Welcome extends PureComponent {
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
          Esta aplicação provê para você uma visualização geral de seus clientes e cachorros. Além disso,
          mantém controle de vendas proporcionando uma visual geral de seu faturamento.
        </p>
      </div>
    );
  }
}
