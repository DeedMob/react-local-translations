import React from 'react';
import { compileLanguage } from './utils';
import Polyglot from 'node-polyglot';

// todo memoize locale;
const translateApi = (translations, locale) => {
  const polyglot = new Polyglot({
    locale: locale,
    phrases: compileLanguage(locale, translations)
  });

  return {
    t: polyglot.t
  }
}

export default translateApi;
