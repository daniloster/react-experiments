import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import Crud from '../Crud';
import createScheduleTypesProperties from './createScheduleTypesProperties';

import styles from './ScheduleTypes.scss';

export default class Items extends PureComponent {
  state = {}

  componentWillMount() {
    const {
      formItems,
      tableBodyCells,
      tableHeaderCells,
    } = createScheduleTypesProperties({
      component: this,
      btnSaveClassName: styles.save,
    });

    this.formItems = formItems;
    this.tableBodyCells = tableBodyCells;
    this.tableHeaderCells = tableHeaderCells;
  }

  render() {
    return (
      <Crud
        {...this.props}
        tableHeaderCells={this.tableHeaderCells}
        tableBodyCells={this.tableBodyCells}
        formItems={this.formItems}
        entryType="schedule-types"
        title="Tipos de Agendamento"
        addButtonLabel="Limpar para adicionar novo"
      />
    );
  }
}
