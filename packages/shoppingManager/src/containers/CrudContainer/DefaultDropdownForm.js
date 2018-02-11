import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Field from '../../components/Field';
import {
  defaultProps,
  propTypes,
} from './DropdownCommonPropTypes';

import styles from './DropdownContainer.scss';

/**
 * DefaultDropdownForm
 * Displays the default form for 1 field.
 */
export default class DefaultDropdownForm extends PureComponent {
  static propTypes = {
    ...propTypes,
    /**
     * Defines the form title
     */
    formTitle: PropTypes.node.isRequired,
  }
  static defaultProps = {
    ...defaultProps,
  }

  state = {
    isValid: true,
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

  onSave = (e) => {
    e.preventDefault();
    if (this.state.isValid) {
      const {
        entryType,
        getEndpoint,
        onSave,
        item,
        idProperty,
      } = this.props;
      const id = item[idProperty];
      const method = id ? 'put' : 'post';
      onSave(getEndpoint({ id, method }), entryType, item, id);
    }
  }

  onCancel = (e) => {
    this.setValid(true, () => this.props.setItem(this.props.entryType, null));
  }

  onChange = (e) => {
    const {
      onValidate: onValidations,
      entryType,
      propertyName,
      setValue,
    } = this.props;
    const totalValid = onValidations.filter(onValidate => onValidate(e.target.value));
    const isValid = totalValid === onValidations.length;
    this.setValid(
      isValid,
      () => setValue(
        entryType,
        propertyName,
        e.target.value,
      ),
    );
  }

  setContainer = (element) => {
    this.container = element;
  }

  setValid = (isValid, callback) => {
    this.setState(
      { isValid },
      callback,
    );
  }

  render() {
    const {
      cancelButtonLabel,
      className,
      formTitle,
      item,
      propertyNameLabel,
      propertyNamePlaceholder,
      saveButtonLabel,
    } = this.props;

    const containerClassNames = [
      styles.form,
      className,
    ].join(' ');

    return (
      <div
        className={containerClassNames}
        ref={this.setContainer}
      >
        {formTitle}
        <form>
          <Field
            label={propertyNameLabel}
            id={propertyName}
            type="text"
            placeholder={propertyNamePlaceholder}
            onChange={this.onChange}
            value={item[propertyName]}
            hasBar
          />
          <section>
            <Button onClick={this.onSave}>
              {saveButtonLabel}
            </Button>
            <Button onClick={this.onCancel}>
              {cancelButtonLabel}
            </Button>
          </section>
        </form>
      </div>
    );
  }
}
