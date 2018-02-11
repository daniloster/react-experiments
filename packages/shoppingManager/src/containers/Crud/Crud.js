import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

import styles from './Crud.scss';

/**
 * Crud
 * List and register items.
 */
class Crud extends Component {
  static propTypes = {
    /**
     * The property that defines the add button label.
     */
    addButtonLabel: PropTypes.string,
    /**
     * Defines the entry namespace for rest api.
     */
    baseUrl: PropTypes.string,
    /**
     * className applied to the container element in order to change styles from outer world.
     */
    className: PropTypes.string,
    /**
     * The property that identifies the type of the entry.
     */
    entryType: PropTypes.string,
    /**
     * The property that identifies the entry.
     */
    idProperty: PropTypes.string,
    /**
     * The authorized user.
     */
    owner: PropTypes.shape({}),
    /**
     * List of items.
     */
    items: PropTypes.arrayOf(PropTypes.shape({})),
    /**
     * Creates the table headers.
     */
    tableHeaderCells: PropTypes.arrayOf(PropTypes.func).isRequired,
    /**
     * Creates the table content for each item.
     */
    tableBodyCells: PropTypes.arrayOf(PropTypes.func).isRequired,
    /**
     * List of functions that creates the fields in the form.
     */
    formItems: PropTypes.arrayOf(PropTypes.func).isRequired,
    /**
     * List all items.
     */
    onList: PropTypes.func.isRequired,
    /**
     * Creates or save a change on item.
     */
    onSave: PropTypes.func.isRequired,
    /**
     * Removes one or more items.
     */
    onRemove: PropTypes.func,
    /**
     * Edit a item.
     */
    onEdit: PropTypes.func,
    /**
     * Clears the form for new entry.
     */
    resetValues: PropTypes.func.isRequired,
    /**
     * Sets value to the current item.
     */
    setValue: PropTypes.func.isRequired,
    /**
     * The property that defines the title.
     */
    title: PropTypes.string,
  }

  static defaultProps = {
    addButtonLabel: 'Clear to add new',
    baseUrl: '',
    className: '',
    entryType: '',
    idProperty: 'id',
    onEdit: null,
    onRemove: null,
    title: '',
  }

  componentWillMount() {
    if (!this.props.isLoaded) {
      this.props.onList(this.props.baseUrl);
    }
  }

  onSave = (e) => {
    e.preventDefault();
    const {
      baseUrl,
      onSave,
      item,
      idProperty,
    } = this.props;
    onSave(baseUrl, item, item[idProperty]);
  }

  onRemove = (e) => {
    e.preventDefault();
    const ids = e.currentTarget.getAttribute('data-id');
    this.props.onRemove(this.props.baseUrl, ids.split(','));
  }

  onEdit = (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-id');
    this.props.onEdit(this.props.baseUrl, id);
  }

  onAdd = (e) => {
    e.preventDefault();
    this.props.resetValues();
  }

  onChange = (e) => {
    const propertyName = e.target.getAttribute('data-property-name');
    this.props.setValue(propertyName, e.target.value);
  }

  setPasswordField = (input) => {
    this.password = input;
  }

  render() {
    const {
      addButtonLabel,
      className,
      entryType,
      formItems,
      idProperty,
      item,
      items,
      owner,
      tableHeaderCells,
      tableBodyCells,
      title,
    } = this.props;
    const {
      onChange,
      onSave,
    } = this;

    const containerClassNames = [
      styles.items,
      className,
    ].join(' ');

    const gridStyleProperties = {
      '--tableColumnsCount': tableBodyCells.length,
      '--tableRowsCount': items.length + 1,
    };

    return (
      <div className={containerClassNames}>
        <h2 className={styles.header}>{title || entryType.split('-').join(' ')}</h2>
        <div className={styles.list} style={gridStyleProperties}>
          <table>
            <thead>
              <tr>
                {tableHeaderCells.map((tableHeaderCell, cellIndex) => (
                  <th
                    className={styles.tableHeader}
                    key={`list-${entryType}-${item[idProperty]}-header-${cellIndex}`}
                  >
                    <div className={styles.fixedTableHeaders}>
                      {tableHeaderCell({ items, owner })}
                    </div>
                  </th>
                )).concat(
                  /* <!-- edit header --> */
                  <th
                    className={`${styles.tableHeader} ${styles.tableOption}`}
                    key={`list-${entryType}-${item[idProperty]}-header-second-last`}
                  ><div className={styles.fixedTableHeaders} /></th>,
                  /* <!-- remove header --> */
                  <th
                    className={`${styles.tableHeader} ${styles.tableOption}`}
                    key={`list-${entryType}-${item[idProperty]}-header-last`}
                  ><div className={styles.fixedTableHeaders} /></th>,
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, rowIndex) => {
                const isEven = rowIndex % 2 === 0;
                const finalRowClassName = classnames({
                  [styles.isEven]: isEven,
                  [styles.isOdd]: !isEven,
                });
                return (
                  <tr
                    className={finalRowClassName}
                    key={`list-${entryType}-${item[idProperty]}-${rowIndex}`}
                  >
                    {tableBodyCells.map((tableBodyCell, cellIndex) => (
                      <td key={`list-${entryType}-${item[idProperty]}-${rowIndex}-${cellIndex}`}>
                        {tableBodyCell({ item, items, owner })}
                      </td>
                    )).concat([
                      <td
                        className={styles.tableOption}
                        key={`list-${entryType}-${item[idProperty]}-edit-${rowIndex}`}
                      >
                        <Button
                          type="button"
                          data-id={item[idProperty]}
                          onClick={this.onEdit}
                          title="Edit"
                          isIconButton
                          isFlat
                        >
                          <Icon name="mode edit" />
                        </Button>
                      </td>,
                      <td
                        className={styles.tableOption}
                        key={`list-${entryType}-${item[idProperty]}-remove-${rowIndex}`}
                      >
                        <Button
                          type="button"
                          data-id={item[idProperty]}
                          onClick={this.onRemove}
                          title="Remove"
                          isIconButton
                          isFlat
                        >
                          <Icon name="delete" />
                        </Button>
                      </td>,
                    ])}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.form}>
          <form>
            <Button
              type="button"
              onClick={this.onAdd}
            >
              {addButtonLabel}
            </Button>
            {formItems.map((formItem, fieldIndex) => (
              formItem({
                item,
                onChange,
                onSave,
                key: `list-${entryType}-${item[idProperty]}-formItem-${fieldIndex}`,
              })
            ))}
          </form>
        </div>
      </div>
    );
  }
}

export default Crud;
