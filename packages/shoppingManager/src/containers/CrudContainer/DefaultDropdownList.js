import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  defaultProps,
  propTypes,
} from './DropdownCommonPropTypes';

import styles from './DropdownContainer.scss';
import { isObject } from 'util';

const FAKE_EVENT = { preventDefault: () => true };

/**
 * DefaultDropdownList
 * Displays the default list for 1 field.
 */
export default class DefaultDropdownList extends PureComponent {
  static propTypes = {
    ...propTypes,
    /**
     * Defines when the list dropdown is open.
     */
    isOpen: PropTypes.bool.isRequired,
    /**
     * Swap between open and close state.
     */
    onToggle: PropTypes.func.isRequired,
    /**
     * Defines the parent component id, a helper for key properties.
     */
    parentComponentId: PropTypes.string.isRequired,
  }
  static defaultProps = {
    ...defaultProps,
  }

  componentWillMount() {
    document.on('click', this.onClickOut);
    document.on('keyDown', this.onEscapePressed);
  }

  componentWillUnmount() {
    document.off('click', this.onClickOut);
    document.off('keyDown', this.onEscapePressed);
  }

  closeOn = (e, shouldClose) => {
    if (shouldClose) {
      this.props.onToggle(e);
    }
  }

  onClickOut = (e) => {
    this.closeOn(
      FAKE_EVENT,
      this.props.isOpen
      && this.container
      && !this.container.contains(e.target)
    );
  }

  onEspacePressed = (e) => {
    this.closeOn(
      FAKE_EVENT,
      this.props.isOpen
      && e.key === 'Escape'
    );
  }

  onRemove = (e) => {
    e.preventDefault();
    const ids = e.currentTarget.getAttribute('data-id');
    const {
      entryType,
      getEndpoint,
      onRemove,
    } = this.props;
    onRemove(
      ids.split(',')
      .map(id => getEndpoint({ id, method: 'delete' })),
      entryType,
    );
  }

  onEdit = (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-id');
    const {
      entryType,
      getEndpoint,
      onEdit,
      setItem,
    } = this.props;
    setItem(entryType, {});
    onEdit(getEndpoint({ id, method: 'get' }), entryType);
  }

  setContainer = (element) => {
    this.container = element;
  }

  render() {
    const {
      className,
      entryType,
      idProperty,
      items,
      onFormatLabel,
      onSelect,
      parentComponentId,
      propertyName,
      selectedItem,
    } = this.props;
    const {
      onEdit,
      onRemove,
    } = this;

    const containerClassNames = [
      styles.items,
      className,
    ].join(' ');

    return (
      <div
        className={containerClassNames}
        ref={this.setContainer}
      >
        {items.map(item => (
          <div
            className={styles.option}
            key={`dropdown-${parentComponentId}-item-${entryType}-${item[idProperty]}`}
          >
            <Button onClick={() => onSelect(item)}>
              <Icon>
                {selectedItem[idProperty] === item[idProperty]
                  ? 'label'
                  : 'label outline'}
              </Icon>
              {onFormatLabel(item, propertyName)}
            </Button>
            <Button
              data-id={item[idProperty]}
              onClick={this.onEdit}
            >
              <Icon>mode edit</Icon>
            </Button>
            <Button
              data-id={item[idProperty]}
              onClick={this.onRemove}
            >
              <Icon>delete</Icon>
            </Button>
          </div>
        ))}
      </div>
    );
  }
}
