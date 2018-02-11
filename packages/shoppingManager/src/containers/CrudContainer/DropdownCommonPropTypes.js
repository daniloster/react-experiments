import React from 'react';
import PropTypes from 'prop-types';

export const propTypes = {
  /**
   * The property that defines the add button label.
   */
  addButtonLabel: PropTypes.string,
  /**
   * The property that defines the cancel button label.
   */
  cancelButtonLabel: PropTypes.string,
  /**
   * className applied to the container element in order to change styles from outer world.
   */
  className: PropTypes.string,
  /**
   * The property that identifies the type of the entry.
   */
  entryType: PropTypes.string.isRequired,
  /**
   * Defines the form title.
   */
  formTitle: PropTypes.node.isRequired,
  /**
   * The property that identifies the entry.
   */
  idProperty: PropTypes.string,
  /**
   * List of items.
   */
  items: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * Provides as result an endpoint based on { id|ids, method }
   */
  getEndpoint: PropTypes.func.isRequired,
  /**
   * Label formatter.
   */
  onFormatLabel: PropTypes.func.isRequired,
  /**
   * Edit a item.
   */
  onEdit: PropTypes.func.isRequired,
  /**
   * List all items.
   */
  onList: PropTypes.func.isRequired,
  /**
   * Removes one or more items.
   */
  onRemove: PropTypes.func.isRequired,
  /**
   * Creates or save a change on item.
   */
  onSave: PropTypes.func.isRequired,
  /**
   * Select an option {(item) => { ...do something... }}
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * Validate changes.
   */
  onValidate: PropTypes.arrayOf(PropTypes.func),
  /**
   * The property name to store the description.
   */
  propertyName: PropTypes.string,
  /**
   * The label related to property name.
   */
  propertyNameLabel: PropTypes.string,
  /**
   * The placeholder to property name.
   */
  propertyNamePlaceholder: PropTypes.string,
  /**
   * Selected item in the list.
   */
  selectedItem: PropTypes.shape({}).isRequired,
  /**
   * Set the new entry to the form, not displaying in case
   * it is (null, undefined, false).
   */
  setItem: PropTypes.func.isRequired,
  /**
   * The property that defines the save button label.
   */
  saveButtonLabel: PropTypes.string,
  /**
   * Sets value to the current item.
   */
  setValue: PropTypes.func.isRequired,
  /**
   * Label to be displayed when there is no selection.
   */
  unselectedLabel: PropTypes.string,
}

export const defaultProps = {
  addButtonLabel: 'New',
  saveButtonLabel: 'Save',
  cancelButtonLabel: 'Cancel',
  className: '',
  formTitle: <h3>Creating new item</h3>,
  idProperty: 'id',
  onFormatLabel: (item = {}, propertyName, defaultValue) => item[propertyName] || defaultValue,
  onValidate: [() => true],
  propertyName: 'name',
  propertyNameLabel: 'Name',
  propertyNamePlaceholder: 'Enter the name',
  unselectedLabel: 'Select...',
};

export default {
  propTypes,
  defaultProps,
};
