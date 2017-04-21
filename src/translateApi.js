import React from 'react';
import { compileLanguage } from './utils';
import Polyglot from 'node-polyglot';

class PolyglotFactory {
  constructor(translations, locale){
    this.polyglot = new Polyglot({
      locale: locale,
      phrases: compileLanguage(locale, translations)
    });
    this.t = this.polyglot.t.bind(this.polyglot);
  }
}

// todo memoize locale;
const translateApi = (translations, locale) => {
  const p = new PolyglotFactory(translations, locale);
  return p;
}

export default translateApi;
