import React, { PureComponent } from 'react';
import Italic from './Italic';

export default class LanguagePicker extends PureComponent {
  onChange = (e) => {
    this.props.i18nMetadata.setI18n(e.target.value);
  };
  render() {
    const { children, i18n, i18nMetadata } = this.props;
    return (
      <div style={{ backgroundColor: 'rgba(40, 40, 180, 0.3)', padding: '10px' }}>
        <section>
          <label htmlFor="language_item">{i18n.languages}</label>
          <br />
          <select id="language_item" onChange={this.onChange} value={i18nMetadata.locale}>
            {i18nMetadata.locales.map(locale => (
              <option value={locale} key={locale}>
                {i18n.options[locale]}
              </option>
            ))}
          </select>
        </section>
        <section>{children}</section>
      </div>
    );
  }
}
