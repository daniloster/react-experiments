import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ClientViewContainer } from '../Account/Clients';

import styles from './Pets.scss';
import crudStyles from '../Crud/Crud.scss';

export default class Pets extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired
  }

  componentWillMount() {
    const {
      router,
    } = this.context;
    this.clientId = router.route.match.params.clientId;
  }

  render() {
    const {
      className,
    } = this.props;
    const finalClassName = classnames(
      styles.pageContainer,
      { [className]: className },
    );

    return (
      <div className={finalClassName}>
        <h2 className={classnames(styles.header)}>Animais</h2>
        <ClientViewContainer clientId={this.clientId} />
      </div>
    );
  }
}
