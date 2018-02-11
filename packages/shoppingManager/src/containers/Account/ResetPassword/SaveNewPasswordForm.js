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
 * SaveNewPasswordForm
 * Redefines the user password based on the code provided and new password.
 * This form required to be invoked from a valid `reset-password` link with token code.
 */
class SaveNewPasswordForm extends PureComponent {
  static propTypes = {
    /**
     * className applied to the container element in order to change styles from outer world.
     */
    className: PropTypes.string,
    /**
     * Reset password based on code from Url.
     */
    onResetPassword: PropTypes.func.isRequired,
    /**
     * Status represents the state of an area.
     */
    status: PropTypes.shape({}),
  }

  static defaultProps = {
    className: '',
    status: {},
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    code: new URLSearchParams(
      this.context.router.route.location.search.substring(1),
    ).get('oobCode'),
    password: '',
    passwordConfirming: '',
  }

  onResetPassword = (e) => {
    e.preventDefault();
    const {
      code,
      password,
    } = this.state;
    this.props.onResetPassword(code, password);
  }

  onChange = (e) => {
    const prop = e.target.getAttribute('prop-name');
    this.setState({
      [prop]: e.target.value,
    });
  }

  render() {
    const {
      className,
      status,
    } = this.props;
    const {
      password,
      passwordConfirming,
    } = this.state;

    const containerClassNames = classnames(
      styles.form,
      { [className]: className },
    );

    const isDone = status.ResetPassword === AccountStatus.Done;
    const isPasswordInvalid = !password || password !== passwordConfirming;

    if (!isDone) {
      return (
        <form className={containerClassNames}>
          <h2 className={styles.header}>
            Redefinição de senha
          </h2>
          <Field
            hasBar
            id="password"
            isInvalid={isPasswordInvalid}
            label="Senha"
            placeholder="Informe sua nova Senha"
            prop-name="password"
            onChange={this.onChange}
            type="password"
            value={password}
          />
          <Field
            hasBar
            id="passwordConfirming"
            isInvalid={isPasswordInvalid}
            label="Confirmação de Senha"
            placeholder="Informe sua nova Senha novamente"
            prop-name="passwordConfirming"
            onChange={this.onChange}
            type="password"
            value={passwordConfirming}
          />
          <Button
            type="submit"
            className={styles.button}
            onClick={this.onResetPassword}
          >
            Redefinir Senha <StatusIcon status={status.ResetPassword} />
          </Button>
          <span>
            Informe sua nova Senha, então, clique em "Redefinir Senha". Ou, caso queria
            desistir, clique em <Link to="/">voltar</Link> para retornar
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
            Por favor, clique em <Link to="/">voltar</Link> para logar com sua nova
            senha.
          </span>
        </p>
      </form>
    );
  }
}

export default SaveNewPasswordForm;
