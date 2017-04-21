import React from 'react';
import { compileLanguage } from './utils';
import Polyglot from 'node-polyglot';

// todo memoize locale;
const translateApi = (translations, locale) => {
  const polyglot = Polyglot({
    locale: locale,
    phrases: compileLanguage(locale, translations)
  });

  return {
    t: polyglot.t.bind(polyglot)
  }
}

export default translateApi;
