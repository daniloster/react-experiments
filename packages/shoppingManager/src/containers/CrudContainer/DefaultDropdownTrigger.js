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

/**
 * DefaultDropdownTrigger
 * Displays the default dropdown trigger element.
 */
export default class DefaultDropdownTrigger extends PureComponent {
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
  }
  static defaultProps = {
    ...defaultProps,
  }

  onAdd = (e) => {
    e.preventDefault();
    const {
      isOpen,
      onToggle,
      setItem,
    } = this.props;
    if (isOpen) {
      onToggle(e);
    }
    setItem(this.props.entryType, {});
  }

  render() {
    const {
      addButtonLabel,
      className,
      idProperty,
      onFormatLabel,
      propertyName,
      selectedItem,
      unselectedLabel,
    } = this.props;

    const containerClassNames = [
      styles.dropdown,
      className,
    ].join(' ');

    return (
      <div className={containerClassNames}>
        <Button onClick={onToggle}>
          <Icon>{selectedItem ? 'label' : 'label outline'}</Icon>
          {onFormatLabel(selectedItem, propertyName, unselectedLabel)}
        </Button>
        <Button
          isFlat
          isLink
          onClick={this.onAdd}
        >
          {addButtonLabel}
        </Button>
      </div>
    );
  }
}
