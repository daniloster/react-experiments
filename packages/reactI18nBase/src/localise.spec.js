import {
  getI18n,
  mergeLocales,
} from './localise';

const localeData = {
  en: 'en',
  pt: 'pt',
}

describe('localise', () => {
  describe('getI18n should return default "en" for no entry in localeData', () => {
    let value;
    it('Given getI18n is executed to localeData with no "fr" and lang "fr"', () => {
      value = getI18n('en', 'fr', localeData);
    });
    it('Expect locale be "en"', () => {
      expect(value).to.be.eql('en');
    });
  });
});

describe('mergeLocales', () => {
  describe('mergeLocales should add extra entries for localeData from props', () => {
    let value;
    it('Given mergeLocales is executed for ("en", "pt") context and ("fr") props', () => {
      value = mergeLocales(localeData, { fr: 'fr' });
    });
    it('Expect locales be ("en", "pt", "fr")', () => {
      expect(value).to.be.eql({
        en: 'en',
        pt: 'pt',
        fr: 'fr',
      });
    });
  });
});
