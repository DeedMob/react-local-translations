import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { useLocale, useTranslations, I18n } from '../src/index';
import translations from './translations.json';

function HooksComponent() {
  const locale = useLocale();
  const t = useTranslations(translations);
  return (
    <>
      {[
        locale,
        t('greeting', { name: 'Test' }),
        t('greeting_capitalized', { name: 'lowercase' }),
        t('num_cars', 10),
        t('english'),
        t('german'),
        t('selectLanguage'),
        t('languages'),
        t('missing-key'),
        t('preprocessme'),
      ].map(val => (
        <span key={val}>{val}</span>
      ))}
    </>
  );
}

const transforms = {
  cap(str: string) {
    return str[0].toUpperCase() + str.substr(1);
  },
};

function preprocess(k: string) {
  if (k === 'preprocessme') return '{.preprocess.}';
}

function postprocess(s: string) {
  return `{${s}}`;
}

function convertMissingKey(k: string) {
  return 'MissingKey: ' + k;
}

for (const locale of ['en', 'de']) {
  console.log(
    (ReactTestRenderer.create(
      <I18n.Provider
        value={{ locale, transforms, preprocess, postprocess, convertMissingKey }}>
        <HooksComponent />
      </I18n.Provider>
    ).toJSON() as any).map((node: any) => node.children[0])
  );
}
