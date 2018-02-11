import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import If from 'daniloster-if';
import AccountStatus from './AccountStatus';
import AccountStatusArea from './AccountStatusArea';

import Field from '../../components/Field';
import Button from '../../components/Button';
import StatusIcon from '../../components/StatusIcon';

import styles from './Account.scss';

/**
 * SignUpForm
 * Sign up form which captures the user data and create an account.
 */
class SignUpForm extends Component {
  static propTypes = {
    /**
     * className applied to the container element in order to change styles from outer world.
     */
    className: PropTypes.string,
    /**
     * user logged in.
     */
    user: PropTypes.shape({}),
    /**
     * status represents the state of one area.
     */
    status: PropTypes.shape({}),
    /**
     * login action which receives an object with { email, password }
     */
    onChangeStatus: PropTypes.func.isRequired,
    /**
     * login action which receives an object with { email, password }
     */
    onSignUp: PropTypes.func.isRequired,
    /**
     * send current user to sign in form
     */
    onNavigateToSignIn: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
    user: {},
    status: {},
  }

  state = {
    user: { ...(this.props.user || {}) },
    password: '',
    confirmPassword: '',
    isPasswordValid: false,
  }

  onSignUp = (e) => {
    e.preventDefault();
    const {
      user,
    } = this.state;
    this.props.onSignUp(user);
  }

  onChange = (e) => {
    const prop = e.target.getAttribute('data-property-name');
    const value = e.target.value;
    this.setState(({ user: currentUser }) => {
      const user = {
        ...currentUser,
        [prop]: value,
      };
      return { user };
    });
  }

  onNavigateToSignIn = (e) => {
    this.props.onNavigateToSignIn();
  }

  render() {
    const {
      className,
      status,
    } = this.props;
    const {
      user,
      password,
      confirmPassword,
      isPasswordValid,
    } = this.state;

    const containerClassNames = [
      styles.form,
      className,
    ].join(' ');

    return (
      <form className={containerClassNames}>
        <h2 className={styles.header}>
          Sign up
        </h2>

        <Field
          label="Email"
          id="email"
          type="email"
          data-property-name="email"
          value={user.email}
          onChange={this.onChange}
          placeholder="Informe seu email"
          hasBar
        />
        <Field
          label="Nome"
          id="firstname"
          type="text"
          data-property-name="firstname"
          value={user.firstname}
          onChange={this.onChange}
          placeholder="Informe seu nome"
          hasBar
        />
        <Field
          label="Sobrenome"
          id="lastname"
          type="text"
          data-property-name="lastname"
          value={user.lastname}
          onChange={this.onChange}
          placeholder="Informe seu sobrenome"
          hasBar
        />
        <Field
          label="Telefone"
          id="phone"
          type="text"
          data-property-name="phone"
          value={user.phone}
          onChange={this.onChange}
          placeholder="Informe seu telefone"
          hasBar
        />
        <Field
          label="Endereço"
          id="address"
          type="text"
          data-property-name="address"
          value={user.address}
          onChange={this.onChange}
          placeholder="Informe seu endereço"
          hasBar
        />
        <Field
          label="Cidade"
          id="city"
          type="text"
          data-property-name="city"
          value={user.city}
          onChange={this.onChange}
          placeholder="Informe sua Cidade"
          hasBar
        />
        <Field
          label="Estado"
          id="state"
          type="text"
          data-property-name="state"
          value={user.state}
          onChange={this.onChange}
          placeholder="Informe seu Estado"
          hasBar
        />
        <Field
          label="País"
          id="country"
          type="text"
          data-property-name="country"
          value={user.country}
          onChange={this.onChange}
          placeholder="Informe seu País"
          hasBar
        />
        <div className={styles.groupSignUpButtons}>
          <Button
            type="submit"
            className={styles.save}
            onClick={this.onSignUp}
            isFlat
          >
            Registrar
          </Button>
          <Button
            type="button"
            className={styles.cancel}
            onClick={this.onNavigateToSignIn}
            isFlat
            isCommon
          >
            Cancelar
          </Button>
        </div>
        <span>
          Informe seus dados, então, clique em "Registrar". Ou
          <Button
            isLink
            onClick={this.onNavigateToSignIn}
          >cancelar</Button>
          para voltar à página de login.
        </span>
        {status.messages && (
          status.messages.map(
            (message, idx) => (
              <span key={`errorForm${idx}`} className={styles.errorMessage}>
                {message}
              </span>
            ),
          )
        )}
      </form>
    );
  }
}

export default SignUpForm;
