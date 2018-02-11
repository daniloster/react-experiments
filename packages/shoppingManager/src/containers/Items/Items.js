import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import Crud from '../Crud';
import createItemFormItems from './createItemFormItems';

import styles from './Items.scss';

export default class Items extends PureComponent {
  state = {}

  componentWillMount() {
    this.tableHeaderCells = [
      () => 'Nome',
    ];

    this.tableBodyCells = [
      ({ item }) => item.name,
    ];

    this.formItems = createItemFormItems({
      component: this,
      btnSaveClassName: styles.save,
    });
  }

  render() {
    return (
      <Crud
        {...this.props}
        tableHeaderCells={this.tableHeaderCells}
        tableBodyCells={this.tableBodyCells}
        formItems={this.formItems}
        entryType="items"
        title="Itens"
        addButtonLabel="Limpar para adicionar novo"
      />
    );
  }
}
