import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import If from 'daniloster-if';
import AccountStatus from '../AccountStatus';
import AccountStatusArea from '../AccountStatusArea';

import Field from '../../../components/Field';
import Button from '../../../components/Button';
import StatusIcon from '../../../components/StatusIcon';

import styles from '../Account.scss';

/**
 * RequestResetPasswordForm
 * Sign in form which captures the email and password and submit the login action.
 */
class RequestResetPasswordForm extends PureComponent {
  static propTypes = {
    /**
     * className applied to the container element in order to change styles from outer world.
     */
    className: PropTypes.string,
    /**
     * Request to reset password by email.
     */
    onRequestResetPassword: PropTypes.func.isRequired,
    /**
     * status represents the state of an area.
     */
    status: PropTypes.shape({}),
  }

  static defaultProps = {
    className: '',
    status: {},
  }

  state = {
    email: '',
  }

  onRequestResetPassword = (e) => {
    e.preventDefault();
    const {
      email,
    } = this.state;
    this.props.onRequestResetPassword(email);
  }

  onChange = (e) => {
    const type = e.target.getAttribute('type');
    this.setState({
      [type]: e.target.value,
    });
  }

  render() {
    const {
      className,
      status,
    } = this.props;
    const {
      email,
    } = this.state;

    const containerClassNames = classnames(
      styles.form,
      { [className]: className },
    );

    const isDone = status.ResetPassword === AccountStatus.Done;

    if (!isDone) {
      return (
        <form className={containerClassNames}>
          <h2 className={styles.header}>
            Redefinição de senha
          </h2>
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="Informe seu Email"
            onChange={this.onChange}
            value={email}
            hasBar
          />
          <Button
            type="submit"
            className={styles.button}
            onClick={this.onRequestResetPassword}
          >
            Redefinir Senha <StatusIcon status={status.ResetPassword} />
          </Button>
          <span>
            Informe seu Email e clique em "Redefinir Senha". Ou, caso queria desistir,
            clique em <Link to="/">voltar</Link> para retornar
            à página inicial.
          </span>
        </form>
      );
    }

    return (
      <form className={containerClassNames}>
        <h2 className={styles.header}>
          Solicitação enviada!
        </h2>
        <p>
          <span>
            Você receberá um email para prosseguir com a redefinição de sua senha.
            Clique aqui para <Link to="/">voltar</Link>.
          </span>
        </p>
      </form>
    );
  }
}

export default RequestResetPasswordForm;
