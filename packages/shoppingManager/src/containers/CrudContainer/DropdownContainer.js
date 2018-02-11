import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import If from 'daniloster-if';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import DefaultDropdownForm from './DefaultDropdownForm';
import DefaultDropdownList from './DefaultDropdownList';
import DefaultDropdownTrigger from './DefaultDropdownTrigger';
import { defaultProps, propTypes } from './DropdownCommonPropTypes';

import styles from './DropdownContainer.scss';
import Flyout from '../../components/Flyout';

/**
 * Crud
 * List and register items.
 */
export default class DropdownContainer extends PureComponent {
  static propTypes = {
    ...propTypes,
    /**
     * When it is defined, it renders the dropdown form.
     */
    onRenderDropdownForm: PropTypes.func,
    /**
     * When it is defined, it renders the dropdown list.
     */
    onRenderDropdownList: PropTypes.func,
    /**
     * When it is defined, it renders the dropdown trigger.
     */
    onRenderDropdownTrigger: PropTypes.func,
  };

  static defaultProps = {
    ...defaultProps,
    onRenderDropdownForm: (props, container) => (
      <DefaultDropdownForm {...props} container={container} />
    ),
    onRenderDropdownList: (props, container) => (
      <DefaultDropdownList {...props} container={container} />
    ),
    onRenderDropdownTrigger: (props, container) => (
      <DefaultDropdownTrigger {...props} container={container} />
    ),
  };

  state = {
    isOpen: false,
  };

  componentWillMount() {
    this.componentId = uuid();
    const { entryType, getEndpoint, isLoaded, onList } = this.props;
    if (!isLoaded) {
      onList(getEndpoint({ method: 'get' }), entryType);
    }
  }

  onToggle = (e) => {
    e.preventDefault();
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const {
      className,
      isLoaded,
      item,
      onRenderDropdownForm,
      onRenderDropdownList,
      onRenderDropdownTrigger,
    } = this.props;
    const { isOpen } = this.state;
    const { onToggle } = this;

    const containerClassNames = [styles.dropdownContainer, className].join(' ');

    const childrenProps = {
      ...this.props,
      parentComponentId: this.componentId,
      onToggle,
      isOpen,
    };

    return (
      <div className={containerClassNames}>
        {onRenderDropdownTrigger(childrenProps, this)}
        <If
          expression={isLoaded && !!(isOpen || item)}
          then={() => (
            <Flyout>
              <If
                expression={!!item}
                then={() => onRenderDropdownForm(childrenProps, this)}
                otherwise={() => onRenderDropdownList(childrenProps, this)}
              />
            </Flyout>
          )}
        />
      </div>
    );
  }
}
