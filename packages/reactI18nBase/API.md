## react-i18n-base

I18nProvider react component and functions as localise and decorate that resolve internationalization.

[\`npm: react-i18n-base\`](https://www.npmjs.com/package/react-i18n-base)


### src/I18nProvider.js

#### I18nProvider

Provider for localization properties.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | node |  | :white_check_mark: | React node tree that expects the I18nProvider data.
**defaultLocale** | string |  | :white_check_mark: | Default language when locale does not have current translation.
**locale** | string | null | :x: | Current language.
**locales** | arrayOf |  | :white_check_mark: | List of localization provided. e.g. ['en', 'pt'].
**onChangeI18n** | func | () => true | :x: | Action to change the current language externally.

